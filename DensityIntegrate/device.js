// imports
const net = require('net');

// config
const PORT = "9000";
const HOST = 'localhost';

// server instance
const server = net.createServer();

// when a client connects
server.on("connection", function(socket){

});

// when there is an error connecting
server.on("error", function(){
    console.log("Some error has occurred...");
});