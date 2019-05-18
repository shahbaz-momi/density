 var ws = new WebSocket("ws://localhost:3000");
 ws.onopen = function() {
     console.log("Connected to ws");
 };

 ws.onclose = function(){
    console.log("Disconnected from ws");
 }

 ws.onmessage = function(payload){
    console.log(payload.data);
 }