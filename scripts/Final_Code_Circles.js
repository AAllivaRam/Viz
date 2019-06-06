
/**
* Author: Andres Alvarez
* Target: Final_Code_Circles.html
* Purpose: JavaScript used with 'Final_Code_Circles.html'
* Created: 9 April 2019
* Last updated: 9 April 2019
* Credits: My Brain
*/
var dataset, xScale, yScale, xAxis, yAxis, line, extreme;
	
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
		
	  imageArray = [];
  
	d3.select("#container")
	.append("canvas")
	.attr("height", 500)
	.attr("width", 500);
	  

  
  var context = d3.select("canvas").node().getContext("2d");
  //var x = data.Year;
  context.textAlign = "center";
  context.font="160px Georgia";
  colorScale = d3.scaleQuantize().domain([0,1]).range(colorbrewer.Reds[7]);
    
  lineScale = d3.scaleQuantize().domain([0,1]).range([10,40]);
  for ( var x=1859;x<2015;x++) {
  context.clearRect(0,0,500,500);
  context.strokeStyle = colorScale(Math.random());
  context.lineWidth = lineScale(Math.random());
  context.fillStyle = colorScale(Math.random());
  context.beginPath();
  context.arc(250,250,200,0,2*Math.PI);
  context.fill();
  context.stroke();
  
  context.fillStyle = "black";
  context.fillText(x,250,280);
  var dataURL = d3.select("canvas").node().toDataURL();
  imageArray.push({x: x, url: dataURL});
  }
  d3.select("#container")
  .append("div").attr("class", "gallery")
  .selectAll("img").data(imageArray)
  .enter().append("img")
  .attr("src", function(d) {return d.url})
  .style("height", "50px")
  .style("float", "left")	
		
	});

