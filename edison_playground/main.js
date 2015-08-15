const INTERVAL = 200;

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

broadcast.onHandleColorInput = function (color) {
    sensor.setLCDColor(color);
};

broadcast.onHandleTextInput = function (txt) {
    sensor.setLCDText(txt);
};

broadcast.init();
startSensorWatch();

