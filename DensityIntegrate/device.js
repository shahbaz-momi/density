// imports
const net = require('net');

// config
const PORT = "9000";
const HOST = 'localhost';

// server instance
const server = net.createServer();

// when a client connects
server.on("connection", function(socket){
    var remoteAddress = socket.remoteAddress + ":" + socket.remotePort;
    console.log("New client connection is made %s", remoteAddress);

});

// when there is an error connecting
server.on("error", function(){
    console.log("Some error has occurred...");
});

// server starts listening on specified port
server.listen(9000, function(){
    console.log("Server listening to %j", server.address().port);
});