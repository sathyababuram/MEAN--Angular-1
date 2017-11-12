const mongoose = require('mongoose');


const EmployeeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum :['A','D'],
        default :   'A'
    }
});

 module.exports = mongoose.model('Employee',EmployeeSchema);