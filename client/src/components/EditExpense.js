import React, { Component } from 'react';
import axios from 'axios';

class EditExpense extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          id:props.expense._id,
          userid:props.expense.userid,
          merchant:props.expense.merchant,
          date:props.expense.date,
          total:props.expense.total,
          category:props.expense.category,
          filename:props.expense.file,
          comment:props.expense.comment,
          file:{},
          formErrors:{merchant:'',category:'',date:'',total:'',file:''},
          merchantValid:false,
          fileValid:false,
          categoryValid:false,
          dateValid:false,
          totalValid:false,
          fileUploaded:false
         
        }
    }

    static defaultProps={
        categories:['Grocery','Maintainance','Equipments','Electric Bills','Rent','Miscellaneous']
      };

      onFileChange(e){
       
        this.setState({
          file:e.target.files[0],
          fileUploaded:true
         }
        );
  
      }

    
      handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value});
      }


  
      saveChange(e){
        e.preventDefault();
        let merchant=this.state.merchant;
        let date=this.state.date;
        let total=this.state.total;
        let category=this.state.category;
        let file=this.state.file;
  
        if(merchant.length===0){
          this.setState({
            formErrors:{
              merchant:'Merchant is required.'
            },
            merchantValid:false,
            categoryValid:true,
            dateValid:true,
            totalValid:true,
            fileValid:true
    
          });

        }
        else if(((new Date(date))>(new Date())) || date===null){
          this.setState({
            formErrors:{
             date:'Date must be before or equal current date'
            },
            merchantValid:true,
            categoryValid:true,
            dateValid:false,
            totalValid:true,
            fileValid:true
    
          });
  
  
         }
         else if(isNaN(total) || total===''){
          this.setState({
            formErrors:{
             total:'Total must be a number.'
            },
            merchantValid:true,
            categoryValid:true,
            dateValid:true,
            totalValid:false,
            fileValid:true
    
          });
           
  
         }
         else if(category.length===0){
  
          this.setState({
            formErrors:{
             category:'Category not selected.'
            },
            merchantValid:true,
            categoryValid:false,
            dateValid:true,
            totalValid:true,
            fileValid:true
    
          });
           
  
         }
        else if(this.state.fileUploaded && !(file.type==='image/jpeg' || file.type==='image/jpg' || file.type==='image/png')){

          this.setState({
            formErrors:{
             file:'Upload an image file.'
            },
            merchantValid:true,
            categoryValid:true,
            dateValid:true,
            totalValid:true,
            fileValid:false
    
          });
           
        }
        
        else{
         
            var formData = new FormData();
            formData.append('userid',this.state.userid);
            formData.append('merchant',this.state.merchant);
            formData.append('date',this.state.date);
            formData.append('total',this.state.total);
            formData.append('category',this.state.category);
            formData.append('file',this.state.file);
            formData.append('filename',this.state.filename);
            formData.append('comment',this.state.comment);
          //  formData.append('id',this.state.id);

            axios.put(`/api/expenses/${this.state.id}`,formData,{ 
          headers: {
          'Content-Type': 'multipart/form-data'
          }
      })
        .then(function (response) {
          window.location.href='/expense';
         
        });
        }

      }

    render(){

        let newDate=new Date(this.state.date);

        let categoryOptions=this.props.categories.map(category=>{
            
            return <option key={category} value={category} selected={this.state.category===category?"selected":""}>{category}</option>
          });

        return(
            <div className="modal fade" id={this.props.expense._id} tabIndex="-1"
            role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
           <div className="modal-dialog" role="document">
             <div className="modal-content">
               <div className="modal-header">
                 <h5 className="modal-title" id="exampleModalLabel">Edit Expense</h5>
                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
                 </button>
               </div>
               <div className="modal-body">
               <form className="form-horizontal" onSubmit={this.saveChange.bind(this)}>
               <div className="row">
               <div className="col-sm-6">
                 <div className="form-group">
                 <label className="control-label col-sm-4" htmlFor="merchant">Merchant:</label>
                 <div className="col-sm-8">
                 <span className="error">{this.state.merchantValid?'':`${this.state.formErrors.merchant}`}</span>
                     <input type="text" className="form-control" id="merchant" 
                     placeholder="Merchant Name" name="merchant" onChange={this.handleUserInput.bind(this)}
                     defaultValue={this.state.merchant}/>
                 </div>
                 </div>
                 <div className="form-group">
                 <label className="control-label col-sm-2" htmlFor="date">Date:</label>
                 <div className="col-sm-8">   
                 <span className="error">{this.state.dateValid?'':`${this.state.formErrors.date}`}</span>        
                     <input type="date" className="form-control" id="date"
                     placeholder="mm/dd/yyyy" name="date" onChange={this.handleUserInput.bind(this)}
                     defaultValue={newDate}
                     />
                 </div>
                 </div>
 
                 <div className="form-group">
                 <label className="control-label col-sm-2" htmlFor="total">Total:</label>
                 <div className="col-sm-6">  
                 <span className="error">{this.state.totalValid?'':`${this.state.formErrors.total}`}</span>        
                     <input type="text" className="form-control" id="total" 
                     placeholder="Total" name="total" onChange={this.handleUserInput.bind(this)}
                     defaultValue={this.state.total}/>
                 </div>
                 </div>
 
                 <div className="form-group">
                 <label className="control-label col-sm-4" htmlFor="category">Category:</label>
                 <div className="col-sm-8"> 
                 <span className="error">{this.state.categoryValid?'':`${this.state.formErrors.category}`}</span>         
                 <select className="form-control" id="category" 
                 name='category' onChange={this.handleUserInput.bind(this)}
                 >
                 <option>Select Category</option>
                     {categoryOptions}
                     
                 </select>
                 </div>
                 </div>
 
                 <div className="form-group">
                 <label className="control-label col-sm-4 " htmlFor="receipt">Expense Receipt:</label>
                 <div className="col-sm-4"> 
                 <span className="error">{this.state.fileValid?'':`${this.state.formErrors.file}`}</span>
                 <input type="file" className="form-control-file" id="receipt" name="file"  onChange={this.onFileChange.bind(this)}/>
                 </div>
             </div>
             </div>
             <div className="col-sm-6">
             <div className="well">
             <img src={`http://localhost:5000/images/${this.state.filename}`} width="200"
              height="200"  alt="receipt"/>
             </div>
             </div>
 
             </div>
 
             <div className="form-group">
                 <label className="control-label col-sm-2" htmlFor="comment">Comment:</label>
                 <div className="col-sm-8">          
                     <input type="text" className="form-control" id="comment"
                     placeholder="Comment" name="comment" defaultValue={this.state.comment}
                     onChange={this.handleUserInput.bind(this)}/>
                 </div>

                   </div>

<div className="form-group">        
<div className="col-sm-2">
    <button type="submit" className="btn btn-primary" >Save Expense</button>
</div>
</div>


</form>


</div>

</div>
</div>
</div>
        )
    }
}

export default EditExpense;