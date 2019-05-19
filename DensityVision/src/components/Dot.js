import React, { Component } from 'react';

class Dot extends Component {
  render() {
    var divStyle = {
    backgroundColor: 'green',
    borderRadius: '100%',
    msTransition: 'all 0.25s ease',
    width: '5px',
    height: '5px'
    };
    return (
      <div>
        <div style = {divStyle}></div>
      </div>
    );
  }
}

export default Dot;