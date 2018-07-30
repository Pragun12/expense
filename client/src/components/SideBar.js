
import React, { Component } from 'react';
import logo from '../sil.png';
import { Link } from 'react-router-dom';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import setCurrentUser from '../utils/setCurrentUser';

class SideBar extends Component {

logout(){
  localStorage.removeItem('jwtToken');
  setAuthorizationToken( false);
  setCurrentUser({});

  
  window.location.href='/';
}

activateLink(id){
  
  var lis = document.getElementById("sidenavbar").getElementsByTagName("li");
 
  for(var i=0;i<lis.length;i++){
    if(lis[i].classList.contains("active")){
      lis[i].className =  lis[i].className.replace("active", "");
    }
  }
  document.getElementById(id).className+='active';

}

render() {
      return (

 <div className="col-sm-2 sidenav">
 <div className="intro-section">
     <div className='row img-holder'>
     <div className="col-sm-12">
     <img src={logo}  width='100' height='100' className="img-circle" alt="Cinque Terre"/>
     </div>
     </div>

     <div className='row user-holder'>
     <div className="col-sm-12">
     {setCurrentUser(localStorage.getItem('jwtToken')).currentUser.username}
     </div>
     </div>
 </div>

 <div className="menu-section">
 <ul id='sidenavbar' className="nav nav-pills nav-stacked">
     <li id='dashboard' className='active' onClick={this.activateLink.bind(this,'dashboard')}><Link to='/dashboard'>Home</Link></li>
     <li id='expense' className='' onClick={this.activateLink.bind(this,'expense')}><Link to="/expense">Expense</Link></li>
     
     <li ><a onClick={this.logout.bind(this)}>Sign out</a></li>
   </ul>
 </div>
   
   </div>
      )
    }
}

export default SideBar;