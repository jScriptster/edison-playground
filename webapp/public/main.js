(function(){

    const MQTT_HOST = 'mqtt://192.168.0.2:3002';

    const TOPIC_TEMPERATURE = 'EdisonPlayground/Temperature';
    const TOPIC_BUTTON = 'EdisonPlayground/Button';
    const TOPIC_ROTARY = 'EdisonPlayground/Rotary';
    const TOPIC_LIGHT = 'EdisonPlayground/Light';
    const TOPIC_TEXT_INPUT = 'EdisonPlayground/Input/Text';
    const TOPIC_COLOR_INPUT = 'EdisonPlayground/Input/Color';

    var client = mqtt.connect(MQTT_HOST);

    client.on('connect', function () {
        console.log('connect');

        client.subscribe(TOPIC_TEMPERATURE);
        client.subscribe(TOPIC_BUTTON);
        client.subscribe(TOPIC_ROTARY);
        client.subscribe(TOPIC_LIGHT);

    });

    client.on('close', function () {
        console.log('close');
    });

    client.on('message', function (topic, value) {
        switch (topic) {
        case TOPIC_BUTTON:
            handleButton(value.toString());
            break;
        case TOPIC_ROTARY:
            handleRotary(value.toString());
            break;
        }
    });

    $('#colorInput').on('change', function (e) {
        var jCurrentTarget = $(e.currentTarget);
        client.publish(TOPIC_COLOR_INPUT, jCurrentTarget.val());
    });

    $('#textInput').on('change', function (e) {
        var jCurrentTarget = $(e.currentTarget);
        client.publish(TOPIC_TEXT_INPUT, jCurrentTarget.val());
        jCurrentTarget.val('');
    });







    function handleButton(value) {
        if (value === '1') {
            $('.jsUserinputpanel').addClass('userinputpanel--visible');
        } else {
            $('.jsUserinputpanel').removeClass('userinputpanel--visible');
            $('#textInput, #colorInput').blur();
        }
    }

    function handleRotary(value) {
        var valueInt = parseInt(value, 10),
            valueSimplified = Math.round(valueInt / 4),
            color = 'rgb(' + valueSimplified + ',' + valueSimplified + ',' + valueSimplified + ')';

        $('body').css('background-color', color);
    }



}());