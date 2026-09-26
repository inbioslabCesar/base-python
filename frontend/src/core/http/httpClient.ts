import { env } from '@/core/config/env'

export class HttpClient {
  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${env.apiUrl}${path}`)
    return this.handleResponse<T>(response)
  }

  async post<T>(path: string, payload: unknown): Promise<T> {
    const response = await fetch(`${env.apiUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    return this.handleResponse<T>(response)
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const body = await response.text()
      throw new Error(body || `Request failed with status ${response.status}`)
    }

    return (await response.json()) as T
  }
}
