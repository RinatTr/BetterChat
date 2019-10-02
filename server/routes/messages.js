const express = require('express');
const router = express.Router();

const { getAllMessages, createMessage } = require('../db/queries/messages.js');

router.get('/', getAllMessages)
router.post('/', createMessage)
module.exports = router;
