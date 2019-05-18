import React, { Component, Fragment } from 'react';
import Try from './Try';
import HomeLanding from './HomeLanding';
import '../../assets/styles/home.css';

class Home extends Component {
  render(){
      return (
        <Fragment>
          <HomeLanding />
          <Try />
        </Fragment>
      );
    }
  }
export default Home;