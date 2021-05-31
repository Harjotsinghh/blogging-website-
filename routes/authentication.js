const express = require('express');
const router = express.Router();

const authcontroller = require('../controllers/authentication');

router.post('/signup',authcontroller.postsignup);

router.post('/login',authcontroller.postlogin);

module.exports = router;