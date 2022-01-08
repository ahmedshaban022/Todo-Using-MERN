const express = require('express');
const router = express.Router();
const User =require('../Models/user');
const bcrypt= require('bcrypt');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    let user = await  User.findOne({username});
    if (user)return res.status(400).send("UserName already exist!");

     user= new User({username,password});
     user.save();
    res.send(await user.genAuthToken())


});

router.post('/login', async (req, res) => {
   
    const { username, password } = req.body;
    if(!username) return res.status(400).send('Username is required');
    if(!password) return res.status(400).send('Password is required');

    let user = await  User.findOne({username});
    if (!user)return res.status(400).send("Username or password is wrong");
    let isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(400).send("Username or Password is wrong");
    res.send(await user.genAuthToken())


});

module.exports = router;
