import React, { Component } from 'react';
import logo from '../../assets/images/density_logo.png';
import '../../assets/styles/nav.css';

class Logo extends Component {
  render(){
      return (
        <div className = "nav_container">
            <hr />
              <p>
                ABOUT
              </p>
              <p>
                STACK
              </p>
              <p>
                TEAM
              </p>
              <p>
                MORE
              </p>
            <hr />
        </div>
      );
    }
  }
export default Logo;