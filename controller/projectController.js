// Import the Project and User models
import Project from "../model/projectModel.js";
import User from "../model/userModel.js";

// For posting data into the database
export const createProject = async (req, res) => {
    try {
        const { name, description, startDate, endDate, userIds } = req.body;

        // Check if a project with the same name already exists
        const projectExist = await Project.findOne({ name });
        if (projectExist) {
            return res.status(400).json({ message: "Project with this name already exists." });
        }

        // Create a new Project instance
        const projectData = new Project({
            name,
            description,
            startDate,
            endDate,
            users: userIds,
        });

        // Save the new project into the database
        const savedProject = await projectData.save();

        // Update the users to include the project reference
        await User.updateMany({ _id: { $in: userIds } }, { $push: { projects: savedProject._id } });

        // Send a success response with the saved project data
        res.status(200).json(savedProject);
    } catch (error) {
        // Handle any errors and send an internal server error response
        res.status(500).json({ error: "Internal Server Error." });
    }
}

// For getting all projects from the database
export const fetchProjects = async (req, res) => {
    try {
        // Find all projects in the database
        const projects = await Project.find().populate('users tasks');

        // If no projects are found, send a 404 error response
        if (projects.length === 0) {
            return res.status(404).json({ message: "Projects not found." });
        }

        // Send a success response with the fetched projects data
        res.status(200).json(projects);
    } catch (error) {
        // Handle any errors and send an internal server error response
        res.status(500).json({ error: "Internal Server Error." });
    }
}

// For updating project data
export const updateProject = async (req, res) => {
    try {
        // Extract project id from request parameters
        const projectId = req.params.id;

        // Check if the project with the given id exists
        const projectExist = await Project.findOne({ _id: projectId });
        if (!projectExist) {
            return res.status(404).json({ message: "Project not found." });
        }

        // Update the project data and return the updated project
        const updatedProject = await Project.findByIdAndUpdate(projectId, req.body, { new: true });
        res.status(201).json(updatedProject);
    } catch (error) {
        // Handle any errors and send an internal server error response
        res.status(500).json({ error: "Internal Server Error." });
    }
}

// For deleting a project from the database
export const deleteProject = async (req, res) => {
    try {
        // Extract project id from request parameters
        const projectId = req.params.id;

        // Check if the project with the given id exists
        const projectExist = await Project.findOne({ _id: projectId });
        if (!projectExist) {
            return res.status(404).json({ message: "Project not found." });
        }

        // Delete the project from the database
        await Project.findByIdAndDelete(projectId);

        // Send a success response
        res.status(201).json({ message: "Project deleted successfully." });
    } catch (error) {
        // Handle any errors and send an internal server error response
        res.status(500).json({ error: "Internal Server Error." });
    }
}
