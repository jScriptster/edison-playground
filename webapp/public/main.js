(function(){

    const TOPIC_TEMPERATURE = 'EdisonPlayground/Temperature';
    const TOPIC_BUTTON = 'EdisonPlayground/Button';
    const TOPIC_ROTARY = 'EdisonPlayground/Rotary';
    const TOPIC_LIGHT = 'EdisonPlayground/Light';

    var client = mqtt.connect('mqtt://localhost:3002');


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
        console.log('**message**', topic, value.toString());
    });

}());