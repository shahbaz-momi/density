import React, { Component, Fragment } from 'react';
import Map2 from './Map2';
import Home from './home/Home';
class App extends Component {
  render(){
      return (
        <Fragment>
          <Home />
          <Map2 />
        </Fragment>
      );
    }
  }
export default App;