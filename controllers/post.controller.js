import Post from '../models/Post.js';

export {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    likePost
};

async function getAllPosts(req, res) {
    try {
        const posts = await Post.find()
            .populate('owner', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
}

async function getPostById(req, res) {
    try {
        const post = await Post.findById(req.params.id)
            .populate('owner', 'name');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error: error.message });
    }
}

async function createPost(req, res) {
    try {
        const newPost = new Post({
            ...req.body,
            owner: req.user._id // Assuming user ID is available from auth middleware
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: 'Error creating post', error: error.message });
    }
}

async function updatePost(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if user is the owner
        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this post' });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: 'Error updating post', error: error.message });
    }
}

async function deletePost(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if user is the owner
        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this post' });
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
}

async function likePost(req, res) {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user has already liked the post
        if (post.likes.includes(req.user._id)) {
            return res.status(400).json({ message: 'You have already liked this post' });
        }

        // Add the user to the likes array
        post.likes.push(req.user._id);
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: 'Error liking post', error: error.message });
    }
} 