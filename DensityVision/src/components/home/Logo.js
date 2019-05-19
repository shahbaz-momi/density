import React, { Component } from 'react';
import logo from '../../assets/images/density_logo.png';
import '../../assets/styles/logo.css';

class Logo extends Component {
  render(){
      return (
        <div className = "logo_container">
          <img alt = "density-logo" className = "home_logo" src = {logo} />
        </div>
      );
    }
  }
export default Logo;