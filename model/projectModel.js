const{Schema, model} = require('mongoose');

const ProjectSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    lead:{
      type:Schema.Types.ObjectId,
      ref:'users',
      required:true,
    },
    category:{
      type:String,
      enum:['Web Development', 'Mobile Development', 'Design', 'Marketing', 'Video Production'],
      required:true,
    },
    team:{
      type:[Schema.Types.ObjectId],
      ref:'users',
    },
    client:{
        type:Schema.Types.ObjectId,
        ref:'clients',
        required:true,
    },
    status:{
        type:String,
        enum:['Pending', 'In Progress', 'Completed', 'Terminated'],
        required:true,
    },
    startDate:{
        type:Date,
        required:true,
        default:Date.now,
    },
    endDate:{
        type:Date,
    },
}, { timestamps: true });

module.exports = model('projects', ProjectSchema);
