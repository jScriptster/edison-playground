// A0 temperature sensor
// A1 rotary angle sensor
// A2 light sensor
// D4 Button


const B = 3975;

var groveSensor = require('jsupm_grove'),
    mraa = require("mraa"),
    light = new groveSensor.GroveLight(2),
    lightAnalogPin = new mraa.Aio(2),
    temperatureAnalogPin = new mraa.Aio(0),
    rotarySensor = new mraa.Aio(1),
    button = new groveSensor.GroveButton(4);


module.exports = {
    getButtonValue: function () {
        return button.value();
    },

    getLightValue: function () {
        //console.log(light.name() + " raw value is " + light.raw_value() + ", which is roughly " + light.value() + " lux");
        //console.log('light' + lightAnalogPin.read());
        return light.value();
    },

    getRotaryValue: function () {
        return rotarySensor.read();
    },

    getTemperatureValue: function (unit) {
        var a = temperatureAnalogPin.read(),
            resistance = (1023 - a) * 10000 / a,
            celsius_temperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15,
            fahrenheit_temperature = (celsius_temperature * (9 / 5)) + 32;

            if (unit === 'F') {
                return fahrenheit_temperature;
            }

            return celsius_temperature;
    }
};

