import Chart from 'chart.js';
Chart.defaults.global.elements.line.fill = false

const chart = {

  makeChart(dataSet, element, label) {
    new Chart(element, {
      type: 'line',
        data: {
            labels: dataSet.map(data => {
              let dataArray = data.date.split("/")
              dataArray.push(dataArray.shift())
              return dataArray.join("/")
            }).reverse(),
            datasets: [{
                label: label,
                data: dataSet.map(data => data.data).reverse(),
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

  createDoubleDataBarChart(dataSetUser, dataSetAll, element, label) {
    new Chart(element, {
      type: 'bar',
      data: {
          labels: ['You', 'Average user'],
          datasets: [{
              label: label,
              data: [dataSetUser, dataSetAll],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
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
  }

}

export default chart;