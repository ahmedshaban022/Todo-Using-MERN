const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
});

UserSchema.pre('save', async function (next){
    const salt= await bcrypt.genSalt(10);
    const hashed= await bcrypt.hash(this.password,salt);
    this.password=hashed;
    next();
});


UserSchema.methods.genAuthToken= function (){
    const token = jwt.sign(this.toJSON(),config.SECRET_KEY);
    return token;
}



module.exports= User = mongoose.model('Users',UserSchema);
