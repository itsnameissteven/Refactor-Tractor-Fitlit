// import './css/base.scss';
// import './css/style.scss';
import './css/index.scss';
import './images/person walking on path.jpg';
import './images/The Rock.jpg';
import './images/walk.svg';
import './images/water.svg';
import './images/sleep.svg';

// import userData from './data/users';
// import hydrationData from './data/hydration';
// import sleepData from './data/sleep';
// import activityData from './data/activity';

import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';
// import fetchAllData from './API';
// import Chart from 'chart.js'
import chart from "./dataChart.js"
import fetchAPIData from './API';

// var sidebarName = document.getElementById('sidebarName');
// var stepGoalCard = document.getElementById('stepGoalCard');
// var headerText = document.getElementById('headerText');
// var userAddress = document.getElementById('userAddress');
// var userEmail = document.getElementById('userEmail');
// var userStridelength = document.getElementById('userStridelength');
// var friendList = document.getElementById('friendList');
// var hydrationToday = document.getElementById('hydrationToday');
// var hydrationAverage = document.getElementById('hydrationAverage');
// var hydrationThisWeek = document.getElementById('hydrationThisWeek');
// var hydrationEarlierWeek = document.getElementById('hydrationEarlierWeek');
var historicalWeek = document.querySelectorAll('.historicalWeek');
// var sleepToday = document.getElementById('sleepToday');
// var sleepQualityToday = document.getElementById('sleepQualityToday');
// var avUserSleepQuality = document.getElementById('avUserSleepQuality');
// var sleepThisWeek = document.getElementById('sleepThisWeek');
// var sleepEarlierWeek = document.getElementById('sleepEarlierWeek');
// var friendChallengeListToday = document.getElementById('friendChallengeListToday');
// var friendChallengeListHistory = document.getElementById('friendChallengeListHistory');
// var bigWinner = document.getElementById('bigWinner');
// var userStepsToday = document.getElementById('userStepsToday');
// var avgStepsToday = document.getElementById('avgStepsToday');
// var userStairsToday = document.getElementById('userStairsToday');
// var avgStairsToday = document.getElementById('avgStairsToday');
// var userMinutesToday = document.getElementById('userMinutesToday');
// var avgMinutesToday = document.getElementById('avgMinutesToday');
// var userStepsThisWeek = document.getElementById('userStepsThisWeek');
// var userStairsThisWeek = document.getElementById('userStairsThisWeek');
// var userMinutesThisWeek = document.getElementById('userMinutesThisWeek');
// var bestUserSteps = document.getElementById('bestUserSteps');
// var streakList = document.getElementById('streakList');
// var streakListMinutes = document.getElementById('streakListMinutes')
// let hydroChart = document.getElementById("hydroChart")
// let sleepChart = document.getElementById("sleepChart")
let dataSet = []

window.addEventListener('load', getFetchedUsers);

function getFetchedUsers() {
  fetchAPIData.fetchUserData()
    .then(data => createRandomUser(data))
}

function createRandomUser(userData) {
  let userList = [];
  let userRepo;
  makeUsers(userList, userData);
  userRepo = new UserRepo(userList);
  const userNowId = pickUser();
  getFetchedLifeData(userRepo, userNowId);
}

function makeUsers(userList, userData) {
  userData.forEach(dataItem => {
    let user = new User(dataItem);
    userList.push(user);
  })
}

function getFetchedLifeData(userRepo, userNowId) {
  fetchAPIData.fetchLifeData()
    .then(data => handleLifeData(data[0], data[1], data[2], userRepo, userNowId))
}

function handleLifeData(sleepData, activityData, hydrationData, userRepo, userNowId) {
  const hydration = new Hydration(hydrationData);
  const sleep = new Sleep(sleepData);
  const activity = new Activity(activityData);
  startApp(sleep, activity, hydration, userRepo, userNowId)
}

