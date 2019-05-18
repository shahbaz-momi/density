import React, { Component, Fragment } from 'react';
import Map2 from './Map2';
import {Link} from 'react-router-dom';
import '../../assets/styles/try.css';
import ru_logo from '../../assets/images/ru_logo.svg';
import library from '../../assets/images/library.svg';
import streets from '../../assets/images/streets.svg';
import '../../assets/styles/inputs.css';

class RU extends Component {
  render(){
      return (
        <Fragment>
         <div className = "try_icons">
                <div className = "try_container">
                    <Link to = "/ruhacks">
                        <img className = "try_icon" src = {ru_logo} alt = "ru_logo"/>
                        <p className = "ru_hacks_text">RU HACKS</p>
                    </Link>
                </div>
                <div className = "try_container unactive">
                    <img className = "try_icon" src = {library} alt = "library"/>
                    <p className = "library_text">LIBRARY</p>
                </div>
                <div className = "try_container unactive">
                    <img className = "try_icon" src = {streets} alt = "street"/>
                    <p className = "street_text">YONGE STREET</p>
                </div>
            </div>
            <div className = "ru_inputs">
                <input></input>
                <input></input>
                <input></input>
                <button>Enter</button>

            </div>
          <Map2 />
        </Fragment>
      );
    }
  }
export default RU;