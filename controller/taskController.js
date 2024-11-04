const {Task}= require('../model');

module.exports={
    /**
     * 
     * GET api/v1/tasks
     * 
     * @param req
     * @param res
     * @returns {Promise<*>}
     */

    index: async (req, res) =>{
        try{
            const tasks = await Task.find({});
            return res.status(200).json({
                success:true,
                message:'Successfully retrieved all tasks',
                data:tasks,
            });
        }catch(error){
            return res.status(500).json({
                success:false,
                message:error.message,
                data:error,
            });
        }
    },

    /**
     * 
     * POST api/v1/tasks
     * 
     * @param req
     * @param res
     * @returns {Promise<*>}
     * 
     */

    create: async (req, res) =>{
        try{
            const task = await Task.create(req.body);
            return res.status(200).json({
                success:true,
                message:'Successfully created the task',
                data:task,
            });
        }catch(error){
            return res.status(500).json({
                success:false,
                message:error.message,
                data:error,
            });
        }
    },

    /**
     * 
     * GET api/v1/tasks/:id
     * 
     * @param req
     * @param res
     * @returns {Promise<*>}
     * 
     */

    show: async (req, res) =>{
        try{
            const task = await Task.findById(req.params.id);
            if(!task){
                return res.status(404).json({
                    success:false,
                    message:'Task not found',
                    data:null,
                });
            }
            return res.status(200).json({
                success:true,
                message:'Successfully retrieved the task',
                data:task,
            });
        }catch(error){
            return res.status(500).json({
                success:false,
                message:error.message,
                data:error,
            });
        }
    },

    /**
     * 
     * PUT api/v1/tasks/:id
     * 
     * @param req
     * @param res
     * @returns {Promise<*>}
     * 
     */
    update: async (req, res) => {
        try {
          const task = await Task.findByIdAndUpdate({ _id: req.params.id }, {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            dueDate: req.body.dueDate,
          }, {
            new: true,
        });
        if (!task) {
          return res.status(404).json({
            success: false,
            message: 'Task not found',
            data: null,
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Successfully updated the task',
          data: task,
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
            data:error,
        });
    }
},
/**
 * 
 * DELETE api/v1/tasks/:id
 * 
 * @param req
 * @param res
 * @returns {Promise<*>}
 * 
 */
delete: async (req, res) =>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).json({
                success:false,
                message:'Task not found',
                data:null,
            });
        }
        return res.status(200).json({
            success:true,
            message:'Successfully deleted the task',
            data:task,
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
            data:error,
        });
    }
},
};
    