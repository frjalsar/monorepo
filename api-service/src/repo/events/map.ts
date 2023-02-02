
import { MapToEvent } from 'types/event'

export const mapToEvent: MapToEvent = function (row) {  
  return {
    id: row.id,
    name: row.name,
    iaaf: row.iaaf,
    typeId: row.typeid,
    childeventid:row.childeventid,
    type: row.typeid? {
      id: row.typeid,
      name: row.typename
    }:{},

    childEvents: row.childeventid ? [ {
      id: row.childeventid,
      name: row.childeventname
    } ]: undefined


  }
}

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
