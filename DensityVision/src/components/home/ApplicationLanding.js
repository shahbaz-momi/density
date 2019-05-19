import React, { Component, Fragment } from 'react';
import applications_landing from  '../../assets/images/applications_landing.svg';
import about_text from  '../../assets/images/about_text.png';
import '../../assets/styles/home.css';

class ApplicationLanding extends Component {
  render(){
      return (
        <Fragment>
           <div id = "apps" className = "container home_banner">
            <div className = "row">
            <div className = "col-6">
                  <img className = "applications_landing" src={applications_landing} alt = "home_landing" />
                </div>
             <div className = "col-6">
               <div className = "intro_text">
               <p className = "muted"> DENSITY COMMERCIAL APPLICATIONS</p>
                <img className = "about_text" src={about_text} alt = "about_text" />
                <hr />
                <p className = "muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </p>
                <button className="btn">Learn More</button>
               </div>

              </div>
                
            </div>
          </div>
        </Fragment>
      );
    }
  }
export default ApplicationLanding;