import React, { Component, Fragment } from 'react';
import nav_logo from '../../assets/images/nav_logo.png';
import  '../../assets/styles/header.css';

class Header extends Component {
  render(){
      return (
        <Fragment>
            <nav className="navbar navbar-expand-lg fixed-top b_color navbar-light ">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="container collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="#"> <img className = "nav_logo" src = {nav_logo} alt="nav_logo" /></a>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                     
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Mission</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Tech</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Team</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Trial</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className = "buffer"></div>
        </Fragment>
      );
    }
  }
export default Header;