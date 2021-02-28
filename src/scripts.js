import './css/index.scss';
import './images/person walking on path.jpg';
import './images/The Rock.jpg';
import './images/walk.svg';
import './images/water.svg';
import './images/sleep.svg';
import './images/remove.svg';

import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';

import chart from "./dataChart.js"
import fetchAPIData from './API';

let hydrationButton = document.querySelector('#hydrationButton');
let sleepButton = document.querySelector('#sleepButton');
let activityButton = document.querySelector('#activityButton');
let mainBody = document.querySelector('.main');
let baseForm = document.querySelector('.add-information-form');
let hydrationForm = document.querySelector('.hydration-form');
let sleepForm = document.querySelector('.sleep-form');
let activityForm = document.querySelector('.activity-form');
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
let xButton = document.querySelector('#remove');

let formSuccessNotification = document.querySelector('.success');
let formErrorNotification = document.querySelector('.error');

let userRepo;
let userNow;

window.addEventListener('load', getFetchedUsers);
hydrationButton.addEventListener('click', showHydrationForm);
sleepButton.addEventListener('click', showSleepForm);
activityButton.addEventListener('click', showActivityForm);
submitButton.addEventListener('click', submitForm);
xButton.addEventListener('click', hideAllForms);


function hideElement(element) {
  element.classList.add('hidden');
}

function showElement(element) {
  element.classList.remove('hidden');
}

function showHideEntryForms(subForm, form2, form3) {
  showElement(baseForm);
  showElement(subForm);
  hideElement(form2);
  hideElement(form3);
}

function blur(element) {
  element.classList.add('blur');
}

function unBlur(element) {
  element.classList.remove('blur');
}

function showHydrationForm() {
  blur(mainBody);
  document.getElementById("submit").value = "hydration";
  showHideEntryForms(hydrationForm, sleepForm, activityForm);
}

function showSleepForm() {
  blur(mainBody);
  document.getElementById("submit").value = "sleep";
  showHideEntryForms(sleepForm, hydrationForm, activityForm);
}

function showActivityForm() {
  blur(mainBody);
  document.getElementById("submit").value = "activity";
  showHideEntryForms(activityForm, sleepForm, hydrationForm);
}

function hideAllForms() {
  unBlur(mainBody);
  hideElement(baseForm);
  hideElement(hydrationForm);
  hideElement(sleepForm);
  hideElement(activityForm);
}

function grabHydrationInput(user) {
  const enteredHydrationInfo = {};
  enteredHydrationInfo.userID = userNow.id;
  console.log(typeof formHydrationDate.value);
  enteredHydrationInfo.date = formHydrationDate.value.replace(/-/g, '/');
  enteredHydrationInfo.numOunces = parseInt(formHydrationOz.value);
  console.log(typeof enteredHydrationInfo.date);
  postHydrationRequest(enteredHydrationInfo);
}

function postHydrationRequest(enteredHydrationInfo) {
  fetchAPIData.addNewData("http://localhost:3001/api/v1/hydration", enteredHydrationInfo)
    .then(() => handlePostSucess())
}
function handlePostSucess() {
  getFetchedLifeData();
}

function grabSleepInput(user) {
  const enteredSleepInfo = {};
  enteredSleepInfo.userID = userNow.id;
  enteredSleepInfo.date = formSleepDate.value;
  enteredSleepInfo.hoursSlept = formSleepHours.value;
  enteredSleepInfo.sleepQuality = formSleepQuality.value;
  console.log(enteredSleepInfo)

}

function grabActivityInput(user) {
  const enteredActivityInfo = {};
  enteredActivityInfo.userID = userNow.id;
  enteredActivityInfo.date = formActivityDate.value;
  enteredActivityInfo.numSteps = formActivitySteps.value;
  enteredActivityInfo.minutesActive = formActivityMin.value;
  enteredActivityInfo.flightsOfStairs = formActivityFlights.value;
  console.log(enteredActivityInfo)
}

function submitForm(event) {
  console.log('submit has been clicked!!! Oh happy day!')
  event.preventDefault(event)
  // console.log('i am the submit button', submitButton)
  // if (submitButton.value === "hydration") {
  if (document.getElementById("submit").value === "hydration") {
    console.log('hydration');
    grabHydrationInput();
  } else if (document.getElementById("submit").value === "sleep") {
    console.log('sleep');
    grabSleepInput();
  } else if (document.getElementById("submit").value === "activity") {
    console.log('activities!');
    grabActivityInput();
  }
  hideAllForms();
}

function getFetchedUsers() {
  fetchAPIData.fetchUserData()
    .then(data => createRandomUser(data))
}

function createRandomUser(userData) {
  let userList = [];
  // let userRepo;
  makeUsers(userList, userData);
  userRepo = new UserRepo(userList);
  const userNowId = pickUser();
  console.log(userNowId);
  userNow = getUserById(userRepo, userNowId);

  getFetchedLifeData();
}

function makeUsers(userList, userData) {
  userData.forEach(dataItem => {
    let user = new User(dataItem);
    userList.push(user);
  })
}

function getFetchedLifeData() {
  fetchAPIData.fetchLifeData()
    .then(data => handleLifeData(data[0], data[1], data[2]))
}

