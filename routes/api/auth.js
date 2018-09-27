const express=require("express");
const router=express.Router();
const jwt=require('jsonwebtoken');
const config=require('../../confg');
const User=require('../../models/User');
const bcrypt=require('bcrypt');

router.post('/',function(req,res){
    
   const username=req.body.email;
   const password=req.body.password;

    User.find({
        email:username
    },(err,user)=>{
        if(err){
          res.send({
                success:false,
                msg:"Server Error"
            });
        }
        
       else if(user.length!==1){
            res.send({
                success:false,
                msg:"Invalid Username"
            });
        }
     else{ 
       const userInfo=user[0];
     
       bcrypt.compare(password, userInfo.password, function(err, response) {

        
        console.log(response);
        if(response) {
         // Passwords match

         const token=jwt.sign({
            id:userInfo._id,
            username:userInfo.email
          },config.jwtSecret);

           res.json({token});
      
        
        } else {
         // Passwords don't match
            console.log('Invalid assword');
            res.status(404).json({
                success:false,
                msg:"Invalid password"
            })
         
        } 
      });


       

    }
      
    });
    
});             

module.exports=router;