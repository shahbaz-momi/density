import React, { Component, Fragment } from 'react';
import home_landing from  '../../assets/images/home_landing.svg';
import density_text from  '../../assets/images/density_text.png';
import '../../assets/styles/home.css';

class HomeLanding extends Component {
  render(){
      return (
        <Fragment>
          <div id = "home" className = "container home_banner">
            <div className = "row">
             <div className = "col-6">
               <div className = "intro_text">
                <p className = "muted">INTRODUCING</p>
                <img src = {density_text} alt = "density_text"></img>
                <hr />
                <p className = "muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </p>
                <button className="btn">Live Demo</button>
               </div>

              </div>
              <div className = "col-6">
                <img className = "home_landing" src={home_landing} alt = "home_landing" />
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
  }
export default HomeLanding;