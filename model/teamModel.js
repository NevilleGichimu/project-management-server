const {Schema, model} = require('mongoose');

const TeamSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    lead:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },
    members:{
        type:Schema.Types.ObjectId,
        ref:'users',
    },
    projects:{
        type:Schema.Types.ObjectId,
        ref:'projects',
    },
    tasks:{
        type:Schema.Types.ObjectId,
        ref:'tasks',
    },
}, { timestamps: true });

module.exports = model('teams', TeamSchema);