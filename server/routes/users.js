const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, getUser } = require('../db/queries/users.js');

router.get('/:userId', getUser)
router.get('/', getAllUsers)
router.post('/:username', createUser)

module.exports = router;
