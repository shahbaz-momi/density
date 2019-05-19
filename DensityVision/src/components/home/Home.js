import React, { Component, Fragment } from 'react';
import Try from './Try';
import HomeLanding from './HomeLanding';
import AboutLanding from './AboutLanding';
import TechLanding from './TechLanding';
import ApplicationLanding from './ApplicationLanding';
import '../../assets/styles/home.css';

class Home extends Component {
  render(){
      return (
        <Fragment>
          <HomeLanding />
          <AboutLanding />
          <TechLanding />
          <ApplicationLanding />
          <Try />
        </Fragment>
      );
    }
  }
export default Home;