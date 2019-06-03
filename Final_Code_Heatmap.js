
/**
* Author: Andres Alvarez
* Target: Final_Code_Heatmap.html
* Purpose: JavaScript used with 'Final_Code_Heatmap.html'
* Created: 29 May 2019
* Last updated: 29 May 2019
* Credits: My Brain
*/
var dataset, xScale, yScale, xAxis, yAxis, line, extreme;
		
var margin = {top: 75, right: 15, bottom: 125, left: 85},
    width = 1200 - margin.left - margin.right,
    height = 555 - margin.top - margin.bottom;

var x = d3.scaleLinear().range([0, width]),
    y = d3.scaleLinear().range([0, height]);

// Variables for colors and legend:
var sun = "#FF6307",
    heart = "#FF4739",
    red = "#FF1907",
    hot = "960018",
    colors = [ "#FF6307", "#FF4739", "#FF1907", "960018" ],
    legendScale = ["0 - 10", "10 - 15", "15 - 20", "20+"];



// Get data:
  
  d3.csv("Melb_Daily_Min_Max_and_Rainfall.csv", function(d) {
	  return {
		Year : d.Year,
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
		//lineChart(dataset);
		console.table(dataset, ["Year","Month","Day","extreme","extreme_2","Daily_Max_Temp","Daily_Min_Temp","Daily_Rainfall_Amount"]);
		
		x.domain(d3.extent(extreme, function(d) { return d.Year; }));
		y.domain(d3.extent(extreme, function(d) { return d.Month; }));
	
	// Function to scale temperature to color:
		var colorScale = function(temp) {
		  if (temp >= 0 && temp < 10) { return sun; }
		  else if (temp >= 10 && temp < 15) { return heart; }
		  else if (temp >= 15 && temp < 20) { return red; }
		  else if (temp >= 20 && temp < 50) { return hot; }
		}

		// Append main chart element
		var svg = d3.select("#chart").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		  .append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// Append div for tooltip on hover:
		var div = d3.select("body").append("div")	
			.attr("class", "tooltip")				
			.style("opacity", 0);
	
  // Render the data in an svg:
  svg.selectAll("svg")
      .data(extreme)
    .enter().append("rect")
      .attr("class", "tile")
      .attr("x", function(d) { return x(d.Year); })
      .attr("y", function(d) { return y(d.Month); })
      .attr("width", 5)
      .attr("height", height / 10)
      .attr("transform", "translate(0, -20)")
      .style("fill", function(d) { return colorScale(d.Daily_Max_Temp + d.extreme); })
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html(convertMonth(d.month) + " " + d.Year + "<br />Temperature: " + (baseTemp + d.variance).toFixed(2) + "ºC<br />Variance: " + d.variance)
                .style("left", (d3.event.pageX + 7) + "px")	
				 .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });

  // Add the title:
  svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .attr("class", "title")
        .style("font-size", "26px")
        .style("font-family", "Avenir")
        .style("fill", "#FCFCFC")
        .text("Visualizing Extreme Temperature Change Since the 1859 in Melbourne");
  
  // Add the x-axis:
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + 371 + ")")
      .call(d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.format("y")).tickSize(6, 0))
      .style("fill", "#FCFCFC")
      .style("font-size", "14px")
      .style("font-family", "Avenir");

  // Add custom time scale to display months as text:
  var yCustomScale = d3.time.scale()
    .domain([new Date(2012, 0, 1), new Date(2012, 11, 31)])
    .range([0, height + 35]);

  // Set months as yAxis variable
  var yAxis = d3.svg.axis()
    .scale(yCustomScale)
    .orient("left")
    .ticks(d3.time.months)
    .tickSize(0, 0)
    .tickFormat(d3.time.format("%B"));
  
  // Append y-axis
  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0, -15)")
      .call(yAxis)
    .selectAll(".tick text")
      .style("text-anchor", "end")
      .style("fill", "#FCFCFC")
      .style("font-size", "14px")
      .style("font-family", "Avenir")
      .attr("x", -8)
      .attr("y", 12);

    // Set legend data to colors array
    var legend = svg.selectAll(".legend")
              .data(colors);

    // Add a legend element
    legend.enter().append("g")
      .attr("class", "legend");

    // Add color blocks to legend
    legend.append("rect")
      .attr("x", function(d, i) { return  75 * i; })
      .attr("y", height + 55)
      .attr("width", 75)
      .attr("height", 28)
      .style("fill", function(d, i) { return colors[i]; });

    // Append text labels to each color element in legend
    legend.append("text")
      .attr("class", "legendLabels")
      .text(function(d, i) { return legendScale[i]; })
      .attr("x", function(d, i) { return 75 * i + 10; })
      .attr("y", height + 75)
      .style("font-family", "Avenir")
      .style("fill", "rgb(25, 25, 25)");
  
    // Add a title to the legend
    svg.append("text")
      .attr("x", 10)             
      .attr("y", height + 102)
      .attr("class", "Legendtitle")
      .style("font-size", "15px")
      .style("font-family", "Avenir")
      .style("fill", "#949992")
      .text("Colors represent temperature in Celsius");

	// Convert d.month values to strings for tooltip:
	  var convertMonth = function(n) {
		if (n === 1) { return "January" }
		else if (n === 2) { return "February" }
		else if (n === 3) { return "March" }
		else if (n === 4) { return "April" }
		else if (n === 5) { return "May" }
		else if (n === 6) { return "June" }
		else if (n === 7) { return "July" }
		else if (n === 8) { return "August" }
		else if (n === 9) { return "September" }
		else if (n === 10) { return "October" }
		else if (n === 11) { return "November" }
		else if (n === 12) { return "December" }
	  }
	
	});
  
  