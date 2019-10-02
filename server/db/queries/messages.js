const { db } = require("./connect.js");

const getAllMessages = (req, res, next) => {
  db.any(`SELECT messages.created_at, messages.body, users.username
          FROM messages JOIN users ON messages.user_id = users.id`)
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "got all messages",
        messages: data
      })
    })
    .catch(err => next(err))
}

const createMessage = (req, res, next) => {
  db.none("INSERT INTO messages(username) VALUES($1)", [username])
    .then(() => {
      res.status(200).json({
        status: "sucess",
        message: "created user: "+username
      })
    })
    .catch(err => next(err))
}

module.exports = {
  getAllMessages,
  createMessage
};
