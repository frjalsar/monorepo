import { MapToEquipment } from 'types/equipment'
import { mapToEvent } from '../events/map'

export const mapToEquipment: MapToEquipment = function (row) {
  return {
    id: row.equipment_id,
    gender: row.equipment_gender,
    age: Number(row.equipment_age),
    value: Number(row.equipment_value),
    unit: row.equipment_unit,
    eventId: row.event_id,
    event: mapToEvent(row)
  }
}
