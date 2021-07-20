const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const isAuthenticated = require('../middleware/isauthorized');

router.post('/add-post',isAuthenticated,adminController.postposts);
router.get('/posts',isAuthenticated,adminController.getposts);
router.post('/delete-post/:id',isAuthenticated,adminController.deletepost);

module.exports = router;