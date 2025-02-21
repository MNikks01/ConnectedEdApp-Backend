import Like from '../../models/Like.js'; // Adjust the path as necessary
import Post from '../../models/Post.js'; // Adjust the path as necessary

const likeResolvers = {
    Query: {
        getLikes: async (_, { postId }) => {
            const post = await Post.findById(postId).populate('likes', 'username profile');
            if (!post) throw new Error('Post not found');
            return post.likes;
        },
    },
    Mutation: {
        likePost: async (_, { postId }, { user }) => {
            const post = await Post.findById(postId);
            if (!post) throw new Error('Post not found');

            // Check if the user has already liked the post
            const existingLike = await Like.findOne({ likedPost: postId, likedBy: user._id });
            if (existingLike) throw new Error('Post already liked');

            // Create a new like
            const newLike = new Like({
                likedPost: postId,
                likedBy: user._id,
            });

            await newLike.save();

            // Update the post to include the new like
            await Post.findByIdAndUpdate(postId, {
                $addToSet: { likes: user._id }
            });

            return newLike;
        },
        unlikePost: async (_, { postId }, { user }) => {
            const post = await Post.findById(postId);
            if (!post) throw new Error('Post not found');

            // Check if the user has liked the post
            const existingLike = await Like.findOne({ likedPost: postId, likedBy: user._id });
            if (!existingLike) throw new Error('Post not liked yet');

            // Remove the like
            await Like.findByIdAndDelete(existingLike._id);

            // Update the post to remove the like
            await Post.findByIdAndUpdate(postId, {
                $pull: { likes: user._id }
            });

            return 'Post unliked successfully';
        },
    },
};

export default likeResolvers; 