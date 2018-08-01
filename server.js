const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const users=require('./routes/api/users');
var path=require('path');
const auth=require('./routes/api/auth');
const expense=require('./routes/api/expense');

var app=express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
const db=require("./config/keys").mongoURI;

mongoose
.connect(db)
.then(()=>console.log("Database connected...."))
.catch(err=>console.log(err));

app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/expense',expense);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });


}

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server started on port ${port}`));