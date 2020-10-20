// requires package express
var express = require("express");
var app = express();
const shortid = require('shortid');
// listening on port set by app
app.use(express.static("public"));
//app.use('/static', express.static('public'))

const port = process.env.PORT | 3000;
var server = app.listen(port);

// hosting static files in public directory


console.log("server is running");

// require socket.io
var socket = require("socket.io");

// calling function socket with variable server
var io = socket(server);
io.engine.generateId = function (req) {
    // generate a new custom id here
    
    return shortid.generate();
}

// event 1: if I have a new connection
io.sockets.on("connection", newConnection);

function newConnection(socket) {
  console.log("new connection: " + socket.id);
  socket.on("mouse", mouseMsg);
  console.log(socket.id);
 
  
  function mouseMsg(data) {
    //returns to specific socket
    socket.broadcast.emit("mouse", data);
    //returns to all sockets including your own
    //io.sockets.emit('mouse', data);
    console.log(data);
  }

  socket.on("refresh", refreshCanvas);
  function refreshCanvas(refreshdata) {
    io.sockets.emit("refresh", refreshdata);
  }
  
}

