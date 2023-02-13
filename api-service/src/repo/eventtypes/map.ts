import { MapToEventType } from 'types/eventtype'

export const mapEventTypes: MapToEventType = function (row) {
  return {
    id: row.id,
    name: row.name,
    ordering: row.ordering
  }
}
