const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['Admin', 'User'],
        required:true,
    },
    projects:{
        type:Schema.Types.ObjectId,
        ref:'projects',
    },
    tasks:{
        type:Schema.Types.ObjectId,
        ref:'tasks',
    },
    teams:{
        type:Schema.Types.ObjectId,
        ref:'teams',
    },
}, { timestamps: true });

module.exports = model('users', UserSchema);