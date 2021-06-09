const express = require('express');
const PORT = 5000;

const server = express();

server.get('/', function(req, res) {
    res.send('Hello Worlds!');
});

server.listen(PORT);