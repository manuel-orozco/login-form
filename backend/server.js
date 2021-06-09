const express = require('express');

const server = express();

server.get('/', function(req, res) {
    res.send('Hello Worlds!');
});

server.listen(5000);