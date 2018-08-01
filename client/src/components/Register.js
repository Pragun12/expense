import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

class Register extends Component {

    constructor (props) {
        super(props);
        this.state = {
        
          firstname:'',
          lastname:'',
          email: '',
          pwd: '',
          confpwd:'',
          formErrors: {firstname:'',lastname:'', email: '', password: ''},
          firstnameValid:false,
          lastnameValid:false,
          emailValid:false,
          passwordValid:false,
          confPasswordValid:false,
         
        }
      }

    handleSubmit(e){
        e.preventDefault();

          let firstName=this.state.firstname;
          let lastName= this.state.lastname;
           let email= this.state.email;
           let password= this.state.pwd;
           let confPassword=this.state.confpwd;
           let re=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
         //  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(firstName.length===0){

          this.setState({
            formErrors:{
              firstname:'Firstname is required.'
            },
            emailValid:true,
            passwordValid:true,
            firstnameValid:false,
            lastnameValid:true,
            confPasswordValid:true
    
          })


        }
        else if(lastName.length===0){

          this.setState({
            formErrors:{
              lastname:'Lastname is required.'
            },
            emailValid:true,
            passwordValid:true,
            firstnameValid:true,
            lastnameValid:false,
            confPasswordValid:true
    
          })


        }
        else if( !re.test(String(email).toLowerCase())){
          this.setState({
            formErrors:{
              email:'Email is invalid'
            },
            emailValid:false,
            passwordValid:true,
            firstnameValid:true,
            lastnameValid:true,
            confPasswordValid:true
    
          })

        }
        else if( !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)){

          this.setState({
            formErrors:{
              password:'Password should have at least one numeric digit, one uppercase and one lowercase letter'
            }
            ,
            emailValid:true,
            passwordValid:false,
            firstnameValid:true,
            lastnameValid:true,
            confPasswordValid:true
          })
        

        }
        else if(!confPassword.match(password)){

          this.setState({
            formErrors:{
              password:'Password did not match'
            }
            ,
            emailValid:true,
            passwordValid:true,
            firstnameValid:true,
            lastnameValid:true,
            confPasswordValid:false
          })
        


        }
        else{
         

         let self=this;
          axios.post('/api/users', {
            firstName: this.state.firstname,
            lastName:  this.state.lastname,
            email: this.state.email,
            password: this.state.pwd,
            type:0
          })
          .then(function (response) {
            if(response.data.msg==="Invalid Credentials"){
              self.setState({
                formErrors:{
                  email:'Email provided already exists.'
                }
                ,
                emailValid:false,
                passwordValid:true,
                firstnameValid:true,
                lastnameValid:true,
                confPasswordValid:true

              });
            }
            else{
              window.location.href="/";

            }
            
            
          })
          .catch(function (error) {
            console.log(error);
          });

       

        }
        
        
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
      }


  render() {
    return (
        <div id="sign-in" >
        <div className="container row">
        <div className="col-sm-4 well login-box">
        <div className="content-wrapper">
        <h3>Expense Manager</h3>

         <form  onSubmit={this.handleSubmit.bind(this)}>
         <div className="form-group">
         <span className="error">{this.state.firstnameValid?'':`${this.state.formErrors.firstname}`}</span>
          <input type="text" className="form-control" onChange={this.handleUserInput.bind(this)} placeholder="First Name" name="firstname"/>
        </div>
        <div className="form-group">
        <span className="error">{this.state.lastnameValid?'':`${this.state.formErrors.lastname}`}</span>
         <input type="text" className="form-control" onChange={this.handleUserInput.bind(this)} placeholder="Last Name" name="lastname"/>
       </div>
        <div className="form-group">
        <span className="error">{this.state.emailValid?'':`${this.state.formErrors.email}`}</span>
          <input type="email" className="form-control" onChange={this.handleUserInput.bind(this)} placeholder="Email Address" name="email"/>
        </div>
        <div className="form-group">
        <span className="error">{this.state.passwordValid?'':`${this.state.formErrors.password}`}</span>
          <input type="password" className="form-control" onChange={this.handleUserInput.bind(this)}  placeholder="Password" name="pwd"/>
        </div>

         <div className="form-group">
         <span className="error">{this.state.confPasswordValid?'':`${this.state.formErrors.password}`}</span>
          <input type="password" className="form-control" onChange={this.handleUserInput.bind(this)} placeholder="Confirm Password" name="confpwd"/>
        </div>
        
        <button type="submit" className="btn btn-primary"  >Register</button>
        <span>  </span>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>


        </div>
        </div>
        </div>
        </div>
    );
  }
}

export default Register;
