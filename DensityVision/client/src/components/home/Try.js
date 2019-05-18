import React, { Component, Fragment } from 'react';
import '../../assets/styles/try.css';
import ru_logo from '../../assets/images/ru_logo.svg';
import library from '../../assets/images/library.svg';
import streets from '../../assets/images/streets.svg';

class Try extends Component {
  render(){
      return (
        <Fragment>
            <div className = "try_text">
                <p>
                TRY  
                <span> DENSITY </span>
                TODAY!
                </p>
            </div>
            <div className = "try_icons">
                <div className = "try_container">
                    <img className = "try_icon" src = {ru_logo} alt = "ru_logo"/>
                    <p>RU HACKS</p>
                </div>
                <div className = "try_container">
                    <img className = "try_icon" src = {library} alt = "library"/>
                    <p>LIBRARY</p>
                </div>
                <div className = "try_container">
                    <img className = "try_icon" src = {streets} alt = "street"/>
                    <p>YONGE STREET</p>
                </div>
            </div>
        </Fragment>
      );
    }
  }
export default Try;