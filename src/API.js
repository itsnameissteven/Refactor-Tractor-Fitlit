// VIEW DATA
const fetchAPIData = {
  fetchUserData() {
    let userSet;
    let userData = fetch("http://localhost:3001/api/v1/users")
      .then(response => response.json())
      .then(data => data.userData)
      .catch(err => console.log(err))
    userSet = Promise.resolve(userData).then(data => {
      // console.log(userSet);
      return data;
    })
    return userSet
  },

  // fetchUserData() {
  //   let userSet;
  //   let userData = fetch("http://localhost:3001/api/v1/users")
  //     .then(response => response.json())
  //     .then(data => data.userData)
  //     .catch(err => console.log(err))
  //   userSet = Promise.resolve(userData).then(data => {
  //     // console.log(userSet);
  //     return data;
  //   })
  //   return userSet
  // },

  fetchLifeData() {
    let dataSet;
    let sleepData = fetch("http://localhost:3001/api/v1/sleep")
      .then(response => response.json())
      .then(data => data.sleepData)
      .catch(err => console.log(err))
    let activityData = fetch("http://localhost:3001/api/v1/activity")
      .then(response => response.json())
      .then(data => data.activityData)
      .catch(err => console.log(err))
    let hydrationData = fetch("http://localhost:3001/api/v1/hydration")
      .then(response => response.json())
      .then(data => data.hydrationData)
      .catch(err => console.log(err))
    dataSet = Promise.all([sleepData, activityData, hydrationData]).then(data => {
      // console.log(data[0]);
      return data;
    })
    // console.log(dataSet);
    return dataSet;
  }

  // return Promise.all([fetchedUserData, fetchedSleepData, fetchedActivityData, fetchedHydrationData])
  //   .then(data => {
  //     console.log(allAPIData);
  //     return allAPIData;
  //   })
}

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