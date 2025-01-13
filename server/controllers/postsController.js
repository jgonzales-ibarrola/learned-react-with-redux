const Post = require("../models/postSchema");

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
  const {title, content} = req.body;

  const newPost = {
    title,
    content
  }

  try {
    const post = await Post.create(newPost);

    res.json(post);

  } catch (error) {
    res.status(404).json({msg: "Error in adding new post"})
  }
}

module.exports = {
	getPosts,
  addPost
};
