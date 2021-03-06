// imports
const net = require('net');
const ws = require('ws').Server
const Device = require('./device.js');
const wsList = [];

// config
const TCP_PORT = 9000;
const WS_PORT = 4000;
const HOST = 'localhost';

// server instance
const server = net.createServer();
const webSocketServer = new ws({port: WS_PORT});

webSocketServer.on("connection", function(ws){
    wsList.push(ws);
    ws.on('close', function close() {
        console.log('Disconnected');
    });
});

// when a client connects
server.on("connection", function(socket){

    // address of the connected client
    var remoteAddress = socket.remoteAddress + ":" + socket.remotePort;
    console.log("New client connection is made %s", remoteAddress);

    // when the client sends data
    socket.on("data", function(data){
        console.log("Data from %s: %s", remoteAddress, data);
        for(let webSocket of wsList){
            if(webSocket != null) {
                var input = String(data);
                if(input.indexOf(";") != -1){
                    input = input.split(";");
                    for(let deviceObject of input){
                        deviceObject = deviceObject.split(",");
                        var deviceID  = deviceObject[0];
                        var xCoordinate = deviceObject[1];
                        var yCoordinate = deviceObject[2];
                        var time = deviceObject[3];
                        var myDevice = new Device(deviceID, xCoordinate, yCoordinate, time);
                        var myJSON = JSON.stringify(myDevice);
                        webSocket.send(myJSON);
                    } 
                }
                else {
                    input = input.split(",");
                    var input = String(data).split(",");
                    var deviceID  = input[0];
                    var xCoordinate = input[1];
                    var yCoordinate = input[2];
                    var time = input[3];
                    var myDevice = new Device(deviceID, xCoordinate, yCoordinate, time);
                    var myJSON = JSON.stringify(myDevice);
                    webSocket.send(myJSON);
                }
            }
        }

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
server.listen(TCP_PORT, function(){
    console.log("Server listening to %j", server.address().port);
});