function handleLifeData(sleepData, activityData, hydrationData) {
  const hydrationRepo = new Hydration(hydrationData);
  const sleepRepo = new Sleep(sleepData);
  const activityRepo = new Activity(activityData);
  // if (typeof (userNow) === "undefined") {
  //   userNow = userRepo[0];
  // }
  console.log(hydrationRepo);
  const today = makeToday(userRepo, userNow.id, hydrationRepo.dataSet);
  const randomHistory = makeRandomDate(userRepo, userNow.id, hydrationRepo.dataSet);
  startApp(sleepRepo, activityRepo, hydrationRepo, today, randomHistory)
}

function startApp(sleepRepo, activityRepo, hydrationRepo, today, randomHistory) {
  const historicalWeek = document.querySelectorAll('.historicalWeek');
  historicalWeek.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));
  addInfoToSidebar(userNow, userRepo);
  addHydrationInfo(userNow.id, hydrationRepo, today, userRepo, randomHistory);
  addSleepInfo(userNow.id, sleepRepo, today, userRepo, randomHistory);
  addWalkingStats(today, activityRepo)
  const winnerNow = makeWinnerID(activityRepo, userNow, today, userRepo);
  addActivityInfo(userNow.id, activityRepo, today, userRepo, randomHistory, userNow, winnerNow);
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

function addWalkingStats(date, activityRepo) {
  const userStrideLength = document.getElementById('userStrideLength');
  const stepGoalCard = document.getElementById('stepGoalCard');
  const milesWalked = document.getElementById('milesWalked');
  const avgStepGoalCard = document.getElementById('avgStepGoalCard');
  userStrideLength.innerText = `${userNow.strideLength}m`;
  stepGoalCard.innerText = `${userNow.dailyStepGoal}`;
  avgStepGoalCard.innerText = `${userRepo.calculateAverageStepGoal()}`;
  milesWalked.innerText = `${activityRepo.getMilesFromStepsByDate(userNow.id, date, userNow)}mi`;
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
  const hydroChart = document.getElementById("hydroChart");
  const hydrationAverageWeek = document.getElementById('hydrationAverageWeek');
  chart.makeChart(hydrationInfo.calculateFirstWeekOunces(userStorage, id), hydroChart, "Number of Ounces", '#D5260B');
  hydrationToday.innerText = `${hydrationInfo.calculateDailyData(id, dateString, 'numOunces')}oz`;
  hydrationAverageWeek.innerText = `${hydrationInfo.calculateAverageWater(userStorage, id)}oz`
}

function addSleepInfo(id, sleepInfo, dateString, userStorage) {
  const sleepToday = document.getElementById('sleepToday');
  const sleepQualityToday = document.getElementById('sleepQualityToday');
  const avUserSleepQuality = document.getElementById('avUserSleepQuality');
  const sleepChart = document.getElementById("sleepChart");
  const sleepChartQuality = document.getElementById('sleepChartQuality');
  sleepToday.innerText = `${sleepInfo.calculateDailyData(id, dateString, "hoursSlept")}hrs`;
  sleepQualityToday.innerText = `${sleepInfo.calculateDailyData(id, dateString, "sleepQuality")}/5`;
  avUserSleepQuality.innerText = `${Math.round(sleepInfo.calculateAllUserSleepQuality() * 100) / 100}/5`;
  chart.makeChart(sleepInfo.calculateWeeklyData(dateString, id, userStorage, "hoursSlept"), sleepChart, "Hours of Sleep", '#0BBBD6');
  chart.makeChart(sleepInfo.calculateWeeklyData(dateString, id, userStorage, "sleepQuality"), sleepChartQuality, "Quality of Sleep", '#8B0BD5')
}

function addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
  const stepChart = document.getElementById("stepChart");
  const flightsOfStairsChart = document.getElementById("flightsOfStairsChart");
  const activeMinutesChart = document.getElementById('activeMinutesChart');
  createBarChart(activityInfo, id, dateString, "numSteps", userStorage, stepChart, "Steps Today");
  createBarChart(activityInfo, id, dateString, "flightsOfStairs", userStorage, flightsOfStairsChart, "Flights Climbed Today");
  createBarChart(activityInfo, id, dateString, "minutesActive", userStorage, activeMinutesChart, "Active Minutes Today");
  const weeklySteps = document.getElementById("weeklySteps");
  const weeklyMinutesActive = document.getElementById('weeklyMinutesActive');
  const weeklyFlightsClimbed = document.getElementById('weeklyFlightsClimbed');
  createLineChart(activityInfo, id, dateString, "numSteps", userStorage, weeklySteps, "weekly steps", '#260BD5');
  createLineChart(activityInfo, id, dateString, "minutesActive", userStorage, weeklyMinutesActive, "weekly minutes active", '#D5260B');
  createLineChart(activityInfo, id, dateString, "flightsOfStairs", userStorage, weeklyFlightsClimbed, "weekly flights climbed", "#BAD50B");
}

function createBarChart(activityInfo, id, dateString, property, userStorage, element, chartLabel) {
  chart.createDoubleDataBarChart(activityInfo.calculateDailyData(id, dateString, property),
    activityInfo.getAllUserAverageForDay(dateString, userStorage, property), element, chartLabel);
}

function createLineChart(activityInfo, id, dateString, property, userStorage, element, chartLabel, color) {
  chart.makeChart(activityInfo.calculateWeeklyData(dateString, id, userStorage, property),
    element, chartLabel, color);
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