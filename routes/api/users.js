const express=require("express");
const router=express.Router();
const bcrypt=require('bcrypt');
const User=require('../../models/User');
const authenticate=require('../../middlewares/authenticate');

router.get('/:id/expenses',authenticate,function(req,res){

    console.log('CU : '+req.currentUser);

const id=req.params.id;



Expense.find({
    userid:id
  },(err,expense)=>{
      if(err){
          res.status(500).send({
                success:false,
                msg:"Server Error"
            });
        }
      else{
          res.json(expense);
      }  
  });

})

router.post('/',function(req,res){
   const newUser=new User({

    firstname:req.body.firstName,
    lastname:req.body.lastName,
    email:req.body.email,
    password:bcrypt.hashSync(req.body.password,10),
    type:req.body.type

   });

   newUser.save(function (err) {
    if (err){
    //res.status(400);
    res.send({
        msg:'Invalid Credentials'
    });
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