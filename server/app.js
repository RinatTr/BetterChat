const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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
// app.use(express.static(path.join(__dirname, "client/build")))
app.listen(process.env.PORT || 3100, () => {
  console.log('better-chat: listening to 3100');
})
