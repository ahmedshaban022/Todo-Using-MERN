const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://uahmed:27727746@main.4vrbk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
.catch((err)=>console.log(err));
app.use(require('cors')());
app.use(express.json());

 app.use('/users',require('./Routes/users'));
 app.use('/todos',require('./Routes/todo'));

 app.use(express.static('client/build'));
app.get('*',(req,res)=>{
   res.sendFile(`${__dirname}/client/build/index.html`)
})

    
    app.listen(process.env.PORT || 5000);
