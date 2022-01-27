function mapEventTypes (list) {
  return list.map(item => {
    return {
      id: item.id,
      name: item.name,
      ordering: item.ordering
    }
  })
}

module.exports = mapEventTypes
