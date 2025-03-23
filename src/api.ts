export interface Quote {
  quote: string
  author: string
  category: string
}

export const fetchQuote = async (): Promise<Quote | null> => {
  const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
    headers: { 'X-Api-Key': 'sRaUsQgozOBEx32l1n9L9A==KD3PFJweTgTDuy1E' },
  })
  if (!response.ok) return null
  const quote = (await response.json()) as Quote[]
  return quote[0]
}
