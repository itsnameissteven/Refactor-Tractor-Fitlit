import { expect } from 'chai';

import Calculation from '../src/Calculation';
import Sleep from '../src/Sleep';
import UserRepo from '../src/User-repo';
import User from '../src/User';

describe.only('Calculation', () => {
  let sleepData, sleep, calculation;


  beforeEach(function () {
    sleepData = [{
      "userID": 1,
      "date": "2017/06/15",
      "hoursSlept": 6.1,
      "sleepQuality": 2.2
    },
    {
      "userID": 2,
      "date": "2017/06/15",
      "hoursSlept": 7,
      "sleepQuality": 4.7
    },
    {
      "userID": 3,
      "date": "2017/06/15",
      "hoursSlept": 2,
      "sleepQuality": 3
    },
    {
      "userID": 4,
      "date": "2017/06/15",
      "hoursSlept": 5.4,
      "sleepQuality": 3
    },
    {
      "userID": 1,
      "date": "2018/07/15",
      "hoursSlept": 4.1,
      "sleepQuality": 3.6
    },
    {
      "userID": 2,
      "date": "2018/07/15",
      "hoursSlept": 9.6,
      "sleepQuality": 2.9
    },
    {
      "userID": 3,
      "date": "2018/07/15",
      "hoursSlept": 2,
      "sleepQuality": 3
    },
    {
      "userID": 4,
      "date": "2018/07/23",
      "hoursSlept": 8.1,
      "sleepQuality": 3.5
    },
    {
      "userID": 1,
      "date": "2019/05/30",
      "hoursSlept": 8.9,
      "sleepQuality": 2.2
    },
    {
      "userID": 2,
      "date": "2019/05/30",
      "hoursSlept": 4.4,
      "sleepQuality": 1.6
    },
    {
      "userID": 3,
      "date": "2019/05/30",
      "hoursSlept": 4,
      "sleepQuality": 1
    },
    {
      "userID": 4,
      "date": "2019/05/30",
      "hoursSlept": 8,
      "sleepQuality": 3.4
    }
    ];

    sleep = new Sleep(sleepData);
    calculation = new Calculation(sleepData);
  });

  it('should be a function', () => {
    expect(Calculation).to.be.a('function');
  });

  it('should be an instance of Calculation', () => {
    expect(calculation).to.be.an.instanceof(Calculation);
  });

  it('should be able to take in an argument of data', () => {
    expect(calculation.dataSet).to.deep.equal(sleepData);
  });

  it('should be able to calculate an average per day', () => {
    expect(calculation.calculateAverage(3, 'hoursSlept')).to.equal(3);
  });

  it('should be able to find information for a user on a specified date', () => {
    expect(calculation.calculateDailyData(1, '2019/05/30', 'hoursSlept')).to.equal(8.9);
  });


})