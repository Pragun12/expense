const express=require("express");
const router=express.Router();
const jwt=require('jsonwebtoken');
const config=require('../../confg');
const User=require('../../models/User');

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
       console.log(userInfo);
       if(userInfo.password!==password){
        res.send({
            success:false,
            msg:"Invalid password"
        });
       }
       else{
      const token=jwt.sign({
            id:userInfo._id,
            username:userInfo.email
          },config.jwtSecret);
           res.json({token});
      
       }

    }
      
    });
    
});             

module.exports=router;