const {Team} = require('../model');

module.exports={
    /**
     * 
     * GET api/v1/teams
     * 
     * @param req
     * @param res
     * @returns {Promise<*>}
     * 
     */
    
    index: async (req, res) =>{
        try{
            const teams = await Team.find({});
            return res.status(200).json({
                success:true,
                message:'Successfully retrieved all teams',
                data:teams,
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
 * POST api/v1/teams
 * 
 * @param req
 * @param res
 * @returns {Promise<*>}
 * 
 */

create: async (req, res) =>{
    try{
        const team = await Team.create(req.body);
        return res.status(200).json({
            success:true,
            message:'Successfully created the team',
            data:team,
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
 * GET api/v1/teams/:id
 * 
 * @param req
 * @param res
 * @returns {Promise<*>}
 * 
 */

show: async (req, res) =>{
    try{
        const team = await Team.findById(req.params.id);
        if(!team){
            return res.status(404).json({
                success:true,
                message:'Team not found',
                data:null,
            });
        }
        return res.status(200).json({
            success:true,
            message:'Successfully retrieved the team',
            data:team,
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
 * PUT api/v1/teams/:id
 * 
 * @param req
 * @param res
 * @returns {Promise<*>}
 * 
 */
update: async (req, res) =>{
    try{
        const team = await Team.findByIdAndUpdate({ _id: req.params.id }, {
            name: req.body.name,
            description: req.body.description,
        }, { 
            new: true ,
    });
    if(!team){
        return res.status(404).json({
            success:true,
            message:'Team not found',
            data:null,
        });
    }
    return res.status(200).json({
        success:true,
        message:'Successfully updated the team',
        data:team,
    });
}  catch(error){
    return res.status(500).json({
        success:false,
        message:error.message,
        data:error,
    });
}
},
/**
 * 
 * DELETE api/v1/teams/:id
 * 
 * @param req
 * @param res
 * @returns {Promise<*>}
 * 
 */

delete:async (req, res) =>{
    try{
        const team = await Team.findByIdAndDelete( req.params.id );
        if(!team){
            return res.status(404).json({
                success:true,
                message:'Team not found',
                data:null,
            });
        }
        return res.status(200).json({
            success:true,
            message:'Successfully deleted the team',
            data:team,
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

