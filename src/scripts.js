import './css/index.scss';
import './images/The Rock.jpg';
import './images/walk.svg';
import './images/water.svg';
import './images/sleep.svg';
import './images/remove.svg';
import './images/check.svg';
import './images/warning.svg';
import './images/hamburger.svg';
import './images/daily.svg';
import './images/calendar.svg';
import './images/user.svg'

import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';
import chart from './dataChart.js'
import fetchAPIData from './API';

const hydrationButton = document.querySelector('#hydrationButton');
const sleepButton = document.querySelector('#sleepButton');
const activityButton = document.querySelector('#activityButton');
const mainBody = document.querySelector('.main');
const baseForm = document.querySelector('.add-information-form');
const hydrationForm = document.querySelector('.hydration-form');
const sleepForm = document.querySelector('.sleep-form');
const activityForm = document.querySelector('.activity-form');
const submitButton = document.getElementById('submit');
const xButton = document.querySelector('#remove');
const formSuccessNotification = document.querySelector('#successNotification');
const formErrorNotification = document.querySelector('#failureNotification');

let userRepo;
let userNow;
let today;

window.addEventListener('mouseover', showDropDown)
window.addEventListener('load', getFetchedUsers);
hydrationButton.addEventListener('click', showHydrationForm);
sleepButton.addEventListener('click', showSleepForm);
activityButton.addEventListener('click', showActivityForm);
submitButton.addEventListener('click', submitForm);
xButton.addEventListener('click', hideAllForms);
baseForm.addEventListener('keydown', preventInvalidKeys);

function preventInvalidKeys (event) {
  var invalidCharacters = ['e', '+', '-'];
  if (invalidCharacters.includes(event.key)) {
    event.preventDefault();
  }
}

function showDropDown(event) {
  const navContainer = document.getElementById('navButtonContainer')
  event.target.className.includes('drop-down') ? addClass(navContainer, 'show') 
   : removeClass(navContainer, 'show');
}

function addClass(element, className) {
  element.classList.add(className || 'hidden');
}

function removeClass(element, className) {
  element.classList.remove(className || 'hidden');
}

function showHideEntryForms(subForm, form2, form3) {
  removeClass(baseForm);
  removeClass(subForm);
  addClass(form2);
  addClass(form3);
}

function showHydrationForm() {
  addClass(mainBody, 'blur');
  submitButton.value = 'hydration';
  showHideEntryForms(hydrationForm, sleepForm, activityForm);
}

function showSleepForm() {
  addClass(mainBody, 'blur');
  submitButton.value = 'sleep';
  showHideEntryForms(sleepForm, hydrationForm, activityForm);
}

function showActivityForm() {
  addClass(mainBody, 'blur');
  submitButton.value = 'activity';
  showHideEntryForms(activityForm, sleepForm, hydrationForm);
}

function hideAllForms() {
  baseForm.reset()
  removeClass(submitButton, 'disable')
  removeClass(mainBody, 'blur')
  const elements = [baseForm, hydrationForm, sleepForm, activityForm, 
    formSuccessNotification, formErrorNotification];
  elements.forEach(addClass);
}

function handlePostRequest(link, body) {
  fetchAPIData.addNewData(link, body)
    .then(() => handlePostSucess())
}

function handlePostSucess() {
  getFetchedLifeData();
}

function grabHydrationInput() {
  const formHydrationDate = document.querySelector('#hydrationDate');
  const formHydrationOz = document.querySelector('#hydrationOz');
  const enteredHydrationInfo = {};
  enteredHydrationInfo.userID = userNow.id;
  enteredHydrationInfo.date = formHydrationDate.value.replace(/-/g, '/');
  enteredHydrationInfo.numOunces = parseInt(formHydrationOz.value);
  checkForCompletion('https://refactor-tractor-fitlit.herokuapp.com/api/v1/hydration', enteredHydrationInfo);
}

function grabSleepInput() {
  const formSleepDate = document.querySelector('#sleepDate');
  const formSleepHours = document.querySelector('#sleepHours');
  const formSleepQuality = document.querySelector('#sleepQuality');
  const enteredSleepInfo = {};
  enteredSleepInfo.userID = userNow.id;
  enteredSleepInfo.date = formSleepDate.value.replace(/-/g, '/');
  if (parseInt(formSleepQuality.value) > 5) {
    formSleepQuality.value = 5;
  }
  if (parseInt(formSleepHours.value) > 24) {
    formSleepHours.value = 24; 
  }
  
  enteredSleepInfo.hoursSlept = parseInt(formSleepHours.value);
  enteredSleepInfo.sleepQuality = parseInt(formSleepQuality.value);

  checkForCompletion('https://refactor-tractor-fitlit.herokuapp.com/api/v1/sleep', enteredSleepInfo);
}

function grabActivityInput() {
  const enteredActivityInfo = {};
  const formActivityDate = document.querySelector('#activityDate');
  const formActivitySteps = document.querySelector('#activitySteps');
  const formActivityMin = document.querySelector('#activityMin');
  const formActivityFlights = document.querySelector('#flights');
  enteredActivityInfo.userID = userNow.id;
  enteredActivityInfo.date = formActivityDate.value.replace(/-/g, '/');
  enteredActivityInfo.numSteps = parseInt(formActivitySteps.value);
  enteredActivityInfo.minutesActive = parseInt(formActivityMin.value);
  enteredActivityInfo.flightsOfStairs = parseInt(formActivityFlights.value);
  checkForCompletion('https://refactor-tractor-fitlit.herokuapp.com/api/v1/activity', enteredActivityInfo);
}

