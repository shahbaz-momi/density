import h337 from 'heatmap.js';
import React, {Component} from 'react';
import '../../assets/styles/map.css';

class ReactHeatmap3 extends Component {
  componentDidMount(){
    const config = {
      container: document.getElementById('fakeHeatMap'),
      maxOpacity: .5,
      minOpacity: 0,
      blur: .75,
      backgroundColor: 'rgba(255, 0, 0, 0)'
    };
    this.heatmapInstance = h337.create(config);
    this.heatmapInstance.setData(this.props.data)
    console.log(this.heatmapInstance.getData())
  } 
  componentDidUpdate(){
    if (this.heatmapInstance){
      this.heatmapInstance.setData(this.props.data)
      console.log(this.heatmapInstance.getData())
    }
  }
  render(){
    const divStyle = {
      height: '400px',
      width: '850px',
    }
    return (
      <div style = {divStyle} id = "fakeHeatMap"></div>
    );
  }
}
export default ReactHeatmap3;