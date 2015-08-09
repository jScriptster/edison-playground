const HOST = '192.168.0.2';
const PORT = '3001';

const DEVICE = 'EDISON';
const TOPIC_TEMPERATURE = 'EdisonPlayground/Temperature';
const TOPIC_BUTTON = 'EdisonPlayground/Button';
const TOPIC_ROTARY = 'EdisonPlayground/Rotary';
const TOPIC_LIGHT = 'EdisonPlayground/Light';

var mqtt = require('mqtt'),
    client;


module.exports = {

    init: function (callbackFn) {

        client = mqtt.connect('mqtt://' + HOST + ':' + PORT, {
            clientId: DEVICE
        });

        client.on('connect', function () {
            console.log('connect');
            //client.subscribe('/Root/Foo/Bar');
            //client.on('message', function (topic, message) {});
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

