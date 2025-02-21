import Comment from '../../models/Comment.js'; // Adjust the path as necessary
import Post from '../../models/Post.js'; // Adjust the path as necessary

const commentResolvers = {
    Query: {
        getComments: async (_, { postId }) => {
            return await Comment.find({ commentPost: postId }).sort({ createdAt: -1 });
        },
    },
    Mutation: {
        createComment: async (_, { postId, commentText, commentImage }, { user }) => {
            const comment = await Comment.create({
                commentText,
                commentImage,
                commentOwner: user.id,
                commentPost: postId,
            });
            await Post.findByIdAndUpdate(postId, {
                $push: { comments: comment._id },
            });
            return comment;
        },
        updateComment: async (_, { commentId, commentText }, { user }) => {
            const comment = await Comment.findById(commentId);
            if (!comment) throw new Error('Comment not found');
            if (comment.commentOwner.toString() !== user.id) throw new Error('Not authorized');

            comment.commentText = commentText;
            await comment.save();
            return comment;
        },
        deleteComment: async (_, { commentId }, { user }) => {
            const comment = await Comment.findById(commentId);
            if (!comment) throw new Error('Comment not found');
            if (comment.commentOwner.toString() !== user.id) throw new Error('Not authorized');

            await comment.remove();
            await Post.findByIdAndUpdate(comment.commentPost, {
                $pull: { comments: commentId },
            });
            return 'Comment deleted successfully';
        },
    },
};

export default commentResolvers;