function startApp(sleepRepo, activityRepo, hydrationRepo, userRepo, userNowId) {
  let userNow = getUserById(userRepo, userNowId);
  let today = makeToday(userRepo, userNowId, hydrationRepo.dataSet);
  let randomHistory = makeRandomDate(userRepo, userNowId, hydrationRepo.dataSet);
  addWalkingStats(userNow, userRepo, today, activityRepo)
  historicalWeek.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));
  addInfoToSidebar(userNow, userRepo);
  addHydrationInfo(userNowId, hydrationRepo, today, userRepo, randomHistory);
  addSleepInfo(userNowId, sleepRepo, today, userRepo, randomHistory);
  let winnerNow = makeWinnerID(activityRepo, userNow, today, userRepo);
  addActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow, winnerNow);
  // addFriendGameInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow);
}



// fetchAPIData.fetchLifeData()
//   .then(data => handleLifeData(data[0], data[1], data[2]))

// function handleLifeData(sleepData, activityData, hydrationData) {
//   const hydration = new Hydration(hydrationData);
//   const sleep = new Sleep(sleepData);
//   const activity = new Activity(activityData);
//   startApp(sleep, activity, hydration)
// }

// function startApp(sleepRepo, activityRepo, hydrationRepo) {
//   let userList = [];
//   let userRepo;
//   fetchAPIData.fetchUserData()
//     .then(data => {
//       data.forEach(dataItem => {
//         let user = new User(dataItem);
//         userList.push(user);

//       })
//       console.log(userList);
//       userRepo = new UserRepo(userList)
//       let userNowId = pickUser();
//       let userNow = getUserById(userRepo, userNowId);
//       let today = makeToday(userRepo, userNowId, hydrationRepo.dataSet);
//       let randomHistory = makeRandomDate(userRepo, userNowId, hydrationRepo.dataSet);
//       addWalkingStats(userNow, userRepo, today, activityRepo)
//       historicalWeek.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));
//       addInfoToSidebar(userNow, userRepo);
//       addHydrationInfo(userNowId, hydrationRepo, today, userRepo, randomHistory);
//       addSleepInfo(userNowId, sleepRepo, today, userRepo, randomHistory);
//       let winnerNow = makeWinnerID(activityRepo, userNow, today, userRepo);
//       addActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow, winnerNow);
//       // addFriendGameInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow);
//     })
// }

function pickUser() {
  return Math.floor(Math.random() * 50);
}

function getUserById(listRepo, id) {
  return listRepo.getUserFromID(id);
}

function addInfoToSidebar(user, userStorage) {
  const sidebarName = document.getElementById('sidebarName');
  const headerText = document.getElementById('headerText');
  const userAddress = document.getElementById('userAddress');
  const userEmail = document.getElementById('userEmail');
  const friendList = document.getElementById('friendList');
  sidebarName.innerText = user.name;
  headerText.innerText = `${user.getFirstName()}'s Activity Tracker`;
  userAddress.innerText = user.address;
  userEmail.innerText = user.email;
  friendList.insertAdjacentHTML('afterBegin', makeFriendHTML(user, userStorage))
}

function addWalkingStats(user, userStorage, date, activityRepo) {
  const userStrideLength = document.getElementById('userStrideLength');
  const stepGoalCard = document.getElementById('stepGoalCard');
  const milesWalked = document.getElementById('milesWalked');
  userStrideLength.innerText = `${user.strideLength}meters`;
  stepGoalCard.innerText = `${userStorage.calculateAverageStepGoal()}`;
  milesWalked.innerText = `${activityRepo.getMilesFromStepsByDate(user.id, date, user)}`;
}


function makeFriendHTML(user, userStorage) {
  return user.getFriendsNames(userStorage).map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
}

function makeWinnerID(activityInfo, user, dateString, userStorage) {
  return activityInfo.getWinnerId(user, dateString, userStorage)
}

function makeToday(userStorage, id, dataSet) {
  const sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  return sortedArray[0].date;
}

function makeRandomDate(userStorage, id, dataSet) {
  const sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  return sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date
}

