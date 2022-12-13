function makeAgeGroups () {
  const makeSelectAgeGroups = require('../repo/agegroups/select')  
  const makeAgeGroupsRoute = require('../routes/agegroups')
  
  const selectAgeGroups = makeSelectAgeGroups()
  

  return makeAgeGroupsRoute(selectAgeGroups)
}

module.exports = makeAgeGroups
