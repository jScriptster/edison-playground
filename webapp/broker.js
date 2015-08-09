const PORT_MQTT = 3001; //mqtt
const PORT_BROWSER = 3002; //web-socket

var mosca = require('mosca');

var brokerServer = new mosca.Server({
    port: PORT_MQTT,
    http: {
        port: PORT_BROWSER,
        bundle: false,
        static: './'
    }
});

brokerServer.on('clientConnected', function(client) {
    console.log('new client');
});

brokerServer.on('published', function(package, client) {
    console.log('*published', package.topic, package.payload.toString());
});


brokerServer.on('clientDisconnected', function(client) {
    console.log('clientDisconnected');
});


module.exports = {
};