const HOST = '192.168.0.2';
const PORT = '3000';

var express = require('express'),
    //socket = require('./socket.js'),
    broker = require('./broker.js'),
    path = require('path'),
    app;

app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(path.dirname(require.resolve('mosca')), 'public')));
app.listen(PORT, HOST);