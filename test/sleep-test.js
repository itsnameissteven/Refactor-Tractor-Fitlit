import { expect } from 'chai';

import Sleep from '../src/Sleep';
import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('Sleep', () => {
  let sleepData, sleep, user1, user2, user3, user4, users, userRepo;


  beforeEach(() => {
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
    },
    {
      "userID": 1,
      "date": "2019/08/22",
      "hoursSlept": 10.1,
      "sleepQuality": 1.8
    },
    {
      "userID": 2,
      "date": "2019/08/22",
      "hoursSlept": 6.9,
      "sleepQuality": 1.2
    },
    {
      "userID": 3,
      "date": "2019/08/22",
      "hoursSlept": 4,
      "sleepQuality": 1
    },
    {
      "userID": 4,
      "date": "2019/06/21",
      "hoursSlept": 6.1,
      "sleepQuality": 3.5
    },
    {
      "userID": 4,
      "date": "2019/06/20",
      "hoursSlept": 4.7,
      "sleepQuality": 4
    },
    {
      "userID": 4,
      "date": "2019/06/19",
      "hoursSlept": 10.1,
      "sleepQuality": 1.3
    },
    {
      "userID": 4,
      "date": "2019/06/18",
      "hoursSlept": 7.9,
      "sleepQuality": 1.6
    },
    {
      "userID": 4,
      "date": "2019/06/17",
      "hoursSlept": 5.9,
      "sleepQuality": 1.6
    },
    {
      "userID": 4,
      "date": "2019/06/16",
      "hoursSlept": 9.6,
      "sleepQuality": 1
    },
    {
      "userID": 4,
      "date": "2019/06/15",
      "hoursSlept": 9,
      "sleepQuality": 3.1
    },
    {
      "userID": 2,
      "date": "2019/06/21",
      "hoursSlept": 6.1,
      "sleepQuality": 3.5
    },
    {
      "userID": 2,
      "date": "2019/06/20",
      "hoursSlept": 4.7,
      "sleepQuality": 4
    },
    {
      "userID": 2,
      "date": "2019/06/19",
      "hoursSlept": 10.1,
      "sleepQuality": 3.3
    },
    {
      "userID": 2,
      "date": "2019/06/18",
      "hoursSlept": 7.9,
      "sleepQuality": 3.6
    },
    {
      "userID": 2,
      "date": "2019/06/17",
      "hoursSlept": 5.9,
      "sleepQuality": 3.6
    },
    {
      "userID": 2,
      "date": "2019/06/16",
      "hoursSlept": 9.6,
      "sleepQuality": 4
    },
    {
      "userID": 2,
      "date": "2019/06/15",
      "hoursSlept": 9,
      "sleepQuality": 3.1
    },
    {
      "userID": 5,
      "date": "2019/06/21",
      "hoursSlept": 9,
      "sleepQuality": 4
    },
    {
      "userID": 5,
      "date": "2019/06/20",
      "hoursSlept": 8,
      "sleepQuality": 4
    },
    {
      "userID": 5,
      "date": "2019/06/19",
      "hoursSlept": 10,
      "sleepQuality": 4
    },
    {
      "userID": 5,
      "date": "2019/06/18",
      "hoursSlept": 9,
      "sleepQuality": 4
    },
    {
      "userID": 5,
      "date": "2019/06/17",
      "hoursSlept": 8,
      "sleepQuality": 4
    },
    {
      "userID": 5,
      "date": "2019/06/16",
      "hoursSlept": 10,
      "sleepQuality": 4
    },
    {
      "userID": 5,
      "date": "2019/06/15",
      "hoursSlept": 9,
      "sleepQuality": 4
    }
    ];


    sleep = new Sleep(sleepData);
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
    user3 = new User({
      id: 3,
      name: "The Rock",
      address: "1236 Awesome Street, Denver CO 80301-1697",
      email: "therock@hotmail.com",
      strideLength: 10,
      dailyStepGoal: 60000,
      friends: [1, 2, 4]
    });

    user4 = new User({
      id: 4,
      name: "Rainbow Dash",
      address: "1237 Equestria Street, Denver CO 80301-1697",
      email: "rainbowD1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    });

    users = [user1, user2, user3, user4];
    userRepo = new UserRepo(users);
  });

  describe('Properties', () => {
    it('should be a function', () => {
      expect(Sleep).to.be.a('function');
    });

    it('should be an instance of Hydration', () => {
      expect(sleep).to.be.an.instanceof(Sleep);
    });

    it('should take in a list of data', () => {
      expect(sleep.dataSet[1].userID).to.equal(2);
      expect(sleep.dataSet[3].hoursSlept).to.equal(5.4);
      expect(sleep.dataSet[6].sleepQuality).to.equal(3);
      expect(sleep.dataSet[7].date).to.equal('2018/07/23');
    });
  });

  describe('Methods', () => {
    it('should find the average sleep hours per day for a user', () => {
      expect(sleep.calculateAverage(3, 'hoursSlept')).to.equal(3);
    });

    it('should find the average sleep quality per day for a user', () => {
      expect(sleep.calculateAverage(3, 'sleepQuality')).to.equal(2);
    });

    it('should find the sleep hours for a user on a specified date', () => {
      expect(sleep.calculateDailyData(2, "2017/06/15", 'hoursSlept')).to.equal(7);
      expect(sleep.calculateDailyData(4, "2019/06/21", 'hoursSlept')).to.equal(6.1);
    });

    it('should find the sleep quality for a user on a specified date', () => {
      expect(sleep.calculateDailyData(2, "2017/06/15", 'sleepQuality')).to.equal(4.7);
      expect(sleep.calculateDailyData(4, "2019/06/21", 'sleepQuality')).to.equal(3.5);
    });

    it('should find hours slept per day for a specified week', () => {

      expect(sleep.calculateWeeklyData('2019/06/18', 4, userRepo, 'hoursSlept')[0]).to.eql({ date: '2019/06/18', data: 7.9 });
      expect(sleep.calculateWeeklyData('2019/06/18', 4, userRepo, 'hoursSlept')[6]).to.eql({ date: '2017/06/15', data: 5.4 });
    });

    it('should find sleep quality per day for a specified week', () => {

      expect(sleep.calculateWeeklyData('2019/06/18', 4, userRepo, 'sleepQuality')[0]).to.eql({ date: '2019/06/18', data: 1.6 });
      expect(sleep.calculateWeeklyData('2019/06/18', 4, userRepo, 'sleepQuality')[6]).to.eql({ date: '2017/06/15', data: 3 });
    });

    it('should find the average sleep quality for all users', () => {
      expect(sleep.calculateAllUserSleepQuality()).to.eql(3);
    });
  });
});
