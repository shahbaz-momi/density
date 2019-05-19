import React, { Component, Fragment } from 'react';
import about_landing from  '../../assets/images/about_landing.svg';
import about_text from  '../../assets/images/about_text.png';
import '../../assets/styles/home.css';

class AboutLanding extends Component {
  render(){
      return (
        <Fragment>
          <div id = "about" className = "container home_banner">
            <div className = "row">
            <div className = "col-6">
                <img className = "about_landing" src={about_landing} alt = "home_landing" />
              </div>
             <div className = "col-6">
               <div className = "about_text">
                <p className = "muted">WHAT IS DENSITY?</p>
                <img src = {about_text} alt = "about_text"></img>
               </div>
              </div>
            
            <div className = "col-12">
            <p className = "muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            </p>
            </div>
             
            </div>
          </div>
        </Fragment>
      );
    }
  }
export default AboutLanding;