import React, { Component } from 'react';

import Sidebar from './SideBar';


class Dashboard extends Component {
  render() {
    return (

        <div className="container-fluid">
        <div className="row content">
        <Sidebar/>

        <div className="col-sm-10 main-content">
       
       <div className="page-header col-sm-12">
       <h1>Dashboard</h1>
       
       </div>
       </div>
        </div>
       </div>
      
    );
  }
}

export default Dashboard;
