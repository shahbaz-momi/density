import React, { Component, Fragment } from 'react';
import Map2 from './Map2';
import {Link} from 'react-router-dom';
import '../../assets/styles/try.css';
import ru_logo from '../../assets/images/ru_logo.svg';
import library from '../../assets/images/library.svg';
import streets from '../../assets/images/streets.svg';
import '../../assets/styles/inputs.css';
import Dropdown from 'react-bootstrap/Dropdown';


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
            <div className = "search_settings">
              <h4>Search Settings</h4>
            </div>

    

            <div className = "ru_inputs">
                <i className="fas fa-lg fa-layer-group"></i>
                <input className = "input_text" type="text" placeholder="SEARS ATRIUM"></input>
                <i className="fas  fa-lg  fa-history"></i>
                <input className = "input_text" type="text" placeholder="2:00PM"></input>
                <i className="fas  fa-lg  fa-calendar-alt"></i>
                <input className = "input_text" type="text" placeholder="MAY 17, 2019"></input>
                <i className="fas  fa-lg  fa-power-off"></i>
                <input className = "input_text" type="text" placeholder="LIVE"></input>
                <br />
                <button>ENTER</button>

            </div>
          <Map2 />
        </Fragment>
      );
    }
  }
export default RU;