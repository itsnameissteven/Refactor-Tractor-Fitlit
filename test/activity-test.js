import { expect } from 'chai';
import Activity from '../src/Activity';
import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('Activity', () => {
  let activityData, user1, user2, user3, user4, users, userRepo, activity;

  beforeEach(() => {
    activityData = [{
      "userID": 1,
      "date": "2019/06/15",
      "numSteps": 3577,
      "minutesActive": 140,
      "flightsOfStairs": 16
    },
    {
      "userID": 2,
      "date": "2019/06/15",
      "numSteps": 4294,
      "minutesActive": 138,
      "flightsOfStairs": 10
    },
    {
      "userID": 3,
      "date": "2019/06/15",
      "numSteps": 7402,
      "minutesActive": 116,
      "flightsOfStairs": 33
    },
    {
      "userID": 4,
      "date": "2019/06/15",
      "numSteps": 3486,
      "minutesActive": 114,
      "flightsOfStairs": 32
    },
    {
      "userID": 1,
      "date": "2019/06/16",
      "numSteps": 5000,
      "minutesActive": 12,
      "flightsOfStairs": 14
    },
    {
      "userID": 1,
      "date": "2019/06/17",
      "numSteps": 9303,
      "minutesActive": 45,
      "flightsOfStairs": 9
    },
    {
      "userID": 1,
      "date": "2019/06/18",
      "numSteps": 12002,
      "minutesActive": 66,
      "flightsOfStairs": 12
    }
    ];

    user1 = new User({
      id: 1,
      name: "Alex Roth",
      address: "1234 Turing Street, Denver CO 80301-1697",
      email: "alex.roth1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 5000,
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
      name: "Jerry Seinfield",
      address: "32 Baker Street, Denver CO 12345",
      email: "jseinfield@gmail.com",
      strideLength: 3.8,
      dailyStepGoal: 20000,
      friends: [1, 2, 4]
    });

    user4 = new User({
      id: 4,
      name: "Patrick the Starfish",
      address: "A rock in the ocean",
      email: "thebigpstar@pacificocean.net",
      strideLength: .2,
      dailyStepGoal: 13000,
      friends: [1, 2]
    });
    users = [user1, user2, user3, user4];
    userRepo = new UserRepo(users);
    activity = new Activity(activityData);
  });

  describe('Properties', () => {
    it('should be a function', () => {
      expect(Activity).to.be.a("function");
    });

    it('should be an instance of Hydration', () => {
      expect(activity).to.be.an.instanceOf(Activity);
    });

    it('should take in a list of data from a parameter', () => {
      expect(activity.dataSet[0]).to.eql({
        "userID": 1,
        "date": "2019/06/15",
        "numSteps": 3577,
        "minutesActive": 140,
        "flightsOfStairs": 16
      });
    });
  });

  describe('Methods', () => {
    it('should return the miles a given user has walked on a given date', () => {
      const milesWalked = activity.getMilesFromStepsByDate(1, "2019/06/15", userRepo.users[0]);
      expect(milesWalked).to.eql(2.9);
      expect(milesWalked).to.be.a('number');
    });

    it('should return the number of minutes a given user was active for on a given day', () => {
      expect(activity.calculateDailyData(1, "2019/06/16", 'minutesActive')).to.eql(12);
    });

    it('should return average active minutes in a given week', () => {
      expect(activity.calculateActiveAverageForWeek(1, "2019/06/21", userRepo)).to.eql(20);
    });

    it('should return true/false if the given user met their step goal on a given day', () => {
      expect(activity.accomplishStepGoal(4, "2019/06/15", userRepo.users[3])).to.eql(false);
      expect(activity.accomplishStepGoal(1, "2019/06/16", userRepo.users[0])).to.eql(true);
    });

    it('should return all days that a given user exceeded their step goal', () => {
      const daysAchievedGoals = ['2019/06/17', '2019/06/18'];
      expect(activity.getDaysGoalExceeded(1, userRepo.users[0])).to.eql(daysAchievedGoals);
    });

    it('should return the highest number of stairs climbed in a day for all time', () => {
      expect(activity.getStairRecord(3)).to.eql(33);
    });

    it('should return the average flight of stairs for all users on given day', () => {
      expect(activity.getAllUserAverageForDay("2019/06/15", userRepo, "flightsOfStairs")).to.eql(22.8)
    })

    it('should return average steps taken for given date for all users', () => {
      expect(activity.getAllUserAverageForDay("2019/06/15", userRepo, "numSteps")).to.eql(4689.8)
    });

    it('should return average minutes active given date for all users', () => {
      expect(activity.getAllUserAverageForDay("2019/06/15", userRepo, "minutesActive")).to.eql(127)
    });

    it('should return steps for given user on given date', () => {
      expect(activity.calculateDailyData(2, "2019/06/15", 'numSteps')).to.eql(4294);
    });

    it('should return minutes active for given user on given date', () => {
      expect(activity.calculateDailyData(3, "2019/06/15", 'minutesActive')).to.eql(116);
    });

    it('should return a weeks worth steps for a given user', () => {
      const weeklyData = ['2019/06/17: 9303', '2019/06/16: 5000', '2019/06/15: 3577'];
      expect(activity.calculateWeeklyData("2019/06/17", 1, userRepo, 'numSteps')).to.eql(weeklyData);
    });

    it('should return a weeks worth active minutes for a given user', () => {
      const weeklyData = ['2019/06/17: 45', '2019/06/16: 12', '2019/06/15: 140']
      expect(activity.calculateWeeklyData("2019/06/17", 1, userRepo, 'minutesActive')).to.eql(weeklyData);
    });

    it('should return a weeks worth stairs for a given user', () => {
      const weeklyData = ['2019/06/17: 9', '2019/06/16: 14', '2019/06/15: 16']
      expect(activity.calculateWeeklyData("2019/06/17", 1, userRepo, 'flightsOfStairs')).to.eql(weeklyData);
    });
  });
  describe('Friend Activity', () => {
    it('should get a users friend lists activity', () => {
      const friends = activityData.filter(person => person.userID === 1 || person.userID === 2);
      const friendsSorted = friends.sort((a, b) => a.userID - b.userID);
      expect(activity.getFriendsActivity(user4, userRepo)).to.eql(friendsSorted);
    });

    it('should get a users ranked friendslist activity for a chosen week', () => {
      const usersRanked = [{ '2': 4294 }, { '1': 3577 }];
      expect(activity.getFriendsAverageStepsForWeek(user4, "2019/06/15", userRepo)).to.eql(usersRanked);
    });

    it('should get a users ranked friendslist activity for a chosen week with names', () => {
      const usersWeeklyRanked = ['Allie McCarthy: 4294', 'Alex Roth: 3577'];
      expect(activity.showChallengeListAndWinner(user4, "2019/06/15", userRepo)).to.eql(usersWeeklyRanked);
    });

    it('should know the ID of the winning friend', () => {
      expect(activity.getWinnerId(user4, "2019/06/15", userRepo)).to.eql(2);
    });

    it('should show a 3-day increasing streak for a users step count', () => {
      expect(activity.getStreak(userRepo, 1, 'numSteps')).to.eql(['2019/06/17', '2019/06/18']);
    });

    it('should show a 3-day increasing streak for a users minutes of activity', () => {
      expect(activity.getStreak(userRepo, 1, 'minutesActive')).to.eql(['2019/06/18']);
    });
  });
});

