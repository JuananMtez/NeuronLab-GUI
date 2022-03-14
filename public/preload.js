const { contextBridge } = require('electron');
//const lsl = require('lsl.js');
const lsl = require('../../lsl/index')
let streams = null;
let streamInlet = null;

let data = [];

let interval;

const getDataFromLSL = () => {
    console.log(streamInlet.pullChunk());
}

contextBridge.exposeInMainWorld('lsl', {

    search: () => {
        if (streams === null) {
            streams = lsl.resolve_byprop('type', 'EEG');
            if (streams === null || streams.length === 0) {
                streams = null;
                return false;
            }
            return true;

        }
    },

    start: (sec) => {

        if (streams !== null && streams.length > 0) {
            streamInlet = new lsl.StreamInlet(streams[0]);
            interval = setInterval(getDataFromLSL, 100);
        } 
    },

    stop: () => {
        if (streamInlet !== null) {
            clearInterval(interval);
            streams = null;
            streamInlet = null;

        }
    },

})


