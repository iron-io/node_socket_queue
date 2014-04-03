var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  ,iron_mq = require('iron_mq')

var config = {"token":process.env.IRON_TOKEN,
 "project_id":process.env.IRON_PROJECT_ID
 }

var imq = new iron_mq.Client({token: config["token"], project_id: config["project_id"], queue_name: "test_socket_queue"});

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/public/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.on('message', function (data) {
    console.log(data);
    var count = 0
    var start = Date.now()
    for (var i = 0; i < 100; i++) {
      imq.post(data, function (err, body) {
        if (err) {
          console.error(err);
          res.end('Queue Posting Error');
        } else {
          socket.emit('response', { messageId: body });
          count ++
          if (count ===100){
            var end = Date.now()
            socket.emit('benchmark', { totalTime: (end - start) });
          }
        }
      });
    }
  });
});
