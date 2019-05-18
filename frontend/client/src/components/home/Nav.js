import React, { Component } from 'react';
import logo from '../../assets/images/density_logo.png';
import '../../assets/styles/nav.css';

class Logo extends Component {
  render(){
      return (
        <div className = "nav_container">
            <hr />
                About
                Stack
                Docs
                Team
            <hr />
        </div>
      );
    }
  }
export default Logo;