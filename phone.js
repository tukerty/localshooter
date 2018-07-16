var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3001;

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/phone.html');
});

io.on('connection', function(socket){
  console.log(socket.id)

  socket.on('setLink', data => {
    console.log(data)
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
