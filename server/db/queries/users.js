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

module.exports = {
  getAllUsers
};
