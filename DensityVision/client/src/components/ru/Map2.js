import React, { Component } from 'react';
import ReactHeatmap from './ReactHeatmap';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import '../../assets/styles/map.css';

const client = new W3CWebSocket('ws://127.0.0.1:8000');

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
       this.setState({x : data.x});
       this.setState({y : data.y});
    };
  }
    
  render(){
      const {x,y} = this.state
      
      var dataPoint = { 
        x: 100+ x*400, 
        y: 100+ y*400, 
        radius: 30,
        value: 10 
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