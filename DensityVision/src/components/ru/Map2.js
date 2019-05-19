import React, { Component, Fragment } from 'react';
import ReactHeatmap from './ReactHeatmap';
import Stats from './Stats';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import '../../assets/styles/map.css';

const client = new W3CWebSocket('ws://127.0.0.1:4100');

class Map2 extends Component {
    state = {
       x: null,
       y: null
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
       this.setState({x : data.x, y : data.y});
    };
  }
    
  render(){
      const {x,y} = this.state
      var dataPoint = { 
        x: x*100, 
        y: y*100, 
        radius: 50,
        value: 50 
      };
      var dataset = {
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
              <div className = "stat"><i className="fas fa-users"></i> 1 </div>
              POPULATION DENSITY
              <div className = "stat"><i className="fas fa-vector-square"></i> 0.6/m</div>
              RETENTION RATE
              <div className = "stat"><i className="fas fa-signal"></i> 100%</div>
              <p className = "details">FOR MORE DETAILS SCROLL DOWN</p>
              <div className="map_icons">
                <i className="fas fa-map-pin"></i>
                <i className="fas fa-sync"></i>
                <i className="fas fa-share-square"></i>
                <i className="fas fa-info-circle"></i>
                <i className="fas fa-cog"></i>
              </div>
            </div>
            <ReactHeatmap data = {dataset} />
          </div>
          <Stats />
        
        </Fragment>
      );
    }
  }
export default Map2;