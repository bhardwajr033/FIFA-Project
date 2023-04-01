async function getProperty(property) {
  const data = await fetch(`https://fifa-project-eight.vercel.app/${property}`).then((res) =>
    res.json()
  );
  const graphLabels = await fetch(`https://fifa-project-eight.vercel.app/graphLabels`).then(
    (res) => res.json()
  );
  buildGraph(data, graphLabels, property);
}

function buildGraph(jsonData, graphLabels, property) {
  Highcharts.chart("container", {
    chart: {
      type: "column",
    },
    title: {
      text: graphLabels[property].title,
    },
    xAxis: {
      type: "category",
      title: {
        text: graphLabels[property].xAxisLabel,
      },
      labels: {
        rotation: -45,
        style: {
          fontSize: "13px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: graphLabels[property].yAxisLabel,
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: graphLabels[property].pointFormat,
    },
    series: [
      {
        name: "Population",
        data: Object.entries(jsonData),
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: "#FFFFFF",
          align: "right",
          format: "{point.y}",
          y: 10,
          style: {
            fontSize: "10px",
            fontFamily: "Verdana, sans-serif",
          },
        },
      },
    ],
  });
}
