import React, { Component, Fragment } from 'react';
import ReactHeatmap3 from '../ru/ReactHeatmap3';
import Stats from '../ru/Stats';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import '../../assets/styles/map.css';

const client = new W3CWebSocket('ws://127.0.0.1:4100');

class Map3 extends Component {
    state = {
       dataPoints: []
    }

  componentDidMount(){
    client.onopen = () => {
      console.log('Fake WebSocket Client Connected');
    };
  }

  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Reopened');
    };
    client.onmessage = (message) => {
       var data = JSON.parse(message.data)
       this.setState({dataPoints : data});
       console.log(this.state.dataPoints);
    };
  }
    
  render(){
      const {dataPoints} = this.state;
      var myPoints = {
        max: 10,
        min: 10,
        data: dataPoints
      };
      return (
        <Fragment>
          <div className = "map_container">
            <div className = "map_title"><i class="fas fa-map-marker-alt"></i> &nbsp; SEARS ATRIUM</div>
            <div className = "map_legend">
              TOTAL POPULATION
              <div className = "stat"><i className="fas fa-users"></i>1</div>
              POPULATION DENSITY
              <div className = "stat"><i className="fas fa-vector-square"></i> 0.8/m</div>
              RETENTION RATE
              <div className = "stat"><i className="fas fa-signal"></i> 89%</div>
              <p className = "details">FOR MORE DETAILS SCROLL DOWN</p>
              <div className="map_icons">
                <i className="fas fa-map-pin"></i>
                <i className="fas fa-sync"></i>
                <i className="fas fa-share-square"></i>
                <i className="fas fa-info-circle"></i>
                <i className="fas fa-cog"></i>
              </div>
            </div>
            <ReactHeatmap3 data = {myPoints} />
          </div>
          <Stats />
        
        </Fragment>
      );
    }
  }
export default Map3;