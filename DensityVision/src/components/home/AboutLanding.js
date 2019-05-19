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
               <div className = "intro_text">
               <p className = "muted">WHAT IS DENSITY?</p>
                <img className = "about_text" src={about_text} alt = "about_text" />
                <hr />
                <p className = "muted">
                The Density API is a population tracker that predicts population heatmaps in confined areas using hardware to detect wifi packets, plotting population
                density, retention rate and more to provide invaluable information to individual users and agencies looking to optimize connected customer experience. 

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
export default AboutLanding;