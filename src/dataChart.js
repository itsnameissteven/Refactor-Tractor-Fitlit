import Chart from 'chart.js';
Chart.defaults.global.elements.line.fill = false

const chart = {

  makeChart(dataSet, element, label, color) {
    // console.log(dataSet, "Chartssss")
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
                    color,
                ],
                borderWidth: 2
            }]
        },
        options: {
          events: [],
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
          labels: [label],
          datasets: [{
              label: "You",
              data: [dataSetUser],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
          },
          {
              label: "National Average",
              data: [dataSetAll],
              backgroundColor: [
                  'rgba(54, 162, 235, 1)',
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
          }

        ]
      },
      options: {
         events: [],
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