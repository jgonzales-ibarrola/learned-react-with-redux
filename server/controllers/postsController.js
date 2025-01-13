const Post = require("../models/postSchema");
const mongoose = require("mongoose");

const getPosts = async (req, res) => {
	try {
		const posts = await Post.find();

		res.json(posts);
	} catch (error) {
		res.status(404).json({
			msg: "Error fetching Posts!" + " " + error.message,
		});
	}
};

const addPost = async (req, res) => {
	const { title, content } = req.body;

	const newPost = {
		title,
		content,
	};

	try {
		const post = await Post.create(newPost);

		res.json(post);
	} catch (error) {
		res.status(404).json({ msg: "Error in adding new post" });
	}
};

const updatePost = async (req, res) => {
	const { id } = req.params;
	const { title, content } = req.body;

	const newPost = {
		title,
		content,
	};

	try {
		const post = await Post.findByIdAndUpdate(id, newPost, { new: true });

		if (!post) {
			res.status(404).json({
				msg: "Cannot find the post or deleted post!",
			});
		}

		res.status(201).json(post);
	} catch (error) {
		res.status(404).json({ msg: "Error in updating a post" });
	}
};

const getPost = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({ msg: "Error: Invalid ID!" });
	}

	try {
		const post = await Post.findById(id);

		if (!post) {
			res.status(404).json({
				msg: "Cannot find the post or deleted post!",
			});
		}

		res.json(post);
	} catch (error) {
		res.status(404).json({ msg: "Error fetching a post!" });
	}
};

const deleteAllPosts = async (req, res) => {
	try {
		const posts = await Post.deleteMany();
		res.json(posts);
	} catch (error) {
		res.status(404).json({ msg: "Error in deleting all posts" });
	}
};

const deletePost = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({ msg: "Error: Invalid ID!" });
	}

	try {
		const post = await Post.findByIdAndDelete(id);

		if (!post) {
			res.status(404).json({
				msg: "Error: ID Not Found or Deleted Post",
			});
		}

		res.json(post);
	} catch (error) {
		res.status(404).json({ msg: "Error in deleting a post" });
	}
};

module.exports = {
	getPosts,
	getPost,
	addPost,
	updatePost,
	deleteAllPosts,
	deletePost,
};
