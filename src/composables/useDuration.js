export function monthsBetween(startStr, endStr) {
  const now = new Date()
  const start = new Date(startStr + '-01')
  const end = endStr === 'current' ? now : new Date(endStr + '-01')
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  return Math.max(0, months)
}

export function formatDuration(months) {
  if (months < 12) return months < 1 ? '<1 yr' : (months === 1 ? '1 mo' : months + ' mo')
  const yrs = Math.floor(months / 12)
  const mo = months % 12
  if (mo === 0) return yrs === 1 ? '1 yr' : yrs + ' yrs'
  return yrs + ' yr' + (yrs !== 1 ? 's' : '') + ' ' + mo + ' mo'
}
