class UserRepo {
  constructor(users) {
    this.users = users;
  };

  getUserFromID(id) {
    return this.users.find((user) => id === user.id);
  };

  getDataFromUserID(id, dataSet) {
    return dataSet.filter((userData) => id === userData.userID);
  };

  calculateAverageStepGoal() {
    const totalStepGoal = this.users.reduce((sumSoFar, data) => {
      return sumSoFar = sumSoFar + data.dailyStepGoal;
    }, 0);
    return totalStepGoal / this.users.length;
  };

  makeSortedUserArray(id, dataSet) {
    const selectedID = this.getDataFromUserID(id, dataSet);
    const sortedByDate = selectedID.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedByDate;
  }

  getToday(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet)[0].date;
  };

  getFirstWeek(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet).slice(0, 7);
  };

  getWeekFromDate(date, id, dataSet) {
    const searchedDate = this.makeSortedUserArray(id, dataSet).find((sortedItem) => (sortedItem.date === date));
    const dateIndex = this.makeSortedUserArray(id, dataSet).indexOf(searchedDate);
    return this.makeSortedUserArray(id, dataSet).slice(dateIndex, dateIndex + 7);
  };

  chooseWeekDataForAllUsers(dataSet, date) {
    const lastWeek = new Date(date).setDate((new Date(date)).getDate() - 7)
    return dataSet.filter((dataItem) => {
      return lastWeek <= new Date(dataItem.date) && new Date(dataItem.date) <= new Date(date);
    })
  };

  chooseDayDataForAllUsers(dataSet, date) {
    return dataSet.filter(function(dataItem) {
      return dataItem.date === date;
    });
  }

  isolateUsernameAndRelevantData(relevantData, listFromMethod) {
    return listFromMethod.reduce(function(objectSoFar, dataItem) {
      if (!objectSoFar[dataItem.userID]) {
        objectSoFar[dataItem.userID] = [dataItem[relevantData]]
      } else {
        objectSoFar[dataItem.userID].push(dataItem[relevantData])
      }
      return objectSoFar;
    }, {});
  }

  rankUserIDsbyRelevantDataValue(relevantData, listFromMethod) {
    const sortedObjectKeys = this.isolateUsernameAndRelevantData(relevantData, listFromMethod)
    return Object.keys(sortedObjectKeys).sort((b, a) => {
      const calculateAverage = (value) => {
        return sortedObjectKeys[value].reduce((sum, dataValue) => sum += dataValue, 0) 
          / sortedObjectKeys[value].length;
      };
      return calculateAverage(a) - calculateAverage(b);
    });
  }

  combineRankedUserIDsAndAveragedData(relevantData, listFromMethod) {
    const sortedObjectKeys = this.isolateUsernameAndRelevantData(relevantData, listFromMethod)
    const rankedUsersAndAverages = this.rankUserIDsbyRelevantDataValue(relevantData, listFromMethod)
    return rankedUsersAndAverages.map((rankedUser) => {
      rankedUser = {
        [rankedUser]: sortedObjectKeys[rankedUser].reduce( (sumSoFar, sleepQualityValue) => {
            sumSoFar += sleepQualityValue
            return sumSoFar;
          }, 0) / sortedObjectKeys[rankedUser].length
      };
      return rankedUser;
    });
  }
}

export default UserRepo;
