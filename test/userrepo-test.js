import { expect } from 'chai';
import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('User Repo', () => {
  let user1, user2, user3, user4, users, userRepo, hydrationData, sleepData, weeklySleepData, weeklyHydrationData;

  beforeEach( () => {
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

    hydrationData = [{
        "userID": 1,
        "date": "2019/06/15",
        "numOunces": 37
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "numOunces": 38
      },
      {
        "userID": 3,
        "date": "2019/05/09",
        "numOunces": 1
      },
      {
        "userID": 1,
        "date": "2019/04/15",
        "numOunces": 36
      },
      {
        "userID": 2,
        "date": "2018/10/23",
        "numOunces": 34
      },
      {
        "userID": 3,
        "date": "2018/06/16",
        "numOunces": 39
      },
      {
        "userID": 1,
        "date": "2018/03/30",
        "numOunces": 2
      },
      {
        "userID": 2,
        "date": "2018/02/01",
        "numOunces": 28
      },
      {
        "userID": 3,
        "date": "2016/08/22",
        "numOunces": 30
      }
    ];

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
      }
    ];

    weeklySleepData = userRepo.chooseWeekDataForAllUsers(sleepData, "2017/06/15");
    weeklyHydrationData = userRepo.chooseWeekDataForAllUsers(hydrationData, "2019/06/15");
  });

  it('should be a function', () => {
    expect(UserRepo).to.be.a('function');
  });

  it('takes an array of user data', () => {
    expect(userRepo.users).to.equal(users);
    expect(userRepo.users).to.be.a('array');
  });

  it('should have a parameter to take in user data', () => {
    expect(userRepo.users[0].id).to.deep.equal(1);
    expect(userRepo.users[0].name).to.deep.equal("Alex Roth");
    expect(userRepo.users[0].address).to.deep.equal("1234 Turing Street, Denver CO 80301-1697");
    expect(userRepo.users[0].email).to.deep.equal("alex.roth1@hotmail.com");
    expect(userRepo.users[0].strideLength).to.deep.equal(4.3);
    expect(userRepo.users[0].dailyStepGoal).to.deep.equal(10000);
    expect(userRepo.users[0].friends).to.deep.equal([2, 3, 4]);
  });

  it('should return user data when given user ID', () => {
    expect(userRepo.getUserFromID(1)).to.eql(user1);
  });

  it('should return the average of all users step goals', () => {
    userRepo.calculateAverageStepGoal();
    expect(userRepo.calculateAverageStepGoal()).to.eql(21500);
  });

  describe('UserRepo methods', () => {
    it('should get a users data from its userID in any data set', () => {
      let hydrationStats = hydrationData.filter(data => data['userID'] === 1);
      let sleepStats = sleepData.filter(data => data['userID'] === 2);
      expect(userRepo.getDataFromUserID(1, hydrationData)).to.eql(hydrationStats);
      expect(userRepo.getDataFromUserID(2, sleepData)).to.eql(sleepStats);
    });

    it('should get a users most recent date using the app', () => {
      expect(userRepo.getToday(3, hydrationData)).to.eql('2019/05/09');
    });

    it('should sort data by date and extract its week', () => {
      expect(userRepo.getFirstWeek(3, hydrationData)[2].date).to.eql('2016/08/22');
    });

    it('should get a sorted week of data for a single user from a date', () => {
      expect(userRepo.getWeekFromDate('2019/06/15', 1, hydrationData)[2].date).to.eql('2018/03/30');
      expect(userRepo.getWeekFromDate('2018/07/15', 3, sleepData)[0].date).to.eql('2018/07/15');
    });

    it('should get a week of data for all users in data set', () => {
      let weeklyData = userRepo.chooseWeekDataForAllUsers(hydrationData, '2019/06/15')
      expect(weeklyData[1].date).to.eql("2019/06/15");
      expect(weeklyData[1].userID).to.eql(2);
      expect(weeklyData[0].date).to.eql("2019/06/15");
      expect(weeklyData[0].userID).to.eql(1);
    });

    it('should get a day of data for all users in data set', () => {
      let dayData = userRepo.chooseDayDataForAllUsers(sleepData, '2017/06/15');
      expect(dayData[0].date).to.eql('2017/06/15');
      expect(dayData[0].hoursSlept).to.eql(6.1);
      expect(dayData[2].date).to.eql('2017/06/15');
      expect(dayData[2].userID).to.eql(3);
    });

    it('should isolate a user ID and its values of any relevant data', () => {
      expect(userRepo.isolateUsernameAndRelevantData( 'sleepQuality', weeklySleepData)).to.eql({
        '1': [2.2],
        '2': [4.7],
        '3': [3]
      });
      expect(userRepo.isolateUsernameAndRelevantData( 'numOunces', weeklyHydrationData)).to.eql({
        '1': [ 37 ],
        '2': [ 38 ] 
      });
    });

    it('should rank user ids according to relevant data value averages', () => {
      expect(userRepo.rankUserIDsbyRelevantDataValue('sleepQuality', weeklySleepData)).to.eql(['2', '3', '1']);
    });

    it('should show list in order of userID and average of relevant value', () => {
      expect(userRepo.combineRankedUserIDsAndAveragedData('sleepQuality', weeklySleepData)[0]).to.eql({
        '2': 4.7
      });
    });
  });
});