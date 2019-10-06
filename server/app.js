const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const webSocketsServerPort = 8000;

// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort, () => {
  console.log('better-chat: listening to 8000');
});

// Websocket server
const webSocketServer = require('websocket').server;
const wsServer = new webSocketServer({
  httpServer: server
});
const clients = {};

// Generate unique ID for every new connection
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).slice(1);
  return s4() + s4() + '-' + s4();
};

const sendMessage = (json) => {
  // send the current data to all connected clients
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json);
  });
}

wsServer.on('request', (req) => {
  let userID = getUniqueID();
  console.log('connection made', req.origin)
  const connection = req.accept(null, req.origin);
  clients[userID] = connection;
  connection.on('message', (msg) => {
    sendMessage(msg.utf8Data)
  })
})

//Route imports
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Route usage
app.get('/', (req,res) => {res.send('welcome to better-chat')})
app.use('/api/users', usersRouter);
app.use('/api/messages', messagesRouter);

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({  message: err.message,
              error: err
              })
  console.log("//ERROR:", req.method, req.url, err.message)
});

app.listen(process.env.PORT || 3100, () => {
  console.log('better-chat: listening to 3100');
})
