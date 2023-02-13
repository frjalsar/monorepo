import { MapToEventType } from 'types/eventtype'

export const mapToEventType: MapToEventType = function (row) {
  return {
    id: row.eventtype_id,
    name: row.eventtype_name,
    ordering: row.eventtype_ordering
  }
}
