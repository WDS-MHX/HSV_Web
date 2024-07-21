export const shortenText = (text: string, wordLimit: number) => {
  const words: string[] = text.split(' ')
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...'
  }
  return text
}
