import Post from '../../models/Post.js'; // Adjust the path as necessary

const postResolvers = {
    Query: {
        getAllPosts: async () => {
            return await Post.find()
                .populate('postOwner', 'name')
                .sort({ createdAt: -1 });
        },
        getPostById: async (_, { id }) => {
            const post = await Post.findById(id).populate('postOwner', 'name');
            if (!post) throw new Error('Post not found');
            return post;
        },
    },
    Mutation: {
        createPost: async (_, { caption, files }, { user }) => {
            const newPost = new Post({
                postOwner: user._id,
                caption,
                files,
            });

            return await newPost.save();
        },
        updatePost: async (_, { id, caption, files }, { user }) => {
            const post = await Post.findById(id);
            if (!post) throw new Error('Post not found');

            // Check if user is the owner
            if (post.postOwner.toString() !== user._id.toString()) {
                throw new Error('Not authorized to update this post');
            }

            const updatedPost = await Post.findByIdAndUpdate(
                id,
                { caption, files },
                { new: true, runValidators: true }
            );

            return updatedPost;
        },
        deletePost: async (_, { id }, { user }) => {
            const post = await Post.findById(id);
            if (!post) throw new Error('Post not found');

            // Check if user is the owner
            if (post.postOwner.toString() !== user._id.toString()) {
                throw new Error('Not authorized to delete this post');
            }

            await Post.findByIdAndDelete(id);
            return 'Post deleted successfully';
        },
        likePost: async (_, { id }, { user }) => {
            const post = await Post.findById(id);
            if (!post) throw new Error('Post not found');

            // Check if the user has already liked the post
            if (post.likes.includes(user._id)) {
                throw new Error('You have already liked this post');
            }

            // Add the user to the likes array
            post.likes.push(user._id);
            await post.save();

            return post;
        },
    },
};

export default postResolvers; 