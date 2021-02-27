import './css/index.scss';
import './images/person walking on path.jpg';
import './images/The Rock.jpg';
import './images/walk.svg';
import './images/water.svg';
import './images/sleep.svg';


import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';

import chart from "./dataChart.js"
import fetchAPIData from './API';

// header buttons
let hydrationButton = document.querySelector('#hydrationButton');
let sleepButton = document.querySelector('#sleepButton');
let activityButton = document.querySelector('#activityButton');

// forms
let baseForm = document.querySelector('.add-information-form');
let hydrationForm = document.querySelector('.hydration-form');
let sleepForm = document.querySelector('.sleep-form');
let activityForm = document.querySelector('.activity-form');

// form entry fields
let formHydrationDate = document.querySelector('#hydrationDate');
let formHydrationOz = document.querySelector('#hydrationOz');
let formSleepDate = document.querySelector('#sleepDate');
let formSleepHours = document.querySelector('#sleepHours');
let formSleepQuality = document.querySelector('#sleepQuality');
let formActivityDate = document.querySelector('#activityDate');
let formActivitySteps = document.querySelector('#activitySteps');
let formActivityMin = document.querySelector('#activityMin');
let formActivityFlights = document.querySelector('#flights');

let submitButton = document.querySelector('.submit-button');
// form notifications
let formSuccessNotification = document.querySelector('.success');
let formErrorNotification = document.querySelector('.error');

window.addEventListener('load', getFetchedUsers);
hydrationButton.addEventListener('click', showHydrationForm);
// sleepButton.addEventListener('click', showSleepForm);
// activityButton.addEventListener('click', showActivityForm);
// submitButton.addEventListener('click', submitForm);

function hideElement(element) {
  element.classList.add('hidden');
}

function showElement(element) {
  element.classList.remove('hidden');
}

function showHydrationForm() {
  showElement()
}

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
  const userNow = getUserById(userRepo, userNowId);
  getFetchedLifeData(userRepo, userNowId, userNow);
}

function makeUsers(userList, userData) {
  userData.forEach(dataItem => {
    let user = new User(dataItem);
    userList.push(user);
  })
}

function getFetchedLifeData(userRepo, userNowId, userNow) {
  fetchAPIData.fetchLifeData()
    .then(data => handleLifeData(data[0], data[1], data[2], userRepo, userNowId, userNow))
}

function handleLifeData(sleepData, activityData, hydrationData, userRepo, userNowId, userNow) {
  const hydrationRepo = new Hydration(hydrationData);
  const sleepRepo = new Sleep(sleepData);
  const activityRepo = new Activity(activityData);
  const today = makeToday(userRepo, userNowId, hydrationRepo.dataSet);
  const randomHistory = makeRandomDate(userRepo, userNowId, hydrationRepo.dataSet);
  startApp(sleepRepo, activityRepo, hydrationRepo, userRepo, userNowId, today, randomHistory, userNow)
}

function startApp(sleepRepo, activityRepo, hydrationRepo, userRepo, userNowId, today, randomHistory, userNow) {
  const historicalWeek = document.querySelectorAll('.historicalWeek');
  addWalkingStats(userNow, userRepo, today, activityRepo)
  historicalWeek.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));
  addInfoToSidebar(userNow, userRepo);
  addHydrationInfo(userNowId, hydrationRepo, today, userRepo, randomHistory);
  addSleepInfo(userNowId, sleepRepo, today, userRepo, randomHistory);
  const winnerNow = makeWinnerID(activityRepo, userNow, today, userRepo);
  addActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow, winnerNow);
  // addFriendGameInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow);
}

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