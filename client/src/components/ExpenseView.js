import React, { Component } from 'react';
import axios from 'axios';
import setCurrentUser from '../utils/setCurrentUser';
import ExpenseReceipt from './ExpenseReceipt';

class ExpenseView extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            expenses:[],

        }
    }

   

  componentWillMount(){

   
   this.getExpenses();
  

  }

  getExpenses(){
    var self=this;

    const userId=setCurrentUser(localStorage.getItem('jwtToken')).currentUser.id;

    axios.get('/api/expense/getAll',{
        params: {
          userid: userId
        }
      })
    .then(function (response) {
     
     self.setState({expenses:response.data})
    })
    .catch(function (error) {
      console.log(error);
    });

    
  }

  deleteExpense(id){
    var self=this;
    axios.delete(`/api/expense/${id}`).then(function(res){
    if(res.status===200){
      self.getExpenses();
    }

   })
  }
 
  
  render() {

   

    let expense=this.state.expenses.map(expense=>{
      
        return(
             <ExpenseReceipt key={expense._id} expense={expense} deleteExpense={this.deleteExpense.bind(this)}/>

        )
    })
    
    return (

        
         <div className="row expense-grid">

            {expense}

            </div>
             
      
      
    );
  }
}

export default ExpenseView;
