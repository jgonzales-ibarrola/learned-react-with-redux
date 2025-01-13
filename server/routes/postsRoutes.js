const express = require('express');

const {getPosts, addPost} = require('../controllers/postsController')

const router = express.Router();


router.get('/', getPosts)

router.post('/create', addPost);

module.exports = router;