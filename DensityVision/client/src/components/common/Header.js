import React, { Component, Fragment } from 'react';
import Logo from '../home/Logo';
import nav_logo from '../../assets/images/nav_logo.png';
import  '../../assets/styles/header.css';

class Header extends Component {
  render(){
      return (
        <Fragment>
          <img src = {nav_logo} alt="nav_logo" />
          
        </Fragment>
      );
    }
  }
export default Header;