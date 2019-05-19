import React, { Component, Fragment } from 'react';
import nav_logo from '../../assets/images/nav_logo.png';
import  '../../assets/styles/header.css';
import AnchorLink from 'react-anchor-link-smooth-scroll'

class Header extends Component {
  render(){
      const divStyle = {
        backgroundImage: "linear-gradient(rgb(237,237,237,1), rgb(237,237,237,1), rgb(237,237,237,0))"
      }
      return (
        <Fragment> 
            <nav className="navbar navbar-expand-lg fixed-top b_color navbar-light " style = {divStyle}>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="container collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="#">
                        <AnchorLink href='#home'>
                            <img className = "nav_logo" src = {nav_logo} alt="nav_logo" />
                        </AnchorLink>
                    </a>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item nav-link">
                                <AnchorLink href='#about'>
                                    About
                                </AnchorLink>
                        </li>
                        <li className="nav-item nav-link">
                                <AnchorLink href='#tech'>
                                    Tech
                                </AnchorLink>
                        </li>
                        <li className="nav-item nav-link">
                                <AnchorLink href='#apps'>
                                    Applications
                                </AnchorLink>
                        </li>
                        <li className="nav-item nav-link">
                                <AnchorLink href='#demo'>
                                    Demo
                                </AnchorLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className = "buffer"></div>
            <div className = "buffer"></div>
            <div className = "buffer"></div>
        </Fragment>
      );
    }
  }
export default Header;