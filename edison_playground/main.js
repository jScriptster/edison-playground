const INTERVAL = 1000;

var broadcast = require('./broadcast.js'),
    sensor = require('./sensor.js');

function startSensorWatch() {
    setInterval(function () {
        broadcast.publishButton(sensor.getButtonValue());
        broadcast.publishLight(sensor.getLightValue());
        broadcast.publishRotary(sensor.getRotaryValue());
        broadcast.publishTemperature(sensor.getTemperatureValue());
    }, INTERVAL);
}

broadcast.init();
startSensorWatch();

