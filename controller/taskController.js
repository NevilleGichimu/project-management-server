// Import Task and Project models
import Task from "../model/taskModel.js";
import Project from "../model/projectModel.js";

// For posting a new task into the database
export const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, assignedTo, dueDate, projectId } = req.body;

        // Create a new Task instance
        const taskData = new Task({
            title,
            description,
            status,
            priority,
            assignedTo,
            dueDate,
            projectId
        });

        // Save the new task into the database
        const savedTask = await taskData.save();

        // Add task to the project
        await Project.findByIdAndUpdate(projectId, { $push: { tasks: savedTask._id } });

        // Send a success response with the saved task data
        res.status(200).json(savedTask);
    } catch (error) {
        // Handle any errors and send an internal server error response
        res.status(500).json({ error: "Internal Server Error." });
    }
}

// For getting all tasks from the database
export const fetchTasks = async (req, res) => {
    try {
        // Find all tasks in the database
        const tasks = await Task.find().populate('assignedTo projectId');

        // If no tasks are found, send a 404 error response
        if (tasks.length === 0) {
            return res.status(404).json({ message: "Tasks not found." });
        }

        // Send a success response with the fetched tasks data
        res.status(200).json(tasks);
    } catch (error) {
        // Handle any errors and send an internal server error response
        res.status(500).json({ error: "Internal Server Error." });
    }
}

// For updating task data
export const updateTask = async (req, res) => {
    try {
        // Extract task id from request parameters
        const taskId = req.params.id;

        // Check if the task with the given id exists
        const taskExist = await Task.findOne({ _id: taskId });
        if (!taskExist) {
            return res.status(404).json({ message: "Task not found." });
        }

        // Update the task data and return the updated task
        const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
        res.status(201).json(updatedTask);
    } catch (error) {
        // Handle any errors and send an internal server error response
        res.status(500).json({ error: "Internal Server Error." });
    }
}

// For deleting a task from the database
export const deleteTask = async (req, res) => {
    try {
        // Extract task id from request parameters
        const taskId = req.params.id;

        // Check if the task with the given id exists
        const taskExist = await Task.findOne({ _id: taskId });
        if (!taskExist) {
            return res.status(404).json({ message: "Task not found." });
        }

        // Delete the task from the database
        await Task.findByIdAndDelete(taskId);

        // Send a success response
        res.status(201).json({ message: "Task deleted successfully." });
    } catch (error) {
        // Handle any errors and send an internal server error response
        res.status(500).json({ error: "Internal Server Error." });
    }
}

