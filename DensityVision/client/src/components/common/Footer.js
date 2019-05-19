import React, { Component, Fragment } from 'react';
import  '../../assets/styles/footer.css';
import  logo from '../../assets/images/density_white.png';

class Header extends Component {
  render(){
      return (
        <Fragment>
            <div className = "buffer"></div>
            <div className = "footer_container">
                <div className = "container">
                <img src = {logo}/>
                <br />
                <i className="fab fa-facebook-square"></i>
                <i className="fab fa-twitter-square"></i>
                <i className="fab fa-snapchat-square"></i>
                <i className="fab fa-instagram"></i>
                </div>

            </div>
        </Fragment>
      );
    }
  }
export default Header;