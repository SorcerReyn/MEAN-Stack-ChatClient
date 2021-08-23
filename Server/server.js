var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(80);
var path = require('path');

app.use(express.static("public"));

app.get('/', function(req, res){
  res.sendFile('./app.component.html', {root: path.join(__dirname, '../Client/src/app')});
});

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});