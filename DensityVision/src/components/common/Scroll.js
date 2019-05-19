import React, { Component, Fragment } from 'react';
import  '../../assets/styles/home.css';
import AnchorLink from 'react-anchor-link-smooth-scroll'

class Scroll extends Component {
  render(){
      return (
        <Fragment> 
            <AnchorLink href='#home'>
            <div className = "scroll">
            <i className="fas fa-chevron-up"></i>
             </div>
            </AnchorLink>
        </Fragment>
      );
    }
  }
export default Scroll;