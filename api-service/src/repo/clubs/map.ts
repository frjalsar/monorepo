import { MapToClub } from 'types/club'

export const mapToClub: MapToClub = function (row) {  
  return {
    id: row.id,
    fullName: row.fullname,
    abbreviation: row.abbreviation,
    shortName:row.shortName,
    thorId:row.thorId,
    regionId:row.regioId,
    region:row.region && {
      id: row.regionid,
      fullName: row.regionname,
      abbreviation: row.regionabbreviation
    },
  }
}