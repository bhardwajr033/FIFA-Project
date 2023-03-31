
fetch('http://localhost:3000/matchesPerCity')
.then(res => res.json())
.then(data => {buildGraph(data)});

function buildGraph(jsonData){
    Highcharts.chart('container', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Matches per City in FIFA Worldcup'
        },
        xAxis: {
          type: 'City',
          labels: {
            rotation: -45,
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
            }
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'No. of Matches'
          }
        },
        legend: {
          enabled: false
        },
        tooltip: {
          pointFormat: 'Matches held: <b>{point.y}</b>'
        },
        series: [{
          name: 'Population',
          data: Object.entries(jsonData),
          dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y}', 
            y: 10,
            style: {
              fontSize: '10px',
              fontFamily: 'Verdana, sans-serif'
            }
          }
        }]
      });
}