function checkForCompletion(url, composedObject) {
  const values = Object.values(composedObject);
  today = composedObject.date
  if (values.includes('' || NaN)) {
    removeClass(formErrorNotification);
    addClass(formSuccessNotification);
  } else {
    addClass(submitButton, 'disable');
    handlePostRequest(url, composedObject);
    removeClass(formSuccessNotification);
    addClass(formErrorNotification);
    setTimeout(hideAllForms, 1500);
  }
}

function submitForm(event) {
  event.preventDefault(event)
  if (submitButton.value === 'hydration') {
    grabHydrationInput();
  } else if (submitButton.value === 'sleep') {
    grabSleepInput();
  } else if (submitButton.value === 'activity') {
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
    const user = new User(dataItem);
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
  today = makeToday(userRepo, userNow.id, hydrationRepo.dataSet);
  startApp(sleepRepo, activityRepo, hydrationRepo, today)
}

function startApp(sleepRepo, activityRepo, hydrationRepo, today) {
  addInfoToSidebar(userNow, userRepo);
  addHydrationInfo(userNow.id, hydrationRepo, today, userRepo);
  addSleepInfo(sleepRepo);
  addWalkingStats(today, activityRepo);
  addActivityInfo(userNow.id, activityRepo, userRepo);
}

function pickUser() {
  return Math.floor((Math.random() * userRepo.users.length));
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
  document.getElementById('friendList').innerHTML = ''
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

function makeToday(userStorage, id, dataSet) {
  const sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  if (!today) {
    return sortedArray[0].date;
  } else {
    return today
  }
}

function addHydrationInfo(id, hydrationInfo, dateString, userStorage) {
  const hydrationToday = document.getElementById('hydrationToday');
  const hydroChart = document.getElementById('hydroChart');
  const hydrationAverageWeek = document.getElementById('hydrationAverageWeek');
  chart.makeChart(hydrationInfo.calculateFirstWeekOunces(userStorage, id), 
    hydroChart, 'Number of Ounces', '#D5260B');
  hydrationToday.innerText = `${hydrationInfo.calculateDailyData(id, dateString, 'numOunces')}oz`;
  hydrationAverageWeek.innerText = `${hydrationInfo.calculateAverageWater(userStorage, id)}oz`
}

function addSleepInfo(sleepInfo) {
  const sleepToday = document.getElementById('sleepToday');
  const sleepQualityToday = document.getElementById('sleepQualityToday');
  const avUserSleepQuality = document.getElementById('avUserSleepQuality');
  const sleepChart = document.getElementById('sleepChart');
  const sleepChartQuality = document.getElementById('sleepChartQuality');
  sleepToday.innerText = `${sleepInfo.calculateDailyData(userNow.id, today, 'hoursSlept')}hrs`;
  sleepQualityToday.innerText = `${sleepInfo.calculateDailyData(userNow.id, today, 'sleepQuality')}/5`;
  avUserSleepQuality.innerText = `${Math.round(sleepInfo.calculateAllUserSleepQuality() * 100) / 100}/5`;
  chart.makeChart(sleepInfo.calculateWeeklyData(today, userNow.id, userRepo, 'hoursSlept'), 
    sleepChart, 'Hours of Sleep', '#0BBBD6');
  chart.makeChart(sleepInfo.calculateWeeklyData(today, userNow.id, userRepo, 'sleepQuality'),
    sleepChartQuality, 'Quality of Sleep', '#8B0BD5');
}

function addActivityInfo(id, activityInfo, userStorage) {
  const stepChart = document.getElementById('stepChart');
  const flightsOfStairsChart = document.getElementById('flightsOfStairsChart');
  const activeMinutesChart = document.getElementById('activeMinutesChart');
  createBarChart(activityInfo, id, today, 'numSteps', userStorage, stepChart, 'Steps Today');
  createBarChart(activityInfo, id, today, 'flightsOfStairs', userStorage,
    flightsOfStairsChart, 'Flights Climbed Today');
  createBarChart(activityInfo, id, today, 'minutesActive', userStorage,
    activeMinutesChart, 'Active Minutes Today');
  const weeklySteps = document.getElementById('weeklySteps');
  const weeklyMinutesActive = document.getElementById('weeklyMinutesActive');
  const weeklyFlightsClimbed = document.getElementById('weeklyFlightsClimbed');
  createLineChart(activityInfo, id, today, 'numSteps', userStorage, weeklySteps,
    'weekly steps', '#260BD5');
  createLineChart(activityInfo, id, today, 'minutesActive', userStorage, weeklyMinutesActive,
    'weekly minutes active', '#D5260B');
  createLineChart(activityInfo, id, today, 'flightsOfStairs', userStorage, weeklyFlightsClimbed,
    'weekly flights climbed', '#BAD50B');
}

function createBarChart(activityInfo, id, dateString, property, userStorage, element, chartLabel) {
  chart.createDoubleDataBarChart(activityInfo.calculateDailyData(id, dateString, property),
    activityInfo.getAllUserAverageForDay(dateString, userStorage, property), element, chartLabel);
}

function createLineChart(activityInfo, id, dateString, property, userStorage, element, chartLabel, color) {
  chart.makeChart(activityInfo.calculateWeeklyData(dateString, id, userStorage, property),
    element, chartLabel, color);
}