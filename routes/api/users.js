const express=require("express");
const router=express.Router();

const User=require('../../models/User');

router.get('/',(req,res)=>{
    User
    .find()
    .then(users=>res.json(users))
});


router.post('/',function(req,res){
   const newUser=new User({

    firstname:req.body.firstName,
    lastname:req.body.lastName,
    email:req.body.email,
    password:req.body.password,
    type:req.body.type

   });

   newUser.save(function (err) {
    if (err){
    //res.status(400);
    res.send({
        msg:'Invalid Credentials'});
    }
    else{
        res.send({
            msg:'success'
        } );
    }
    // saved!
  });
    
             
 });

 


module.exports=router;