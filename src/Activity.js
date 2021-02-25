import Calculation from './Calculation';

class Activity extends Calculation {
  constructor(dataSet) {
    super(dataSet)
  }

  getMilesFromStepsByDate(id, date, userRepo) {
    const userStepsByDate = this.dataSet.find(data => id === data.userID && date === data.date);
    return parseFloat(((userStepsByDate.numSteps * userRepo.strideLength) / 5280).toFixed(1));
  }

  // getActiveMinutesByDate(id, date) {
  //   const userActivityByDate = this.dataSet.find(data => id === data.userID && date === data.date);
  //   return userActivityByDate.minutesActive;
  // }

  calculateActiveAverageForWeek(id, date, userRepo) {
    return parseFloat((userRepo.getWeekFromDate(date, id, this.dataSet).reduce((acc, elem) => {
      return acc += elem.minutesActive;
    }, 0) / 7).toFixed(1));
  }

  accomplishStepGoal(id, date, userRepo) {
    const userStepsByDate = this.dataSet.find(data => id === data.userID && date === data.date);
    if (userStepsByDate.numSteps === userRepo.dailyStepGoal) {
      return true;
    }
    return false
  }

  getDaysGoalExceeded(id, userRepo) {
    return this.dataSet.filter(data => id === data.userID && data.numSteps > userRepo.dailyStepGoal).map(data => data.date);
  }

  getStairRecord(id) {
    return this.dataSet.filter(data => id === data.userID).reduce((acc, elem) => (elem.flightsOfStairs > acc) ? elem.flightsOfStairs : acc, 0);
  }

  getAllUserAverageForDay(date, userRepo, relevantData) {
    const selectedDayData = userRepo.chooseDayDataForAllUsers(this.dataSet, date);
    return parseFloat((selectedDayData.reduce((acc, elem) => acc += elem[relevantData], 0) / selectedDayData.length).toFixed(1));
  }

  // userDataForToday(id, date, userRepo, relevantData) {
  //   const userData = userRepo.getDataFromUserID(id, this.activityData);
  //   return userData.find(data => data.date === date)[relevantData];
  // }

  // userDataForWeek(id, date, userRepo, releventData) {
  //   return userRepo.getWeekFromDate(date, id, this.activityData).map((data) => `${data.date}: ${data[releventData]}`);
  // }

  // Friends

  getFriendsActivity(user, userRepo) {
    const data = this.activityData;
    const userDatalist = user.friends.map(function (friend) {
      return userRepo.getDataFromUserID(friend, data)
    });
    return userDatalist.reduce(function (arraySoFar, listItem) {
      return arraySoFar.concat(listItem);
    }, []);
  }

  getFriendsAverageStepsForWeek(user, date, userRepo) {
    const friendsActivity = this.getFriendsActivity(user, userRepo);
    const timeline = userRepo.chooseWeekDataForAllUsers(friendsActivity, date);
    return userRepo.combineRankedUserIDsAndAveragedData('numSteps', timeline)
  }

  showChallengeListAndWinner(user, date, userRepo) {
    const rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);

    return rankedList.map(function (listItem) {
      const userID = Object.keys(listItem)[0];
      const userName = userRepo.getUserFromID(parseInt(userID)).name;
      return `${userName}: ${listItem[userID]}`
    })
  }

  showcaseWinner(user, date, userRepo) {
    return this.showChallengeListAndWinner(user, date, userRepo)[0];
  }

  getStreak(userRepo, id, relevantData) {
    const data = this.activityData;
    const sortedUserArray = (userRepo.makeSortedUserArray(id, data)).reverse();
    const streaks = sortedUserArray.reduce((acc, userData, index, arr) => {
      if (index >= 2 &&
        userData[relevantData] > arr[index - 1][relevantData] &&
        userData[relevantData] > arr[index - 2][relevantData]) {
        acc.push(userData.date);
      }
      return acc;
    }, []);
    return streaks;
  }

  getWinnerId(user, date, userRepo) {
    const rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);
    const keysList = rankedList.map(listItem => Object.keys(listItem));
    return parseInt(keysList[0].join(''))
  }
}

export default Activity;