export function makeInsertCompetitor(sqlConnection) {
  return () => {
    return Promise.resolve(true)
  }
}

