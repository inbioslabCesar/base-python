const fallbackApiUrl = 'http://127.0.0.1:8000'

export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? fallbackApiUrl,
}
