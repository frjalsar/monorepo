function mapEventTypes (list) {
  return list.map(item => {
    return {
      id: item.id,
      name: item.name
    }
  })
}

module.exports = mapEventTypes
