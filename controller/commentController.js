// Import Comment and Task models
import Comment from "../model/commentModel.js";
import Task from "../model/taskModel.js";

// For creating a new comment
export const createComment = async (req, res) => {
    try {
        const { content, author, taskId } = req.body;

        // Create a new Comment instance
        const commentData = new Comment({
            content,
            author,
            taskId
        });

        // Save the new comment into the database
        const savedComment = await commentData.save();

        // Add comment to the task
        await Task.findByIdAndUpdate(taskId, { $push: { comments: savedComment._id } });

        // Send a success response with the saved comment data
        res.status(200).json(savedComment);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
}

// For fetching all comments
export const fetchComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate('author taskId');

        if (comments.length === 0) {
            return res.status(404).json({ message: "Comments not found." });
        }

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
}

// For updating comment data
export const updateComment = async (req, res) => {
    try {
        const commentId = req.params.id;

        const commentExist = await Comment.findOne({ _id: commentId });
        if (!commentExist) {
            return res.status(404).json({ message: "Comment not found." });
        }

        const updatedComment = await Comment.findByIdAndUpdate(commentId, req.body, { new: true });
        res.status(201).json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
}

// For deleting a comment
export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;

        const commentExist = await Comment.findOne({ _id: commentId });
        if (!commentExist) {
            return res.status(404).json({ message: "Comment not found." });
        }

        await Comment.findByIdAndDelete(commentId);
        res.status(201).json({ message: "Comment deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
}