function addHydrationInfo(id, hydrationInfo, dateString, userStorage) {
  const hydrationToday = document.getElementById('hydrationToday');
  const hydrationAverage = document.getElementById('hydrationAverage');
  const hydroChart = document.getElementById("hydroChart");
  chart.makeChart(hydrationInfo.calculateFirstWeekOunces(userStorage, id), hydroChart, "Number of Ounces");
  hydrationToday.innerText = `${hydrationInfo.calculateDailyData(id, dateString, 'numOunces')}oz`;
  hydrationAverage.innerText = `${hydrationInfo.calculateAverage(id, "numOunces")}oz`;
}


function addSleepInfo(id, sleepInfo, dateString, userStorage) {
  const sleepToday = document.getElementById('sleepToday');
  const sleepQualityToday = document.getElementById('sleepQualityToday');
  const avUserSleepQuality = document.getElementById('avUserSleepQuality');
  const sleepChart = document.getElementById("sleepChart");
  sleepToday.innerText = `${sleepInfo.calculateDailyData(id, dateString, "hoursSlept")}hrs`;
  sleepQualityToday.innerText = `${sleepInfo.calculateDailyData(id, dateString, "sleepQuality")}/5`;
  avUserSleepQuality.innerText = `${Math.round(sleepInfo.calculateAllUserSleepQuality() * 100) / 100}/5`;
  chart.makeChart(sleepInfo.calculateWeeklyData(dateString, id, userStorage, "hoursSlept"), sleepChart, "Hours of Sleep");
}

function addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
  const stepChart = document.getElementById("stepChart");
  const flightsOfStairsChart = document.getElementById("flightsOfStairsChart");
  const activeMinutesChart = document.getElementById('activeMinutesChart');
  createBarChart(activityInfo, id, dateString, "numSteps", userStorage, stepChart, "Steps Today");
  createBarChart(activityInfo, id, dateString, "flightsOfStairs", userStorage, flightsOfStairsChart, "flights of stairs");
  createBarChart(activityInfo, id, dateString, "minutesActive", userStorage, activeMinutesChart, "Active Minutes Today");
  const weeklySteps = document.getElementById("weeklySteps");
  const weeklyMinutesActive = document.getElementById('weeklyMinutesActive');
  const weeklyFlightsClimbed = document.getElementById('weeklyFlightsClimbed');
  createLineChart(activityInfo, id, dateString, "numSteps", userStorage, weeklySteps, "weekly steps");
  createLineChart(activityInfo, id, dateString, "minutesActive", userStorage, weeklyMinutesActive, "weekly minutes active");
  createLineChart(activityInfo, id, dateString, "flightsOfStairs", userStorage, weeklyFlightsClimbed, "weekly flights climbed");
}

function createBarChart(activityInfo, id, dateString, property, userStorage, element, chartLabel) {
  chart.createDoubleDataBarChart(activityInfo.calculateDailyData(id, dateString, property),
    activityInfo.getAllUserAverageForDay(dateString, userStorage, property), element, chartLabel);
}

function createLineChart(activityInfo, id, dateString, property, userStorage, element, chartLabel) {
  chart.makeChart(activityInfo.calculateWeeklyData(dateString, id, userStorage, property),
    element, chartLabel);
}

// bestUserSteps.insertAdjacentHTML("afterBegin", makeStepsHTML(user, activityInfo, userStorage, activityInfo.calculateWeeklyData(dateString, winnerId, userStorage, "numSteps")));


// function addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user) {
//   friendChallengeListToday.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
//   streakList.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'numSteps')));
//   streakListMinutes.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.getStreak(userStorage, id, 'minutesActive')));
//   friendChallengeListHistory.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
//   bigWinner.insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${activityInfo.showcaseWinner(user, dateString, userStorage)} steps`)
// }

function makeFriendChallengeHTML(id, activityInfo, userStorage, method) {
  return method.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
}

function makeStepStreakHTML(id, activityInfo, userStorage, method) {
  return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
}