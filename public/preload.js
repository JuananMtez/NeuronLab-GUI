const { contextBridge, ipcRenderer } = require('electron');

const lsl = require('lsl.js')
const dgram = require('dgram');

var FormData = require('form-data');
var fs = require('fs');
const axios = require('axios').default;
const path = require('path')


// LSL Device stream
let streamsEEG = null;
let streamInletEEG = null;
let timeCorrection = 0

// LSL Stimulus stream
let streamsStimulus = null
let streamInletStimulus = null;


// UDP Stimulus stream
let server = null


let recording = false
let volts = []

let rate = 0;
let interval;

let cont = 0

let dataInput = []
let timestamp = []
let stimuli = []
let stimuliAlwaysMemory = []


const getDataFromLSL = () => {
    const { samples, data, timestamps, dataOriginal } = streamInletEEG.pullChunk()

    if (samples > 0) {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < timestamps.length; j++) {
                volts[i].shift()
                volts[i].push({pv:data[i][j]})
            }
        }

        if (recording) {
            dataInput.push(dataOriginal)
            timestamp = timestamp.concat(timestamps)
            if (timestamp.length > 30000) {
                fs.writeFileSync(`tmp/temp_file_${cont}.json`, JSON.stringify({dataInput, timestamp, stimuli}))
                initArraysRecording()
                cont++;
            }
        }

    }
    if (streamInletStimulus !== null) {
        //streamInletStimulus.push_sample()
    } 
}


    
const changeWindowTime = (sec) => {
    initArrays(volts.length, sec)
}


const initArrays = (numChannels, time) => {
    volts = []
    for (let i = 0; i < numChannels; i++) {
        let channel = Array(rate*time).fill({pv:0})
        volts.push(channel)
    }

}

const initArraysRecording = () => {
    dataInput = []
    timestamp = []
    stimuli = []
}

