import React, { Component } from 'react';

import Sidebar from './SideBar';

import ExpenseView from './ExpenseView';
import ModalBox from './ModalBox';

class Expense extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
       
          showExpenseView: false,
          
         
        }
      }

      showExpenses(){

        this.setState({
          showExpenseView:!this.state.showExpenseView
        })
    
      }
    
    render() {

    
    
        return (
    
            <div className="container-fluid">
            <div className="row content">
            <Sidebar/>
            <div className="col-sm-10 main-content">
           
            <div className="page-header col-sm-12">
            <h1>Expenses</h1>
            
            </div>

            <div className=" content col-sm-12">
                <div className="row show-expense-header">
                <div className="col-sm-12">
                <button className="btn btn-success" 
                onClick={this.showExpenses.bind(this)}>
                {this.state.showExpenseView ?'Add New Expense':'Show Expenses'}
                </button>
                </div>
                </div>

                    {this.state.showExpenseView ? (
                    <ExpenseView/>
                ):(
                    <ModalBox/>
                )   }   
            
    
        </div>
            
        </div>

        </div>
        </div>
        )
    }    
}
export default Expense;