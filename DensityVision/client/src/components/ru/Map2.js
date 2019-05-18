import React, { Component } from 'react';
import ReactHeatmap from './ReactHeatmap';
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
        <div className = "map_container">
          <ReactHeatmap data = {data} />
        </div>
      );
    }
  }
export default Map2;