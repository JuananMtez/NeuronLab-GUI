const { contextBridge } = require('electron');



const lsl = require('../../lsl/index')
let streams = null;
let streamInlet = null;

let volts = []
let index = 0

let interval;

const getDataFromLSL = () => {
    const { samples, data, timestamps } = streamInlet.pullChunk()

    if (samples > 0) {
        let pos = 0;
        for (let i = 0; i < data.length; i++) {
            volts[i].reverse()
            pos = index
            for (let j = 0; j < timestamps.length; j++) {
                volts[i][pos % volts[i].length] = {pv:data[i][j]}
                pos++; 
            }
            volts[i].reverse()
        }
        index = pos  % volts[0].length
    }
}



const initArrays = (numChannels, sampleRate) => {
    volts = []
    index = 0
    for (let i = 0; i < numChannels; i++) {
        let channel = Array(sampleRate*5).fill({pv:0})
        volts.push(channel)
    }
}

contextBridge.exposeInMainWorld('lsl', {




    start: (sec) => {

        if (streams !== null && streams.length > 0) {
            streamInlet = new lsl.StreamInlet(streams[0]);
            interval = setInterval(getDataFromLSL, 0);
        } 
    },

    stop: () => {
        if (streamInlet !== null) {
            clearInterval(interval);
            interval = -1
            streamInlet = null;
            //initArrays(volts.length, volts[0].length/5)
        }
    },

    closeStream: () => {

        streams = null
        streamInlet = null
        if (interval !== -1) {
            clearInterval(interval)
            interval = -1
        }
        initArrays(volts.length, volts[0].length/5)
        


    },

    searchStreams: (numChannels, sampleRate) => {
        return new Promise((resolve, reject) => {
            streams = lsl.resolve_byprop('type', 'EEG');
            if (streams === null || streams.length === 0) {
              streams = null
              resolve(false)
            }
            initArrays(numChannels, sampleRate)
            resolve(true)
          })

    }, getVolts: () => {
        /*if (volts[i] !== undefined)
            return volts[i].map(e => ({pv:e}))
        else 
            return undefined
        */
        if (volts[0] !== undefined)
            return volts
        return undefined
    }
    

})


