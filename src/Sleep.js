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

  determineSleepQualityOver3(date, userRepo) {
    const timeline = userRepo.chooseWeekDataForAllUsers(this.dataSet, date);
    const userSleepObject = userRepo.isolateUsernameAndRelevantData('sleepQuality', timeline);

    return Object.keys(userSleepObject).filter(function (key) {
      return (userSleepObject[key].reduce(function (sumSoFar, sleepQualityValue) {
        sumSoFar += sleepQualityValue
        return sumSoFar;
      }, 0) / userSleepObject[key].length) > 3
    }).map(function (sleeper) {
      return userRepo.getUserFromID(parseInt(sleeper)).name;
    })
  }

  //THIS METHOD IS NEVER USED NOR MENTIONED IN RUBRIC
  // determineSleepWinnerForWeek(date, userRepo) {
  //   let timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
  //   let sleepRankWithData = userRepo.combineRankedUserIDsAndAveragedData('sleepQuality', timeline);

  //   return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  // }

  determineSleptMostonDate(date, userRepo) {
    const timeline = userRepo.chooseDayDataForAllUsers(this.dataSet, date);
    const sleepRankWithData = userRepo.combineRankedUserIDsAndAveragedData('hoursSlept', timeline);

    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }

  getWinnerNamesFromList(sortedArray, userRepo) {
    const bestSleepers = sortedArray.filter(function (element) {
      return element[Object.keys(element)] === Object.values(sortedArray[0])[0]
    });

    const bestSleeperIds = bestSleepers.map(function (bestSleeper) {
      return (Object.keys(bestSleeper));
    });

    return bestSleeperIds.map(function (sleepNumber) {
      return userRepo.getUserFromID(parseInt(sleepNumber)).name;
    });
  }
}

export default Sleep;
