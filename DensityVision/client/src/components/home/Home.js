import React, { Component, Fragment } from 'react';
import Logo from './Logo';
import Nav from './Nav';
import Try from './Try';

class Home extends Component {
  render(){
      return (
        <Fragment>
          <Logo />
          <Nav />
          <Try />
        </Fragment>
      );
    }
  }
export default Home;