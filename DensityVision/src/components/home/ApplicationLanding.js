import React, { Component, Fragment } from 'react';
import applications_landing from  '../../assets/images/applications_landing.svg';
import apps_text from  '../../assets/images/apps_text.png';
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
                <img className = "apps_text" src={apps_text} alt = "apps_text" />
                <hr />
                <p className = "muted">
                The Density API is intentfully diverse and versatile: to users it deduces traffic of common places such as libraries or malls, keeping us connected to our communities, 
                and to organizations an invaluable tool to track location popularity, customer movement patterns and enhance the connected customer experience.
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