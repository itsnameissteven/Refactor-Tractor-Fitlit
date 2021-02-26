import Calculation from './Calculation';

class Hydration extends Calculation {
  constructor(dataSet) {
    super(dataSet)
  }

  calculateFirstWeekOunces(userRepo, id) {
    return userRepo.getFirstWeek(id, this.dataSet).map((data) => `${data.date}: ${data.numOunces}`);
  }
}

export default Hydration;
