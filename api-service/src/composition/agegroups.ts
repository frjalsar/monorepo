import { SelectAgeGroups } from 'types/agegroup'
import { makeSelectAgeGroups } from '../repo/agegroups/select'
import { makeAgeGroupsRoute } from '../routes/agegroups'

export function makeAgeGroups () {
  const selectAgeGroups: SelectAgeGroups = makeSelectAgeGroups()

  return makeAgeGroupsRoute(selectAgeGroups)
}
