const fetchAPIData = {
  fetchUserData() {
    let userSet;
    let userData = fetch("https://refactor-tractor-fitlit.herokuapp.com/api/v1/users")
      .then(response => response.json())
      .then(data => data.userData)
      .catch(err => console.log(err))
    userSet = Promise.resolve(userData).then(data => {
      return data;
    })
    return userSet
  },

  fetchLifeData() {
    let dataSet;
    let sleepData = fetch("https://refactor-tractor-fitlit.herokuapp.com/api/v1/sleep")
      .then(response => response.json())
      .then(data => data.sleepData)
      .catch(err => console.log(err))
    let activityData = fetch("https://refactor-tractor-fitlit.herokuapp.com/api/v1/activity")
      .then(response => response.json())
      .then(data => data.activityData)
      .catch(err => console.log(err))
    let hydrationData = fetch("https://refactor-tractor-fitlit.herokuapp.com/api/v1/hydration")
      .then(response => response.json())
      .then(data => data.hydrationData)
      .catch(err => console.log(err))
    dataSet = Promise.all([sleepData, activityData, hydrationData]).then(data => {

      return data;
    })

    return dataSet;
  },

  addNewData(link, newData) {
    return fetch(link, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    })
      .then(response => response.json())
      .then(data => data)
      .catch(err => console.log(err))
  }
}
export default fetchAPIData;