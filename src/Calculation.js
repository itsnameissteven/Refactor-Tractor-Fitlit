class Calculation {
  constructor(dataSet) {
    this.dataSet;
  }
  calculateAverage(id, property) {
    const perDay = this.dataSet.filter(data => id === data.userID);
    const sum = perDay.reduce((sumSoFar, data) => {
      return sumSoFar += data[property];
    }, 0);
    return Math.round(sum / perDay.length)
  }

}

export default Calculation;