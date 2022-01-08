const mongoose = require('mongoose');


const TodoSchema= mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        },
        title:{
            type:String,
            required:true
        },
        done:{
            type:Boolean,
            default:false,
        },
        body:{
            type:String
        }
});

module.exports= Todo=mongoose.model('Todos',TodoSchema);