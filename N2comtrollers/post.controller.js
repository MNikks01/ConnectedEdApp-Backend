import Post from '../models/Post.js';

export const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const post = await Post.create({ user: req.user.id, content });

        res.status(201).json({ message: 'Post created successfully', post });
    } catch (err) {
        res.status(400).json({ error: 'Error creating post', details: err.message });
    }
};

export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.likes.includes(req.user.id)) {
            post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
            await post.save();
            return res.status(200).json({ message: 'Post unliked' });
        }

        post.likes.push(req.user.id);
        await post.save();
        res.status(200).json({ message: 'Post liked' });
    } catch (err) {
        res.status(400).json({ error: 'Error liking post', details: err.message });
    }
};
