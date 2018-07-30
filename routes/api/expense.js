const express=require("express");
const router=express.Router();
const jwt=require('jsonwebtoken');
const config=require('../../confg');
const Expense=require('../../models/Expense');
var multer=require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
var upload = multer({ storage:storage });

router.get('/getAll',function(req,res){

   Expense.find({
      userid:req.query.userid
    },(err,expense)=>{
        if(err){
            res.send({
                  success:false,
                  msg:"Server Error"
              });
          }
        else{
            res.json(expense);
        }  
    });
})

router.delete('/:id',function(req,res){
    Expense.findByIdAndRemove(req.params.id, (err, expense) => {  
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "Successfully deleted",
            id: expense._id
        };
        return res.status(200).send(response);
    });
})

router.put('/',upload.single('file'),function(req,res,next){
    var id=req.body.id;
   
    if(req.file){
      var  filename=req.file.originalname;
    }
    else{
      var  filename=req.body.filename;
    }
    
    var expenseInfo={
        
        merchant:req.body.merchant,
        date:req.body.date,
        total:req.body.total,
        category:req.body.category,
        comment:req.body.comment,
        file:filename

        
   };

  
   Expense.findById(id, function (err, expense) {
    if (err) return handleError(err);
  
    expense.set(expenseInfo);
    expense.save(function (err, updatedExpense) {
      if (err) return handleError(err);
      res.json(updatedExpense);
    });
  });


});

router.post('/',upload.single('file'),function(req,res,next){
    
   

    const newExpense=new Expense({

            userid:req.body.userid,
            merchant:req.body.merchant,
            date:req.body.date,
            total:req.body.total,
            category:req.body.category,
            comment:req.body.comment,
            file:req.file.originalname
    
       });

       newExpense.save().then(
        expense=>res.json(expense)
     
     );
    
    
});             

module.exports=router;