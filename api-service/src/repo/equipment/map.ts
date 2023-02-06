import { MapToEquipment } from 'types/equipment'

export const mapEquipment: MapToEquipment = function (list) {
return  {
      id: list.id,
      eventId: list.eventid,
      gender: list.gender,
      age: Number(list.age),
      value: Number(list.value),
      unit: list.unit,
      event: list.eventid?{
        id: list.eventid,
        name: list.eventname
      }:{}
    }       
  }
