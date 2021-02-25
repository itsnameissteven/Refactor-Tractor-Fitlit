
// VIEW DATA
const fetchAPIData = {

  fetchUserData() {
    fetch("http://localhost:3001/api/v1/users")
      .then(response => response.json())
      .then(userData => {
        console.log(userData)
        return userData
      })
      .catch(err => console.log(err))
  },

  fetchSleepData() {
    fetch("http://localhost:3001/api/v1/sleep")
      .then(response => response.json())
      .then(sleepData => {
        // console.log(sleepData)
        return sleepData
      })
      .catch(err => console.log(err))
  },

  fetchActivityData() {
    fetch("http://localhost:3001/api/v1/activity")
      .then(response => response.json())
      .then(activityData => {
        // console.log(activityData)
        return activityData
      })
      .catch(err => console.log(err))
  },

  fetchHydrationData() {
    fetch("http://localhost:3001/api/v1/hydration")
      .then(response => response.json())
      .then(hydrationData => {
        // console.log(hydrationData)
        return hydrationData
      })
      .catch(err => console.log(err))
  }



  // return Promise.all([fetchedUserData, fetchedSleepData, fetchedActivityData, fetchedHydrationData])
  //   .then(data => {
  //     console.log(allAPIData);
  //     return allAPIData;
  //   })
}




// const fetchAPIData = () => {
//   fetchedUserData();
//   fetchedSleepData();
//   fetchedActivityData();
//   fetchedHydrationData();
// }

// ADD NEW DATA

// const addNewSleepData = (newData) => {
//   fetch("http://localhost:3001/api/v1/sleep", {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(newData)
//   })
//     .then(response => response.json())
//     .then(sleepData => console.log(sleepData))
//     .catch(err => console.log(err))
// }

// const addNewActivityData = (newData) => {
//   fetch("http://localhost:3001/api/v1/activity", {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(newData)
//   })
//     .then(response => response.json())
//     .then(activityData => console.log(activityData))
//     .catch(err => console.log(err))
// }

// const addNewHydrationData = (newData) => {
//   fetch("http://localhost:3001/api/v1/hydration", {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(newData)
//   })
//     .then(response => response.json())
//     .then(hydrationData => console.log(hydrationData))
//     .catch(err => console.log(err))
// }

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

export default fetchAPIData;