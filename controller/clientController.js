const {Client} = require('../model');

module.exports = {
    /**
     * 
     * GET /api/clients
     * 
     * @param req
     * @param res
     * @returns {Promise<*>}
     * 
     */
    index: async (req, res) =>{
        try{
            const clients = await Client.find({});
            return res.status(200).json({
                success:true,
                message:'Successfully retrieved all clients',
                data:clients,
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
     * POST /api/clients
     * 
     * @param req
     * @param res
     * @returns {Promise<*>}
     * 
     */
    create: async (req, res) => {
        try{
            const client = await Client.create(req.body);
            return res.status(200).json({
                success:true,
                message:'Successfully created the client',
                data:client,
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
     * GET /api/clients/:id
     * 
     * @param req
     * @param res
     * @returns {Promise<*>}
     * 
     */
    show: async (req, res) =>{
        try{
            const client = await Client.findById(req.params.id);
            if(!client){
                return res.status(404).json({
                    success:false,
                    message:'Client not found',
                    data:null,
                });
            }
            return res.status(200).json({
                success:true,
                message:'Successfully retrieved the client',
                data:client,
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
     * PUT /api/clients/:_id
     * 
     * @param req
     * @param res
     * @returns {Promise<*>}
     * 
     */
    update: async (req, res) => {
        try{
            const client = await Client.findByIdAndUpdate({ _id: req.params.id }, {
               firstName: req.body.firstName,
               lastName: req.body.lastName,
               email: req.body.email,
               address: req.body.address,
            }, { new: true 
            });
            if(!client){
                return res.status(404).json({
                    success:false,
                    message:'Client not found',
                    data:null,
                });
            }
            return res.status(200).json({
                success:true,
                message:'Successfully updated the client',
                data:client,
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
     * DELETE /api/clients/:id
     * 
     * @param req
     * @param res
     * @returns {Promise<*>}
     * 
     */

    delete: async (req, res) => {
        try{
            const client = await Client.findByIdAndDelete(req.params.id);
            if(!client){
                return res.status(404).json({
                    success:false,
                    message:'Client not found',
                    data:null,
                });
            }
            return res.status(200).json({
                success:true,
                message:'Successfully deleted the client',
                data:client,
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