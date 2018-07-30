import React, { Component } from 'react';
import addExpenseLogo from '../add_expenses.svg';

import axios from 'axios';
import setCurrentUser from '../utils/setCurrentUser';





class ModalBox extends Component {

    constructor(props) {
        super(props);
        
        this.state ={
          imageUrl:'',
         merchant:'',
          category:'',
          date:null,
          total:'',
          comment:'',
          file:{},
          formErrors:{merchant:'',category:'',date:'',total:'',file:''},
          merchantValid:false,
          categoryValid:false,
          dateValid:false,
          totalValid:false,
          fileValid:false
         
          
        }
        
    }
    
      static defaultProps={
        categories:['Grocery','Maintainance','Equipments','Electric Bills','Rent','Miscellaneous']
      };
    
 

      saveExpense(e){
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
       else if(!(file.type==='image/jpeg' || file.type==='image/jpg' || file.type==='image/png')){
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
         
        let userid=setCurrentUser(localStorage.getItem('jwtToken')).currentUser.id;
      
        var formData = new FormData();
        formData.append('userid',userid);
        formData.append('merchant',this.state.merchant);
        formData.append('date',this.state.date);
        formData.append('total',this.state.total);
        formData.append('category',this.state.category);
       formData.append('file',this.state.file);
        formData.append('comment',this.state.comment);
     
      axios.post('/api/expense',formData
       ,{ 
          headers: {
          'Content-Type': 'multipart/form-data'
          }
        }
      )
        .then(function (response) {
        window.location.href='/expense';
         
        });
      }
  
      }


      handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        
       this.setState({[name]: value});
      }
  
      onFileChange(e){
        
        this.setState({file:e.target.files[0]});
  
      }
  

  render() {

    let categoryOptions=this.props.categories.map(category=>{
        return <option key={category} value={category}>{category}</option>
      });
  

    return (

        <div className="center">
        <a  data-toggle="modal" data-target="#expenseformModal" >
        <img src={addExpenseLogo}  width='180' height='180' alt="add expense"/>
        </a>


        <div className="modal fade" id="expenseformModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">New Expense</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        
        
      <form className="form-horizontal" onSubmit={this.saveExpense.bind(this)}>
    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="merchant">Merchant:</label>
      <div className="col-sm-4">
      <span className="error">{this.state.merchantValid?'':`${this.state.formErrors.merchant}`}</span>
        <input type="text" className="form-control" id="merchant" placeholder="Merchant Name" name="merchant" onChange={this.handleUserInput.bind(this)}/>
      </div>
      </div>
    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="date">Date:</label>
      <div className="col-sm-4">   
      <span className="error">{this.state.dateValid?'':`${this.state.formErrors.date}`}</span>       
        <input type="date" className="form-control" id="date" placeholder="mm/dd/yyyy" name="date" onChange={this.handleUserInput.bind(this)}/>
      </div>
    </div>

    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="total">Total:</label>
      <div className="col-sm-4">  
      <span className="error">{this.state.totalValid?'':`${this.state.formErrors.total}`}</span>        
        <input type="text" className="form-control" id="total" placeholder="Total" name="total" onChange={this.handleUserInput.bind(this)}/>
      </div>
    </div>

    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="category">Category:</label>
      <div className="col-sm-4"> 
      <span className="error">{this.state.categoryValid?'':`${this.state.formErrors.category}`}</span>         
      <select className="form-control" id="category" name='category' onChange={this.handleUserInput.bind(this)}>
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

    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="comment">Comment:</label>
      <div className="col-sm-8">          
        <input type="text" className="form-control" id="comment" placeholder="Comment" name="comment" onChange={this.handleUserInput.bind(this)}/>
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
         </div>
      
    );
  }
}

export default ModalBox;
