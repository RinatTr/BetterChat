const express = require('express');
const router = express.Router();
const { getAllUsers, createUser } = require('../db/queries/users.js');

router.get('/', getAllUsers)
router.post('/:username', createUser)

module.exports = router;
