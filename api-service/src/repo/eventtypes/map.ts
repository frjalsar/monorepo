import { MapToEventType } from "types/event-type"

export const mapEventTypes:MapToEventType= function (row) {
    return {
      id: row.id,
      name: row.name,
      ordering: row.ordering
    }
  
}

