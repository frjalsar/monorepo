import { mapToEventType } from "types/event-type"

export const mapEventTypes:mapToEventType= function (row) {
    return {
      id: row.id,
      name: row.name,
      ordering: row.ordering
    }
  
}

