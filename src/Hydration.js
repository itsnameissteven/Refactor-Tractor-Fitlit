import Calculation from './Calculation';

class Hydration extends Calculation {
  constructor(dataSet) {
    super(dataSet)
  }


  calculateFirstWeekOunces(userRepo, id) {
    return userRepo.getFirstWeek(id, this.dataSet).map((data) => {
      return {
        date: data.date,
        data: data.numOunces
      }
    });
  }

  calculateAverageWater(userRepo, id) {
    const avg =this.calculateFirstWeekOunces(userRepo, id).reduce((acc, data) => {
      acc += data.data
      return acc
    },0) / this.calculateFirstWeekOunces(userRepo, id).length;

    return Math.round(avg)
  }
}

export default Hydration;
