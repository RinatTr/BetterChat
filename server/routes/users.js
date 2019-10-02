const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../db/queries/users.js');

router.get('/', getAllUsers)

module.exports = router;
