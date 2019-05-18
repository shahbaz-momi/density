import React, { Component, Fragment } from 'react';
import '../../assets/styles/stats.css';

class Stats extends Component {
  render(){
      return (
        <Fragment>
            <div className = "my_container">
                <div className="stat_container">
                    <div className = "stat_title">
                    POPULATION BAR
                    </div>
                </div>
                <div className="stat_container">
                    <div className = "stat_title">
                    DENSITY GRID
                    </div>
                </div>
                <div className="stat_container">
                    <div className = "stat_title">
                    RETENTION REGRESSION
                    </div>
                </div>
                <div className="stat_container">
                    <div className = "stat_title">
                    SUGGESTIONS
                    </div>
                </div>
            </div>
        </Fragment>
      );
    }
  }
export default Stats;