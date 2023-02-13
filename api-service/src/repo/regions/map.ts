import { MapToRegion } from 'types/region'

export const mapToRegion: MapToRegion = function (row) {
  return {
    id: row.region_id,
    fullName: row.region_fullname,
    abbreviation: row.region_abbreviation
  }
}
