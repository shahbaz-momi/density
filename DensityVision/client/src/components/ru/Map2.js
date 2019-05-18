import React, { Component, Fragment } from 'react';
import ReactHeatmap from './ReactHeatmap';
import Stats from './Stats';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import '../../assets/styles/map.css';

const client = new W3CWebSocket('ws://127.0.0.1:3000');

class Map2 extends Component {
    state = {
        x: 0,
        y: 0
    }

  componentDidMount(){
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
  }

  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Reopened');
    };
    client.onmessage = (message) => {
       let data = JSON.parse(message.data)
       console.log(data);
       this.setState({x : data.xCoordinate});
       this.setState({y : data.yCoordinate});
    };
  }
    
  render(){
      const {x,y} = this.state
      
      var dataPoint = { 
        x: x*100, 
        y: y*100, 
        radius: 30,
        value: 100 
      };
      var data = {
        max: 100,
        min: 0,
        data: [
          dataPoint
        ]
      };
      return (
        <Fragment>
          <div className = "map_container">
            <div className = "map_title"><i class="fas fa-map-marker-alt"></i> &nbsp; SEARS ATRIUM</div>
            <div className = "map_legend">
              TOTAL POPULATION
              <div className = "stat"><i className="fas fa-users"></i> 28 000</div>
              POPULATION DENSITY
              <div className = "stat"><i className="fas fa-vector-square"></i> 12</div>
              RETENTION RATE
              <div className = "stat"><i className="fas fa-signal"></i> 89%</div>
              <p className = "details">FOR MORE DETAILS SCROLL DOWN</p>
              <div className="map_icons">
                <i class="fas fa-map-pin"></i>
                <i class="fas fa-sync"></i>
                <i class="fas fa-share-square"></i>
                <i class="fas fa-info-circle"></i>
                <i class="fas fa-cog"></i>
              </div>
            </div>
            <ReactHeatmap data = {data} />
          </div>
          <Stats />
        
        </Fragment>
      );
    }
  }
export default Map2;