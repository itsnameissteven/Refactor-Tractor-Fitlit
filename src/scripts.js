import './css/index.scss';
// import './images/person walking on path.jpg';
import './images/The Rock.jpg';
import './images/walk.svg';
import './images/water.svg';
import './images/sleep.svg';
import './images/remove.svg';
import './images/check.svg';
import './images/warning.svg';
import './images/hamburger.svg';
import "./images/daily.svg";
import "./images/calendar.svg";
import "./images/user.svg"

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

let formSuccessNotification = document.querySelector('#successNotification');
let formErrorNotification = document.querySelector('#failureNotification');

let userRepo;
let userNow;
let today;

window.addEventListener("mouseover", showDropDown)
window.addEventListener('load', getFetchedUsers);
hydrationButton.addEventListener('click', showHydrationForm);
sleepButton.addEventListener('click', showSleepForm);
activityButton.addEventListener('click', showActivityForm);
submitButton.addEventListener('click', submitForm);
xButton.addEventListener('click', hideAllForms);
baseForm.addEventListener("keydown", preventInvalidKeys);

function preventInvalidKeys (event) {
  var invalidCharacters = ["e", "+", "-"];
  if (invalidCharacters.includes(event.key)) {
    event.preventDefault();
  }
}


function showDropDown(event) {
  const navContainer = document.getElementById('navButtonContainer')
  event.target.className.includes("drop-down") ? navContainer.classList.add('show') :
    navContainer.classList.remove('show')
}


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
  baseForm.reset()
  submitButton.classList.remove("disable")
  unBlur(mainBody);
  const elements = [baseForm, hydrationForm,sleepForm, activityForm, 
    formSuccessNotification, formErrorNotification];
  elements.forEach(element => hideElement(element));
  // hideElement(baseForm);
  // hideElement(hydrationForm);
  // hideElement(sleepForm);
  // hideElement(activityForm);
  // hideElement(formSuccessNotification);
  // hideElement(formErrorNotification);
}

function handlePostRequest(link, body) {
  fetchAPIData.addNewData(link, body)
    .then(() => handlePostSucess())
}
function handlePostSucess() {
  getFetchedLifeData();
}

function grabHydrationInput(user) {
  const enteredHydrationInfo = {};
  enteredHydrationInfo.userID = userNow.id;
  enteredHydrationInfo.date = formHydrationDate.value.replace(/-/g, '/');
  enteredHydrationInfo.numOunces = parseInt(formHydrationOz.value);
  checkForCompletion("http://localhost:3001/api/v1/hydration", enteredHydrationInfo);
}



function grabSleepInput(user) {
  const enteredSleepInfo = {};
  enteredSleepInfo.userID = userNow.id;
  enteredSleepInfo.date = formSleepDate.value.replace(/-/g, '/');;
  enteredSleepInfo.hoursSlept = parseInt(formSleepHours.value);
  if(parseInt(formSleepQuality.value) > 5) {
    
    formSleepQuality.value = 5
  }
  enteredSleepInfo.sleepQuality = parseInt(formSleepQuality.value);
  checkForCompletion("http://localhost:3001/api/v1/sleep", enteredSleepInfo);
}

function grabActivityInput(user) {
  const enteredActivityInfo = {};
  enteredActivityInfo.userID = userNow.id;
  enteredActivityInfo.date = formActivityDate.value.replace(/-/g, '/');;
  enteredActivityInfo.numSteps = parseInt(formActivitySteps.value);
  enteredActivityInfo.minutesActive = parseInt(formActivityMin.value);
  enteredActivityInfo.flightsOfStairs = parseInt(formActivityFlights.value);
  checkForCompletion("http://localhost:3001/api/v1/activity", enteredActivityInfo);
}

function checkForCompletion(url, composedObject) {
  const values = Object.values(composedObject);
  today = composedObject.date
  if (values.includes("" || NaN)) {
    showElement(formErrorNotification);
    hideElement(formSuccessNotification);

  } else {
    submitButton.classList.add('disable');
    handlePostRequest(url, composedObject);
    showElement(formSuccessNotification);
    hideElement(formErrorNotification);
    setTimeout(hideAllForms, 1500);
  }
}

