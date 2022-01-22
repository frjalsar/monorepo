function mapEvents (list) {
  return list.map(item => {
    return {
      id: item.id,
      strId: item.strid,
      name: item.name,
      iaaf: item.iaaf,
      worldRecord: item.worldrecord,
      typeId: item.typeid,
      type: {
        id: item.typeid,
        name: item.typename
      }
    }
  })
}

module.exports = mapEvents