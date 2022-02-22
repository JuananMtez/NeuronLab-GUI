// preload with contextIsolation enabled
const { contextBridge } = require('electron')
const lsl = require('lsl.js');

let streams;
let streamInlet;

contextBridge.exposeInMainWorld('lsl', {
    start: () => {

        if (streams == null) {
            streams = lsl.resolve_byprop('type', 'EEG');
            if (streams != null)
                streamInlet = new lsl.StreamInlet(streams[0]);
        } else {
            streamInlet.streamChunks(12, 1000);
            streamInlet.on('chunk', console.log);
            streamInlet.on('closed', () => console.log('LSL inlet closed'));
        }

        

    },

    stop: () => {
        if (streamInlet !== null)
            streamInlet.close();
    }

    
})


