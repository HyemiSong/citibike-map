import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import * as d3 from 'd3';
import { ACCESSTOKEN } from './MapboxToken';
import localdata from '../data/Citi-Bike-Live-Station-Feed-JSON.json';

import Summary from './Summary';
import Legend from './Legend';

mapboxgl.accessToken = ACCESSTOKEN;

class MapboxSet extends React.Component {
	constructor(props: Props) {
		super(props);
		this.state = {
			lng: -73.9978,
			lat: 40.7209,
		    maxZoom: 15,
		    minZoom: 10,
		    zoom: 10,
			heading: 41,
			hash: true,
			maxBounds: [
				[-75.04728500751165, 40.68392799015035], // Southwest coordinates
	    		[-71.91058699000139, 40.87764500765852]  // Northeast coordinates
    		]
		};
	}

	componentDidMount() {
		this.drawMap();
	}

	drawMap = () => {
		const {lng, lat, zoom, maxZoom, minZoom, heading, hash, maxBounds} = this.state;

		const project = d => { return map.project(getLL(d)); }
		const getLL = d => { return new mapboxgl.LngLat(+d.longitude, +d.latitude) }

		const map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/ham311/cixthcesd001h2rlac577irt7',
 			center: [lng, lat],
 			zoom,
			maxZoom,
			minZoom,
			heading,
			// hash,
			//attributionControl: false,
			//maxBounds
		})

		map.setPitch(40);
		//map.scrollZoom.disable();

		const container = map.getCanvasContainer();
		const svg = d3.select(container).append("svg");

		const dots = svg.selectAll("circle.dot")
		    .data(localdata.stationBeanList)
	    
	    dots.enter().append("circle").classed("dot", true)
		    .attr("r", 2)
		    .style("fill", "rgb(8,81,156)")
		    .style("opacity", 0.9)

		const renders = () => {
	    	d3.selectAll('.dot')
	    	.attr("cx", function(d) { return project(d).x; })
		    .attr("cy", function(d) { return project(d).y; })
	    }

	    map.on("viewreset", () => { renders() })
	    map.on("move", () => { renders() })

	    renders();
	}

	shouldComponentUpdate() {
		return false;
	}

	render(){

		return (
		      <div id = 'canvas'>
		          <div id = 'map'></div>
		          <div className = "infoPanel">
			          <Summary 
			          totalCount = {localdata.stationBeanList.length}
			          />
			          <Legend />
		          </div>
		   	  </div>
		    );

	}
}

export default MapboxSet;
