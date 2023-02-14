import { MapToVenues } from 'types/venue'

export const mapToVenue: MapToVenues = function (item) {
  return {
    id: item.venue_venue_id,
    fullName: item.venue_fullname,
    indoor: item.venue_indoor,
    banked: item.venue_banked,
    straightLanes: item.venue_straightlanes ? Number(item.venue_straightlanes) : undefined,
    ovalLanes: item.venue_ovallanes ? Number(item.venue_ovallanes) : undefined,
    longTripleJump: item.venue_longtriplejump ? Number(item.venue_longtriplejump) : undefined,
    polevault: item.venue_longtriplejump ? Number(item.venue_polevault) : undefined,
    hammerDiscus: item.venue_hammerdiscus ? Number(item.venue_hammerdiscus) : undefined,
    javelin: item.venue_javelin ? Number(item.venue_javelin) : undefined,
    shotPut: item.venue_shotput ? Number(item.venue_shotput) : undefined,
    material: item.venue_material,
    constructionYear: item.venue_constructionyear ? Number(item.venue_constructionyear) : undefined,
    renovationYear: item.venue_renovationyear ? Number(item.venue_renovationyear) : undefined,
    warmupTrack: item.venue_warmuptrack,
    throwingField: item.venue_throwingfield,
    certification: item.venue_certification
  }
}
