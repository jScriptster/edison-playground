const HOST = '192.168.0.2';
const PORT = '3001';

const DEVICE = 'EDISON';
const TOPIC_TEMPERATURE = 'EdisonPlayground/Temperature';
const TOPIC_BUTTON = 'EdisonPlayground/Button';
const TOPIC_ROTARY = 'EdisonPlayground/Rotary';
const TOPIC_LIGHT = 'EdisonPlayground/Light';
const TOPIC_TEXT_INPUT = 'EdisonPlayground/Input/Text';
const TOPIC_COLOR_INPUT = 'EdisonPlayground/Input/Color';

var mqtt = require('mqtt'),
    client,
    lastTxtInput;

function handleColorInput(value) {
    var color = value.toString(),
        colorData;
    
    color = (color.charAt(0) === "#") ? color.substring(1,7) : color;
    
    colorData = {
        r: parseInt(color.substring(0,2), 16),
        g: parseInt(color.substring(2,4), 16),
        b: parseInt(color.substring(4,6), 16)
    };
    
    if (typeof module.exports.onHandleColorInput === 'function') {
        module.exports.onHandleColorInput(colorData);
    }
};

function handleTextInput(value) {
    var txt = value.toString(),
        data = {
            line0: txt,
            line1: ''
        };
    
    data.line1 = lastTxtInput || '';
    lastTxtInput = txt;   
    
    if (typeof module.exports.onHandleTextInput === 'function') {
        module.exports.onHandleTextInput(data);
    }
};


module.exports = {

    init: function (callbackFn) {

        client = mqtt.connect('mqtt://' + HOST + ':' + PORT, {
            clientId: DEVICE
        });

        client.on('connect', function () {
            console.log('connect');
            client.subscribe(TOPIC_COLOR_INPUT);
            client.subscribe(TOPIC_TEXT_INPUT);
            client.on('message', function (topic, message) {
                switch (topic) {
                case TOPIC_COLOR_INPUT:
                    handleColorInput(message);
                    break;
                case TOPIC_TEXT_INPUT:
                    handleTextInput(message);
                    break;
                }
            });
        });

        client.on('close', function () {
            console.log('close');
        });
    },

    publishTemperature: function (value) {
        client.publish(TOPIC_TEMPERATURE, value.toString())
    },

    publishButton: function (value) {
        client.publish(TOPIC_BUTTON, value.toString());
    },

    publishRotary: function (value) {
        client.publish(TOPIC_ROTARY, value.toString())
    },

    publishLight: function (value) {
        client.publish(TOPIC_LIGHT, value.toString())
    }
};