function submitForm(event) {
  event.preventDefault(event)
  if (document.getElementById("submit").value === "hydration") {
    grabHydrationInput();
  } else if (document.getElementById("submit").value === "sleep") {
    grabSleepInput();
  } else if (document.getElementById("submit").value === "activity") {
    grabActivityInput();
  }
}

function getFetchedUsers() {
  fetchAPIData.fetchUserData()
    .then(data => createRandomUser(data))
}

function createRandomUser(userData) {
  let userList = [];
  makeUsers(userList, userData);
  userRepo = new UserRepo(userList);
  const userNowId = pickUser();
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
  today = makeToday(userRepo, userNow.id, hydrationRepo.dataSet);
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
  return Math.floor((Math.random() * 50) + 1);
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
  document.getElementById('friendList').innerHTML = ""
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
  return user.getFriendsNames(userStorage).map(friendName => `<li class='my-friends'>${friendName}</li>`).join('');
}

function makeWinnerID(activityInfo, user, dateString, userStorage) {
  return activityInfo.getWinnerId(user, dateString, userStorage)
}

function makeToday(userStorage, id, dataSet) {
  const sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  if (today === undefined) {
    return sortedArray[0].date;
  } else {
    return today
  }
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
  sleepToday.innerText = `${sleepInfo.calculateDailyData(userNow.id, dateString, "hoursSlept")}hrs`;
  sleepQualityToday.innerText = `${sleepInfo.calculateDailyData(userNow.id, dateString, "sleepQuality")}/5`;
  avUserSleepQuality.innerText = `${Math.round(sleepInfo.calculateAllUserSleepQuality() * 100) / 100}/5`;
  chart.makeChart(sleepInfo.calculateWeeklyData(dateString, userNow.id, userRepo, "hoursSlept"), sleepChart, "Hours of Sleep", '#0BBBD6');
  chart.makeChart(sleepInfo.calculateWeeklyData(dateString, userNow.id, userRepo, "sleepQuality"), sleepChartQuality, "Quality of Sleep", '#8B0BD5')
}

function addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
  const stepChart = document.getElementById("stepChart");
  const flightsOfStairsChart = document.getElementById("flightsOfStairsChart");
  const activeMinutesChart = document.getElementById('activeMinutesChart');
  createBarChart(activityInfo, id, today, "numSteps", userStorage, stepChart, "Steps Today");
  createBarChart(activityInfo, id, today, "flightsOfStairs", userStorage, flightsOfStairsChart, "Flights Climbed Today");
  createBarChart(activityInfo, id, today, "minutesActive", userStorage, activeMinutesChart, "Active Minutes Today");
  // console.log(dateString, "TEEEEESSST")
  const weeklySteps = document.getElementById("weeklySteps");
  const weeklyMinutesActive = document.getElementById('weeklyMinutesActive');
  const weeklyFlightsClimbed = document.getElementById('weeklyFlightsClimbed');
  
  createLineChart(activityInfo, id, today, "numSteps", userStorage, weeklySteps, "weekly steps", '#260BD5');
  createLineChart(activityInfo, id, today, "minutesActive", userStorage, weeklyMinutesActive, "weekly minutes active", '#D5260B');
  createLineChart(activityInfo, id, today, "flightsOfStairs", userStorage, weeklyFlightsClimbed, "weekly flights climbed", "#BAD50B");
}

function createBarChart(activityInfo, id, dateString, property, userStorage, element, chartLabel) {
  chart.createDoubleDataBarChart(activityInfo.calculateDailyData(id, dateString, property),
    activityInfo.getAllUserAverageForDay(dateString, userStorage, property), element, chartLabel);
}

function createLineChart(activityInfo, id, dateString, property, userStorage, element, chartLabel, color) {
  // console.log(activityInfo, "asdfawooooork")
  // console.log(activityInfo.calculateWeeklyData(dateString, id, userStorage, property))
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