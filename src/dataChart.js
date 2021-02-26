import Chart from 'chart.js';
Chart.defaults.global.elements.line.fill = false

const chart = {

  makeChart(dataSet, element, label) {
    let myChart = new Chart(element, {
      type: 'line',
        data: {
            labels: dataSet.map(data => {
              let dataArray = data[0].split("/")
              dataArray.push(dataArray.shift())
              return dataArray.join("/")
            }),
            datasets: [{
                label: label,
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
                      beginAtZero: true
                  }
              }]
          }
        }
    });
  },
}

export default chart;