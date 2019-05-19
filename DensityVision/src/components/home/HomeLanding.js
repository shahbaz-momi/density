import React, { Component, Fragment } from 'react';
import home_landing from  '../../assets/images/home_landing.svg';
import density_text from  '../../assets/images/density_text.png';
import '../../assets/styles/home.css';
import AnchorLink from 'react-anchor-link-smooth-scroll'

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
                The multi-purpose population tracking and analysis API for individuals and organizations looking to innovate in their attempts to improve productivity, make effective choices and stay connected to the world.
                </p>
                <AnchorLink href='#demo'>
                <button className="btn">Live Demo</button>
                  </AnchorLink>
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