import React, { Component, Fragment } from 'react';
import Logo from './Logo';
import Nav from './Nav';

class Home extends Component {
  render(){
      return (
        <Fragment>
          <Logo />
          <Nav />
        </Fragment>
      );
    }
  }
export default Home;