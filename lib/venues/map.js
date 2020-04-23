function mapVenues (list) {
  return list.map(item => {
    return {
      id: item.id,
      fullName: item.fullname,
      indoor: item.indoor,
      banked: item.banked,
      straightLanes: Number(item.straightlanes),
      ovalLanes: Number(item.ovallanes)
    }
  })
}

module.exports = mapVenues
