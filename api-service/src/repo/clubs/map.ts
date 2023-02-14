import { MapToClub, MapToClubPartial } from 'types/club'
import { mapToRegion } from '../regions/map'

export const mapToClub: MapToClub = function (row) {
  return {
    id: row.id,
    fullName: row.club_fullname,
    abbreviation: row.club_abbreviation,
    shortName: row.club_shortname,
    thorId: row.club_thorid,
    regionId: row.region_id,
    region: row.region_id ? mapToRegion(row) : undefined
  }
}

export const mapToClubPartial: MapToClubPartial = function (row) {
  return {
    id: row.id,
    fullName: row.club_fullname,
    thorId: row.club_thorid
  }
}
