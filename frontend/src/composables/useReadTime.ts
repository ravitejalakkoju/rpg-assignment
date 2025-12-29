export function useReadTime() {
  function readTimeInMinutes(text: string, wpm = 200): number {
    const words = (text.trim().match(/\S+/g) || []).length
    return Math.max(1, Math.ceil(words / wpm))
  }

  return { readTimeInMinutes }
}
