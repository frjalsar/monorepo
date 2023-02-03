function mapEvents (list) {
  let currentId
  const result = []
  list.forEach(item => {
    if (item.id !== currentId) {
      const eventObj = {
        id: item.id,
        name: item.name,
        iaaf: item.iaaf,
        typeId: item.typeid,
        type: {},
        childEvents: item.childeventid ? [] : undefined
      }

      result.push(eventObj)
      currentId = item.id
    }

    const currentEvent = result[result.length - 1]

    if (item.childeventid) {
      const childEvent = {
        id: item.childeventid,
        name: item.childeventname
      }

      currentEvent.childEvents.push(childEvent)
    }

    if (item.typeid !== null) {
      currentEvent.type = {
        id: item.typeid,
        name: item.typename
      }
    }
  })

  return result
}

module.exports = mapEvents
/*
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
*/