const INTERVAL_A = 200;
const INTERVAL_B = 3000;

var broadcast = require('./broadcast.js'),
    sensor = require('./sensor.js');

function startSensorWatch() {
    setInterval(function () {
        broadcast.publishButton(sensor.getButtonValue());
        broadcast.publishRotary(sensor.getRotaryValue());
    }, INTERVAL_A);
    
    setInterval(function () {
        broadcast.publishLight(sensor.getLightValue());
        broadcast.publishTemperature(sensor.getTemperatureValue());
    }, INTERVAL_B);
    
}

broadcast.onHandleColorInput = function (color) {
    sensor.setLCDColor(color);
};

broadcast.onHandleTextInput = function (txt) {
    sensor.setLCDText(txt);
};

broadcast.init();
startSensorWatch();

