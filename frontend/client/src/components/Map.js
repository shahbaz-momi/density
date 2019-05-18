/* global google */
import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import GoogleMapReact from 'google-map-react';
import Dot from './Dot'

const client = new W3CWebSocket('ws://127.0.0.1:8000');

const Marker = ({ text }) => <div>{text}</div>;

class Map extends Component {
    state = {
        x: 0,
        y: 0,

       center: {
        lat: 43.657829,
        lng: -79.378716
        },
        zoom: 21
    }

  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
       let data = JSON.parse(message.data)
       this.setState({x : data.x});
       this.setState({y : data.y});
       // Below doesn't update heatmap dynamically...
        if (this._googleMap !== undefined) {
            const point = new google.maps.LatLng(43.657829+(data.x)*10, -79.378716+(data.y)*10)
            this._googleMap.heatmap.data.push(point)
        }
    };
  }

  render() {
      const heatMapData = {    
            positions: [
                {lat: 43.657829, lng: -79.378716}

            ],
            options: {   
                radius: 20,   
                opacity: 0.6,
            }
      }
      let {x,y, center, zoom} = this.state
    return (
      <div>
        Welcome to Density!
        <p>x = {x}</p>
        <p>y = {y}</p>

        <div style={{ height: '500px', width: '500px' }}>
            <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyCI0C0CCyryMKBOIndaqpnwv8k0l00PWVo" }}
            defaultCenter={center}
            defaultZoom={zoom}
            heatmapLibrary={true}          
            heatmap={heatMapData} 
            >

            <Marker
                lat={43.657829}
                lng={-79.378716}
                text="Ryerson University"
            />

            <Dot
                lat={43.657829 + (x)/100000}
                lng={-79.378716 + (y)/100000}
                />
            
            </GoogleMapReact>
        </div>

      </div>
    );
  }
}

export default Map;