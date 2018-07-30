import React, { Component } from 'react';

import EditExpense from './EditExpense';


class ExpenseReceipt extends Component {

  deleteExpense(e){
    if(window.confirm('Are you Sure?')){

    let id= this.props.expense._id;
    this.props.deleteExpense(id);
  
    }

  }

    render(){


        let expenseid=`#${this.props.expense._id}`;
        
          return(

            <div>
            <div className="col-sm-3" key={this.props.expense._id}>
            
            <div className="well">
            <div className="row">
            <div className="col-sm-12 ">
            <a className="delete-btn" onClick={this.deleteExpense.bind(this)}>X</a>
            </div>
            </div>
            <a  data-toggle="modal" data-target={expenseid} >
            <img src={`http://localhost:5000/images/${this.props.expense.file}`} width="150"
             height="150"  alt="receipt"/>
            </a>
            <p><b>{this.props.expense.merchant}</b></p>
            </div>
            </div>

            <EditExpense expense={this.props.expense} />
         
              
            </div>

          )

    }
}
export default ExpenseReceipt;