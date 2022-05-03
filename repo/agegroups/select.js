const makeSelectAgeGroups = function () {
  return () => {
    return Promise.resolve([
      {
        from: null,
        to: 7
      }, {
        from: 8,
        to: 8,
      }, {
        from: 9,
        to: 9,
      }, {
        from: 10,
        to: 10,
      }, {
        from: 11,
        to: 11,
      }, {
        from: 12,
        to: 12,
      }, {
        from: 13,
        to: 13,
      }, {
        from: 14,
        to: 14,
      }, {
        from: 15,
        to: 15,
      }, {
        from: 16,
        to: 17,
      }, {
        from: 18,
        to: 19,
      }, {
        from: 20,
        to: 22,
      }, {
        from: 23,
        to: null,
      }, {
        from: 30,
        to: 34,
      }, {
        from: 35,
        to: 39,
      }, {
        from: 40,
        to: 44,
      }, {
        from: 45,
        to: 49,
      }, {
        from: 50,
        to: 54,
      }, {
        from: 55,
        to: 59,
      }, {
        from: 60,
        to: 64,
      }, {
        from: 65,
        to: 69,
      }, {
        from: 70,
        to: 74,
      }, {
        from: 75,
        to: 79,
      }, {
        from: 80,
        to: 84,
      }, {
        from: 85,
        to: 89,
      }, {
        from: 90,
        to: 94,
      }, {
        from: 95,
        to: 99,
      }, {
        from: 100,
        to: null,
      },
    ])
  }  
}

module.exports = makeSelectAgeGroups