// imports
const net = require('net');
const ws = require('ws')
const Device = require('./device.js');

// config
const PORT = "9000";
const HOST = 'localhost';

// server instance
const server = net.createServer();
const webSocketServer = ws.Server;

// when a client connects
server.on("connection", function(socket){

    // address of the connected client
    var remoteAddress = socket.remoteAddress + ":" + socket.remotePort;
    console.log("New client connection is made %s", remoteAddress);

    // when the client sends data
    socket.on("data", function(data){
        console.log("Data from %s: %s", remoteAddress, data);






    });

    // when the connection to the client closes 
    socket.once("close", function(){
        console.log("Connection from %s closed", remoteAddress);
    });

    // when there is an error while sending data or connecting
    socket.on("error", function(err){
        console.log("Connection %s error: %s", remoteAddress, err.message);
    });
});

// when there is an error connecting
server.on("error", function(){
    console.log("Some error has occurred...");
});

// server starts listening on specified port
server.listen(9000, function(){
    console.log("Server listening to %j", server.address().port);
});
