import Calculation from './Calculation';

class Sleep extends Calculation {
  constructor(dataSet) {
    super(dataSet)
  }

  calculateAllUserSleepQuality() {
    const totalSleepQuality = this.dataSet.reduce(function (sumSoFar, dataItem) {
      sumSoFar += dataItem.sleepQuality;
      return sumSoFar;
    }, 0)
    return Math.round(totalSleepQuality / this.dataSet.length);
  }
}

export default Sleep;