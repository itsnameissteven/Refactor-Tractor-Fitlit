import Chart from 'chart.js';
Chart.defaults.global.elements.line.fill = false

const chart = {

  makeChart(dataSet, element) {
    let myChart = new Chart(element, {
      type: 'line',
        data: {
            labels: dataSet.map(data => {
              let dataArray = data[0].split("/")
              dataArray.push(dataArray.shift())
              return dataArray.join("/")
            }),
            datasets: [{
                label: 'Number of ounces',
                data: dataSet.map(data => data[1]),
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 2
            }]
        },
        options: {
          maintainAspectRatio: false,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: false
                  }
              }]
          }
        }
    });
  },
}

export default chart;