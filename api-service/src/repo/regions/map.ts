import { MapToRegion } from 'types/region'

export const mapToRegion: MapToRegion = function (row) {  
  return {
    id: row.id,
    fullName: row.fullname,
    abbreviation: row.abbreviation,
  }
}
1