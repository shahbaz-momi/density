import React, { Component, Fragment } from 'react';
import tech_landing from  '../../assets/images/tech_landing.svg';
import stack_text from  '../../assets/images/stack_text.png';
import '../../assets/styles/home.css';

class TechLanding extends Component {
  render(){
      return (
        <Fragment>
            <div id = "tech" className = "container home_banner">
            <div className = "row">
             <div className = "col-6">
               <div className = "intro_text">
                <p className = "muted">TECH BEHIND DENSITY</p>
                <img src = {stack_text} alt = "stack_text"></img>
                <hr />
                <p className = "muted">
                Our tech stack consists of a high-performance low-level implementation of C++ to mesh and compute wifi packet signals and modern web-frameworks such as Node.js to pipeline TCP packet data through websockets where  React is ultimatley used to catch and visualize the payload.
                </p>
                <button className="btn">Learn More</button>
               </div>

              </div>
              <div className = "col-6">
              <img className = "tech_landing" src={tech_landing} alt = "tech_landing" />
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
  }
export default TechLanding;