
// VIEW DATA

const fetchedUserData = () => {
  fetch("http://localhost:3001/api/v1/users")
    .then(response => response.json())
    .then(userData => console.log(userData))
    .catch(err => console.log(err))
}

const fetchedSleepData = () => {
  fetch("http://localhost:3001/api/v1/sleep")
    .then(response => response.json())
    .then(sleepData => console.log(sleepData))
    .catch(err => console.log(err))
}

const fetchedActivityData = () => {
  fetch("http://localhost:3001/api/v1/activity")
    .then(response => response.json())
    .then(activityData => console.log(activityData))
    .catch(err => console.log(err))
}

const fetchedHydrationData = () => {
  fetch("http://localhost:3001/api/v1/hydration")
    .then(response => response.json())
    .then(hydrationData => console.log(hydrationData))
    .catch(err => console.log(err))
}

const fetchAllData = () => {
  fetchedUserData()
  fetchedSleepData()
  fetchedActivityData()
  fetchedHydrationData()
}

// ADD NEW DATA

const addNewSleepData = (newData) => {
  fetch("http://localhost:3001/api/v1/sleep", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newData)
  })
    .then(response => response.json())
    .then(sleepData => console.log(sleepData))
    .catch(err => console.log(err))
}

const addNewActivityData = (newData) => {
  fetch("http://localhost:3001/api/v1/activity", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newData)
  })
    .then(response => response.json())
    .then(activityData => console.log(activityData))
    .catch(err => console.log(err))
}

const addNewHydrationData = (newData) => {
  fetch("http://localhost:3001/api/v1/hydration", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newData)
  })
    .then(response => response.json())
    .then(hydrationData => console.log(hydrationData))
    .catch(err => console.log(err))
}

// ADD NEW DATA REFACTORED POSSIBILITY
// const addNewData = (link, newData) => {
//   fetch(link, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(newData)
//   })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(err => console.log(err))
// }

export default fetchAllData;