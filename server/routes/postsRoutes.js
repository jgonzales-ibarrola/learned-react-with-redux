const express = require('express');

const {getPosts, addPost, deleteAllPosts, deletePost, getPost, updatePost} = require('../controllers/postsController')

const router = express.Router();


router.get('/', getPosts)

router.get('/:id', getPost);

router.post('/create', addPost);

router.patch('/:id', updatePost)

router.delete('/', deleteAllPosts);

router.delete('/:id', deletePost);

module.exports = router;