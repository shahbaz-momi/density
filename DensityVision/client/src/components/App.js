import React, { Component, Fragment } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import RU from './ru/RU';
import Home from './home/Home';
import Header from './common/Header'
class App extends Component {
  render(){
      return (
        <Fragment>
          <HashRouter >
            <Header />
            <div>
              <Route path="/" exact component = {Home}/>
              <Route path="/ruhacks" exact component = {RU}/>
            </div>
          </HashRouter>
        </Fragment>
      );
    }
  }
export default App;