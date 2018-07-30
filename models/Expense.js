const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const ExpenseSchema=new Schema({
    merchant:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true

    },
    comment:{
        type:String
       
    },
    file:{
        type:String,
        required:true
    }

});
module.exports=Expense=mongoose.model('expense',ExpenseSchema);