function mapVenues (list) {
  return list.map(item => {
    return {
      id: item.id,
      fullName: item.fullname,
      indoor: item.indoor,
      banked: item.banked,
      straightLanes: Number(item.straightlanes),
      ovalLanes: Number(item.ovallanes),
      longTripleJump: Number(item.longtriplejump),
      polevault: Number(item.polevault),
      hammerDiscus: Number(item.hammerdiscus),
      javelin: Number(item.javelin),
      shotPut: Number(item.shotput),
      material: item.material,
      constructionYear: Number(item.constructionyear),
      renovationYear: Number(item.renovationyear),
      warmupTrack: item.warmuptrack,
      throwingField: item.throwingfield,
      certification: item.certification
    }
  })
}

module.exports = mapVenues
