const {Schema, model} = require('mongoose');

const TaskSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    project:{
        type:Schema.Types.ObjectId,
        ref:'projects',
        required:true,
    },
    assignee:{
        type:Schema.Types.ObjectId,
        ref:'users',
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
    dueDate:{
        type:Date,
        required:true,
    },
}, { timestamps: true });

module.exports = model('tasks', TaskSchema);
