import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import '../../assets/styles/try.css';
import ru_logo from '../../assets/images/ru_logo.svg';
import library from '../../assets/images/library.svg';
import streets from '../../assets/images/streets.svg';
import demo_landing from  '../../assets/images/demo_landing.svg';
import demo_text from  '../../assets/images/demo_text.png';
import '../../assets/styles/home.css';

class Try extends Component {
  render(){
      return (
        <Fragment>
            <div id = "demo">
            <div className = "try_text">
                <img src = {demo_text} alt = "demo_text"/>
                <hr />
            </div>
            <div className = "try_icons">
                <div className = "try_container">
                    <Link to = "/ruhacks">
                        <img className = "try_icon" src = {ru_logo} alt = "ru_logo"/>
                        <p className = "ru_hacks_text">RU HACKS</p>
                    </Link>
                </div>
                <div className = "try_container">
                <Link to = "/library">

                    <img className = "try_icon" src = {library} alt = "library"/>
                    <p className = "library_text">LIBRARY</p>
                    </Link>

                </div>
                <div className = "try_container">
                <Link to = "/street">

                    <img className = "try_icon" src = {streets} alt = "street"/>
                    <p className = "street_text">YONGE STREET</p>
                    </Link>

                </div>
                <br/>
            <img className = "demo_landing" src={demo_landing} alt = "demo_landing" />
            </div>
            </div>
        </Fragment>
      );
    }
  }
export default Try;