import { ApiResponse, ApiSingleResponse } from '../../types/entities'

class FetchAPI {
  protected static GET = 'GET'
  protected static POST = 'POST'
  protected static PUT = 'PUT'
  protected static DELETE = 'DELETE'

  protected static SERVER_BASE_URI = window['runConfig'].REACT_APP_SERVER_BASE_URI
  public static API_PREFIX = window['runConfig'].REACT_APP_API_PREFIX

  private static makeInit(method: string, payload: any): RequestInit {
    const session = sessionStorage.getItem('oidc.user:https://sso.minds.k8s/auth/realms/creative:cse-platform')
    const headers: Headers = new Headers({
      Accept: 'application/ld+json',
      'Content-Type': 'application/json',
    })
    if (session) {
      const { access_token } = JSON.parse(session)
      headers.append('Authorization', `Bearer ${access_token}`)
    }
    return {
      headers,
      method,
      mode: 'cors',
      cache: 'default',
      body: payload ? JSON.stringify(payload) : null,
    }
  }

  private static async makeResponse<T>(uri: string, init: RequestInit): Promise<T> {
    const apiUri = `${FetchAPI.SERVER_BASE_URI}/${FetchAPI.API_PREFIX}`
    return await fetch(`${apiUri}/${uri}`, init).then((response: Response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      // 204 has no content, just return.
      if (response?.status === 204) {
        return
      }
      return response.json()
    })
  }

  public static async get<T>(uri: string): Promise<ApiResponse<T>> {
    return this.makeResponse<ApiResponse<T>>(uri, this.makeInit(this.GET, null))
  }

  public static async put<T, R>(uri: string, payload: R): Promise<ApiSingleResponse<T>> {
    return this.makeResponse<ApiSingleResponse<T>>(uri, this.makeInit(this.PUT, payload))
  }

  public static async post<T, R>(uri: string, payload: R): Promise<ApiSingleResponse<T>> {
    return this.makeResponse<ApiSingleResponse<T>>(uri, this.makeInit(this.POST, payload))
  }

  public static async delete(uri: string): Promise<void> {
    return this.makeResponse<void>(uri, this.makeInit(this.DELETE, null)).catch(console.warn)
  }
}

export default FetchAPI
