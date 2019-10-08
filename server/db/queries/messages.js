const { db } = require("./connect.js");

const getAllMessages = (req, res, next) => {
  db.any(`SELECT messages.created_at, messages.body, users.username,         
  users.created_at AS user_created_at
          FROM messages JOIN users ON messages.user_id = users.id
          ORDER BY messages.created_at DESC`)
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
  db.none("INSERT INTO messages(user_id, body) VALUES(${user_id}, ${body})", req.body)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "added a post"
      })
    })
    .catch(err => next(err))
}

module.exports = {
  getAllMessages,
  createMessage
};
