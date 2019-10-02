const { db } = require("./connect.js");

const getAllUsers = (req, res, next) => {
  db.any("SELECT * FROM users")
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "got all users",
        users: data
      })
    })
    .catch(err => next(err))
}

const getUser = (req, res, next) => {
  let userId = req.params.userId;
  db.one("SELECT * FROM users WHERE id = $1", [userId])
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "got user",
        user: data
      })
    })
    .catch(err => next(err))
}

const createUser = (req, res, next) => {
  let username = req.params.username;
  db.none("INSERT INTO users(username) VALUES($1)", [username])
    .then(() => {
      res.status(200).json({
        status: "sucess",
        message: "created user: "+username
      })
    })
    .catch(err => next(err))
}

module.exports = {
  getAllUsers,
  getUser,
  createUser
};
