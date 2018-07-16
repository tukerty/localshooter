var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('setGameRoom', data => {
    socket.join(data)
    socket.currentRoom = data
    socket.broadcast.to(socket.currentRoom).emit('gameConnected')
  })

  socket.on('setControllerRoom', data => {
    socket.join(data)
    socket.currentRoom = data
    socket.broadcast.to(socket.currentRoom).emit('controllerConnected', {'data': data})
  })

  socket.on('controllerPlayerMove', data => {
    console.log(data)
    socket.broadcast.to(socket.currentRoom).emit('playerMove', data)
  })
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
