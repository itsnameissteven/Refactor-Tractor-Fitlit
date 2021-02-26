import { expect } from 'chai';

import Calculation from '../src/Calculation';
import Sleep from '../src/Sleep';
import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('Calculation', () => {
  let sleepData, sleep, calculation, user1, user2, users, userRepo;


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
      "date": "2017/06/16",
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

    user1 = new User({
      id: 1,
      name: "Alex Roth",
      address: "1234 Turing Street, Denver CO 80301-1697",
      email: "alex.roth1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [2, 3, 4]
    });

    user2 = new User({
      id: 2,
      name: "Allie McCarthy",
      address: "1235 Turing Street, Denver CO 80301-1697",
      email: "allie.mcc1@hotmail.com",
      strideLength: 3.3,
      dailyStepGoal: 9000,
      friends: [1, 3, 4]
    });

    users = [user1, user2];

    userRepo = new UserRepo(users);
  });

  describe('Properties', () => {
    it('should be a function', () => {
      expect(Calculation).to.be.a('function');
    });

    it('should be an instance of Calculation', () => {
      expect(calculation).to.be.an.instanceof(Calculation);
    });

    it('should be able to take in an argument of data', () => {
      expect(calculation.dataSet).to.deep.equal(sleepData);
    });
  });

  describe('Methods', () => {
    it('should be able to calculate an average per day', () => {
      expect(calculation.calculateAverage(3, 'hoursSlept')).to.equal(3);
    });

    it('should be able to find information for a user on a specified date', () => {
      expect(calculation.calculateDailyData(1, '2019/05/30', 'hoursSlept')).to.equal(8.9);
    });

    it('should find information for a user by day for that days week', () => {
      expect(calculation.calculateWeeklyData('2017/06/15', 1, userRepo, 'hoursSlept')[0]).to.equal('2017/06/15: 6.1');
    });
  });
});