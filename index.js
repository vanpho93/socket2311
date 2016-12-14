var express = require('express');
var app = express();
var server = require('http').Server(app); //2
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

var io = require('socket.io')(server); //1

server.listen(3000, () => console.log('Server started'));

app.get('/', (req, res) => res.render('home'));

io.on('connection', socket => { //3
  console.log('Co nguoi ket noi');
  socket.on('CLIENT_SEND_MESSAGE', data => {
    console.log(data);
  })
})
