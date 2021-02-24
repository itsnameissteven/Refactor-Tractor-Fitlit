import { expect } from 'chai';

import Calculation from '../src/Calculation';
import Sleep from '../src/Sleep';
import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('Calculation', () => {
  let sleepData, sleep, calculation;


  beforeEach(function () {
    sleepData = [{
      "userID": 1,
      "date": "2017/06/15",
      "hoursSlept": 6.1,
      "sleepQuality": 2.2
    },
    {
      "userID": 2,
      "date": "2017/06/15",
      "hoursSlept": 7,
      "sleepQuality": 4.7
    },
    {
      "userID": 3,
      "date": "2017/06/15",
      "hoursSlept": 2,
      "sleepQuality": 3
    },
    {
      "userID": 4,
      "date": "2017/06/15",
      "hoursSlept": 5.4,
      "sleepQuality": 3
    },
    {
      "userID": 1,
      "date": "2018/07/15",
      "hoursSlept": 4.1,
      "sleepQuality": 3.6
    },
    {
      "userID": 2,
      "date": "2018/07/15",
      "hoursSlept": 9.6,
      "sleepQuality": 2.9
    },
    {
      "userID": 3,
      "date": "2018/07/15",
      "hoursSlept": 2,
      "sleepQuality": 3
    },
    {
      "userID": 4,
      "date": "2018/07/23",
      "hoursSlept": 8.1,
      "sleepQuality": 3.5
    },
    {
      "userID": 1,
      "date": "2019/05/30",
      "hoursSlept": 8.9,
      "sleepQuality": 2.2
    },
    {
      "userID": 2,
      "date": "2019/05/30",
      "hoursSlept": 4.4,
      "sleepQuality": 1.6
    },
    {
      "userID": 3,
      "date": "2019/05/30",
      "hoursSlept": 4,
      "sleepQuality": 1
    },
    {
      "userID": 4,
      "date": "2019/05/30",
      "hoursSlept": 8,
      "sleepQuality": 3.4
    }
    ];

    sleep = new Sleep(sleepData);
    calculation = new Calculation(sleepData);
  })


})