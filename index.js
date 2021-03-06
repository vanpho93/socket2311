var express = require('express');
var app = express();
var server = require('http').Server(app); //2
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

var io = require('socket.io')(server); //1
var mang = [];
var mangSocket = [];
server.listen(3000, () => console.log('Server started'));

app.get('/', (req, res) => res.render('home'));

io.on('connection', socket => { //3
  mangSocket.push(socket);//dautien
  console.log('Co nguoi ket noi');

  socket.emit('LIST_USER', mang);///////////

  socket.on('NGUOI_DUNG_DANG_KY', username => {
    if(mang.indexOf(username) == -1){
      socket.username = username;///1
      mang.push(username);
      socket.emit('SERVER_XAC_NHAN_DANG_KY', true);
      io.emit('NGUOI_DUNG_MOI', username);
    }else{
      socket.emit('SERVER_XAC_NHAN_DANG_KY', false);
    }
    console.log(username);
  });

  socket.on('disconnect', () => {
    mang.splice(mang.indexOf(socket.username), 1);
    io.emit('USER_DISCONNECT', socket.username)
  });

  socket.on('CLIENT_SEND_MESSAGE', msg => {
    io.emit('SERVER_SEND_MESSAGE', `${socket.username}: ${msg}`);
  });
});

/*
  Username khong duoc trung nhau
*/
