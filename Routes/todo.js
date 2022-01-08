const express=require('express');
const todo = require('../Models/todo');
const router = express.Router();
const Todo = require('../Models/todo');
const jwt= require('jsonwebtoken');
const config = require('../config');
const User = require('../Models/user');


router.get('/',async(req,res)=>{
    
    let token= await jwt.decode(req.headers.token);
    if(token != null){

        let user=token._id;
        let todos = await Todo.find({user});
        
        res.send(todos)
    }else{res.send("You are not looged in !!")}

});

router.get('/done/:id',async(req,res)=>{
    let token=jwt.decode(req.headers.token);
    let user=token._id;
    const {id}= req.params;
    const oldTodo= await Todo.findOne({'_id':id})
    if(user==oldTodo.user){

        Todo.findOne({'_id':id},{done:true}).then((todo)=>{
            todo.title=oldTodo.title;
            todo.body=oldTodo.body;
            todo.done=true;
            todo.user = user;
            todo.save().then((data)=>{return res.send(data)})
        }).catch((err)=>{res.send("err")});
    } 
    else{return res.status(400).send('Not Approved its not your todo !')};



});




router.get('/undone/:id',async(req,res)=>{
    let token=jwt.decode(req.headers.token);
    let user=token._id;
    const {id}= req.params;
    const oldTodo= await Todo.findOne({'_id':id})
    if(user==oldTodo.user){

        Todo.findOne({'_id':id},{done:false}).then((todo)=>{
            todo.title=oldTodo.title;
            todo.body=oldTodo.body;
            todo.done=false;
            todo.user = user;
            todo.save().then((data)=>{return res.send(data)})
        }).catch((err)=>{res.send("err")});
    } 
    else{return res.status(400).send('Not Approved its not your todo !')};



});


router.delete('/delete/:id',async(req,res)=>{
    let token=jwt.decode(req.headers.token);
    let user=token._id;
    const {id}= req.params;
    
    const oldTodo= await Todo.findOne({'_id':id})
    if(oldTodo){

        if(user==oldTodo.user){
            
            await Todo.deleteOne({'_id':id});
            return res.status(200).send('Todo Deleted Succefuly')
        } 
        else{return res.status(400).send('You cannot delet this  todo !')};
    }else{return res.status(400).send('Wrong Todo !')};



})


router.post('/',async(req,res)=>{
    let user=jwt.decode(req.headers.token);
    
const {title,body} =req.body;

let todo= new Todo({title,body,user});
todo.user= user._id;
todo.save();
res.send('done');

});

module.exports = router;