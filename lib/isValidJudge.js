const isValidJudge = function (date) {  
  const today = new Date()
  const years = today.getFullYear() - date.getFullYear()
  if (years <= 5) {
    const months = today.getMonth() - date.getMonth()
    if (months <= 0)
    {
      const days = today.getDate() - date.getDate()
      return days <= 0
    }
  }

  return false  
}

module.exports = isValidJudge