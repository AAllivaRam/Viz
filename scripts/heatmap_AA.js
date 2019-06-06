var dataset, xScale, yScale, xAxis, yAxis, line, max_extreme;
var w = 600;
var h = 300;
var padding = 55;

function getCode(){		
	
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
		drawCircos(dataset);
		console.table(dataset, ["Year","Month","Day","extreme","extreme_2","Daily_Max_Temp","Daily_Min_Temp","Daily_Rainfall_Amount"]);
	});
	
}


function drawCircos(error, months,Melb_Daily_Min_Max_and_Rainfall) {
  var width=500;
  var circosHeatmap = new Circos({
        container: '#heatmapChart',
        width: width,
        height: width
    });
	
	

 
    circosHeatmap
      .layout(
        months,
        {
          innerRadius: width / 2 - 80,
          outerRadius: width / 2 - 30,
          ticks: {display: false},
          labels: {
            position: 'center',
            display: true,
            size: 14,
            color: '#000',
            radialOffset: 15
          }
        }
      )
      .heatmap('Melb_Daily_Min_Max_and_Rainfall', Melb_Daily_Min_Max_and_Rainfall, {
        innerRadius: 0.8,
        outerRadius: 0.98,
        logScale: false,
        color: 'YlOrRd',
        events: {
          'mouseover.demo': function (d, i, nodes, event) {
            console.log(d, i, nodes, event)
          }
        }
      })
      .render()
}

d3.queue()
  .defer(d3.csv, './data/Melb_Daily_Min_Max_and_Rainfall')
  .await(drawCircos);
  
function init() {
	
	getCode();
	
 }

window.onload = init;

