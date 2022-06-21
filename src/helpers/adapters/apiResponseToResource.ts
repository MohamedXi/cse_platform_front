import { ApiCollectionResponse, ApiResource, ApiSingleResponse } from '../../types/entities'

function isCollection(object: any): object is ApiCollectionResponse<any> {
  return 'hydra:member' in object
}

function apiResponseToResource<T>(payload: ApiSingleResponse<T> | ApiCollectionResponse<T>): ApiResource<T> {
  let resource: ApiResource<T>

  const payloadAdapter = (member: any) => {
    let objet: { [key: string]: any } = {}

    if (Array.isArray(member)) {
      let data: Array<object> = []
      for (let i in member) {
        let objet: { [key: string]: any } = {}
        Object.keys(member[i]).forEach((k: string) => {
          if (!['@id', '@context', '@type'].includes(k)) {
            objet[k] = member[i][k]
          }
        })
        data.push(objet)
      }

      return data
    } else {
      Object.keys(member).forEach((k: string) => {
        if (!['@id', '@context', '@type'].includes(k)) {
          objet[k] = member[k]
        }
      })
      return objet
    }
  }

  if (isCollection(payload)) {
    resource = {
      meta: {},
      payload: payloadAdapter(payload['hydra:member']) as T,
    }
  } else {
    resource = {
      meta: {},
      payload: payloadAdapter(payload) as unknown as T,
    }
  }
  return resource
}

export default apiResponseToResource
