class Calculation {
  constructor(dataSet) {
    this.dataSet = dataSet;
  }
  calculateAverage(id, property) {
    const perDay = this.dataSet.filter(data => id === data.userID);
    const sum = perDay.reduce((sumSoFar, data) => {
      return sumSoFar += data[property];
    }, 0);
    return Math.round(sum / perDay.length);
  }

  calculateDailyData(id, date, property) {
    const findDataByDate = this.dataSet.find(data => id === data.userID && date === data.date);
    return findDataByDate[property];
  }

  calculateWeeklyData(date, id, userRepo, property) {
    const weekFromDay = userRepo.getWeekFromDate(date, id, this.dataSet);
    return weekFromDay.map(data => `${data.date}: ${data[property]}`);
  }
}

export default Calculation;