const clear = () => {

    streamsEEG = null;
    streamInletEEG = null;
    timeCorrection = 0
    
    // LSL Stimulus stream
    streamsStimulus = null
    streamInletStimulus = null;
    
    // UDP Stimulus stream
    server = null
    
    
    recording = false
    volts = []
    
    rate = 0;
    if (interval)
        clearInterval(interval);

    dataInput = []
    timestamp = []
    stimuli = []
    stimuliAlwaysMemory = []

    fs.readdir('tmp', (err, files) => {
        files.forEach(file => {
            fs.unlink(path.join('tmp', file), err => {
                if (err) throw err;
              });
          
        });
    })
    cont = 0
}
contextBridge.exposeInMainWorld('api', {


    start: () => {

        if (streamsEEG !== null && streamsEEG.length > 0) {
            streamInletEEG = new lsl.StreamInlet(streamsEEG[0]);
            //timeCorrection = streamInletEEG.timeCorrection()
            interval = setInterval(getDataFromLSL, 0);
        } 
    },

    stop: () => {
        if (streamInletEEG !== null) {
            clearInterval(interval);
            //streamInletEEG = null;
        }
    },

    startStimulusLSLRecording: () => {
        if (streamsStimulus !== null && streamsStimulus.length > 0) {
            streamInletStimulus = new lsl.StreamInlet(streamsStimulus[0])
            initArraysRecording()
            recording=true
        }
    },

    stopStimulusLSLRecording: () => {
        streamInletStimulus = null
        recording = false

    },

    startStimulusUDPRecording: (port, labels) => {
        server = dgram.createSocket('udp4');
        server.on('message', (msg, rinfo) => {
            const {stimulus, timestamp} = JSON.parse(msg)
            if (Array.isArray(stimulus)) {
                if (typeof stimulus[0] == 'number' && !isNaN(stimulus[0]) && Number.isInteger(stimulus[0])) {
                    if (labels.filter(l => l.label == stimulus[0]).length === 1) {
                        stimuli.push([stimulus, timestamp])
                        stimuliAlwaysMemory.push({stimulus: stimulus[0], timestamp: timestamp})
                    } else 
                    ipcRenderer.send('open_dialog', `Stimulus with value ${stimulus[0]} is not valid. Please, type in a valid stimulus and reset`)


                } else 
                    ipcRenderer.send('open_dialog', 'Stimulus data must be a integer value in a array. [int]')
            } else {
                ipcRenderer.send('open_dialog', 'Stimulus data must be a integer value in a array. [int]')
            }
            

        });

        initArraysRecording()

        server.bind(port);
        recording = true

    },

    stopStimulusUDPRecording: () => {
        server.close();
        server = null
        recording = false
    },
    closeStream: () => {

        streamsEEG = null
        streamInletEEG = null        
        initArrays(volts.length, 5)
        


    },

    closeStreamStimulus: () => {
        streamsStimulus = null
        streamInletStimulus = null

    },

    searchStreams: (element, type) => {
        return new Promise((resolve, reject) => {

            if (element === 'device') {
                streamsEEG = lsl.resolve_byprop('type', type);
                if (streamsEEG === null || streamsEEG.length === 0) {
                    streamsEEG = null
                    resolve(false)
                }
                rate = streamsEEG[0].getNominalSamplingRate()
                initArrays(streamsEEG[0].getChannelCount(), 5)

            } else {
                streamsStimulus = lsl.resolve_byprop('name', type);
                if (streamsStimulus === null || streamsStimulus.length === 0) {
                    streamsStimulus = null
                    resolve(false)
                }
            }
            resolve(true)
          })

    }, 
     
    getVolts: () => {
        if (volts[0] !== undefined)
            return volts
        return undefined

    }, 

    getStimulusReceived: () => {
        
        return stimuliAlwaysMemory
    },
    
    changeWindow: (sec) => {
        changeWindowTime(sec)
    
    }, 

    closeAll: () => {


        clear()


    },
    save: (name, subject_id, experiment_id) => {
        
        fs.writeFileSync(`tmp/temp_file_${cont}.json`, JSON.stringify({dataInput, timestamp, stimuli}))
        const form = new FormData();
        let names = fs.readdirSync('tmp')
        for (let i = 0; i < names.length; i++)
            form.append('files', fs.createReadStream(path.join('tmp', names[i])))

        timeCorrection = streamInletEEG.timeCorrection()

        axios({
            method: 'post',
            url: `http://localhost:8000/csv/?name=${name}&subject_id=${subject_id}&experiment_id=${experiment_id}&time_correction=${timeCorrection}`,

            data: form,
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
            headers: {
                ...form.getHeaders()
            },
            adapter: require('axios/lib/adapters/http')
        }).then(response =>  ipcRenderer.send('open_dialog', 'CSV created'))
        .catch((error => {
            ipcRenderer.send('open_dialog', 'CSV not created. Check if stimulus are corrects')
        })).finally(() => clear())
           
    },

    applyFilter: (msg) => {
        axios.post('http://127.0.0.1:8000/csv/preproccessing/list', msg, { adapter: require('axios/lib/adapters/http')}) 
        .then(response => ipcRenderer.send('open_dialog', 'Preproccessing applied correctly'))

        .catch(error => ipcRenderer.send('open_dialog', error.response.data.detail !== undefined ? error.response.data.detail : 'A server internal error has occurred'))
    },

    applyIca: (id_csv, msg) => {
        axios.post(`http://127.0.0.1:8000/csv/${id_csv}/ica/apply`, msg, { adapter: require('axios/lib/adapters/http')}) 
        .then(response => ipcRenderer.send('open_dialog', 'Components excluded correctly'))

        .catch(error => ipcRenderer.send('open_dialog', error.response.data.detail !== undefined ? error.response.data.detail : 'A server internal error has occurred'))
    },

    downloadCSV: (idCSV) => {

        ipcRenderer.send('download-button', {url: `http://localhost:8000/csv/${idCSV}/download`}) 
    },

    applyTrainingMachine: (msg) => {
        axios.post(`http://localhost:8000/training/machine`, msg, { adapter: require('axios/lib/adapters/http')})
        .then(response => ipcRenderer.send('open_dialog', 'Training model created'))
        .catch(error => ipcRenderer.send('open_dialog', 'A server internal error has occurred'))
    },

    applyTrainingDeep: (msg) => {
        axios.post(`http://localhost:8000/training/deep`, msg, { adapter: require('axios/lib/adapters/http')})
        .then(response => ipcRenderer.send('open_dialog', 'Training model created'))
        .catch(error => ipcRenderer.send('open_dialog', 'A server internal error has occurred'))
    },


    applyFeature: (msg) => {
        axios.post('http://127.0.0.1:8000/csv/feature/list', msg, { adapter: require('axios/lib/adapters/http')}) 
        .then(response => ipcRenderer.send('open_dialog', 'Feature extraction applied correctly'))

        .catch(error => {
            ipcRenderer.send('open_dialog', error.response.data.detail !== undefined ? error.response.data.detail : 'A server internal error has occurred')
        } )
    },


    
    

})


