const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

router.get('/', postsController.getposts);
router.get('/getpost/:postid',postsController.getpost)

module.exports = router;
