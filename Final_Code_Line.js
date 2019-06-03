
/**
* Author: Andres Alvarez
* Target: Final_Code.html
* Purpose: JavaScript used with 'Final_Code.html'
* Created: 1 Jun 2019
* Last updated: 1 Jun 2019
* Credits: My Brain
*/
var dataset, xScale, yScale, xAxis, yAxis, line, max_extreme;
var w = 600;
var h = 300;
var padding = 35;

function getCode(){		
	
	d3.csv("Melb_Daily_Min_Max_and_Rainfall.csv", function(d) {
	  return {
		Year : parseInt(d.Year),
		Month : d.Month,
		Day : d.Day,
		extreme : (+d.Daily_Max_Temp - d.Daily_Min_Temp),
		Daily_Max_Temp : parseFloat(d.Daily_Max_Temp),
		Daily_Min_Temp : parseFloat(d.Daily_Min_Temp),
		Daily_Rainfall_Amount : parseFloat(d.Daily_Rainfall_Amount),
		extreme_2 : ((+d.Daily_Max_Temp - d.Daily_Min_Temp && d.Daily_Rainfall_Amount > 0))
	  };
	}).then(function(data) {
		console.log(data);
		max_extreme = d3.max(data, function(d) { return +d.extreme; });	
		console.log(max_extreme);
		dataset = data;				
		lineChart(dataset);
		console.table(dataset, ["Year","Month","Day","extreme","extreme_2","Daily_Max_Temp","Daily_Min_Temp","Daily_Rainfall_Amount"]);
	});
	
}
	
	
function lineChart() {

	xScale = d3.scaleTime()
			   .domain([
					d3.min(dataset, function(d) { return d.Year; }),
					d3.max(dataset, function(d) { return d.Year; })
				])
			   .range([padding, w]);

	yScale = d3.scaleLinear()
			.domain([0,d3.max(dataset, function(d) { return d.extreme; })
			])
			.range([h-padding, 0]);
	
	line = d3.line()
			.x(function(d) {return xScale(d.Year); })
			.y(function(d) {return yScale(d.extreme); });
	

	xAxis = d3.axisBottom()
			   .scale(xScale)
			   .ticks(20);			  

	yAxis = d3.axisLeft()
			   .scale(yScale)
			   .ticks(10);
	
	area = d3.area()
				.x(function(d) { return xScale(d.Year); })
				.y0(function() { return yScale.range()[0]; })
				.y1(function(d) { return yScale(d.extreme); });
	
	
	var svg = d3.select("#chart")
		.append("svg")
		.attr("width", w)
		.attr("height", h)
		.attr("padding", padding)
	
	svg.append("path")
		.datum(dataset)
		.attr("class", "area")
		.attr("d", area);
					
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0, " + (h - padding) + ")")
		.call(xAxis);
		
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + (padding) + ",0)")
		.call(yAxis);

};


	
function init() {
	
	getCode();
	
 }

window.onload = init;


