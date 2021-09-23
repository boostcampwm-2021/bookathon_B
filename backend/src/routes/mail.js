const {findUser, sendMail} = require('../services/mail/mail');
const express = require('express');
const router = express.Router();

router.get('/:userId',[findUser, sendMail]);

module.exports = router;