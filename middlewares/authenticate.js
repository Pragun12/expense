const jwt=require('jsonwebtoken');
const config=require('../confg');
const User=require('../models/User');
const authenticate= (req,res,next)=>{
    const authorizationHeader=req.headers['authorization'];
    let token;
    if(authorizationHeader){
        token=authorizationHeader.split(' ')[1];
    }

    if(token){

       jwt.verify(token,config.jwtSecret,(err,decoded)=>{
           if(err){
               res.status(401).json({
                   error:'Failed to authenticate'
               })
           }
           else{
               User.findById(decoded.id).then(user=>{
                   if(!user){
                       res.status(404).json({
                           error:'No such user'
                       })
                   }
                   req.currentUser=user;
                   next();
               });
           }
       })

    }
    else{
        res.status(403).json({
            error:'No token provided'
        });
    }
}

module.exports=authenticate;