import React from 'react';
import * as d3 from 'd3';
import Summary from './Summary';

let Legend = class Legend extends React.Component {

	constructor(){
		super();
	}

	componentDidMount() {
		let colorLegend = ["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,81,156)"];

		let svgLegend = d3.select("#legend").append("svg");

		svgLegend.append("g")
		// .attr("transform", "translate(500, 525)")
		.selectAll("rect")
		.data(colorLegend)
		.enter()
		.append("rect")
		.attr("fill", (d, i) => { return colorLegend[i];})
		.attr("x", (d, i) => { return i*30; })
		.attr("y", 30)
		.attr("width", 30)
		.attr("height", 10)
	}

	render(){
		return (
			<div> 
				<div id = 'legend'></div>
			</div>
		)
	}

}

export default Legend