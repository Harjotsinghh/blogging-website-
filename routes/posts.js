const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const isAuthenticated = require('../middleware/isauthorized');

router.get('/', postsController.getposts);


module.exports = router;
