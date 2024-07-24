export const formatISOtime = (isoTime: string) => {
  const date = new Date(isoTime)
  const year = date.getUTCFullYear()
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = date.getUTCDate().toString().padStart(2, '0')
  const readableDate = `${year}-${month}-${day}`
  return readableDate
}
