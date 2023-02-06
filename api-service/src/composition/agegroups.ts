import {makeSelectAgeGroups} from '../repo/agegroups/select'
import {makeAgeGroupsRoute} from '../routes/agegroups'
export function makeAgeGroups () {

  const selectAgeGroups = makeSelectAgeGroups()

  return makeAgeGroupsRoute(selectAgeGroups)
}

