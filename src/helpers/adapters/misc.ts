import { endpoints } from '../../consts/endpoints'
import FetchAPI from '../api/fetch'

export const makeUri = (endpoint: endpoints, id?: string): string =>
  id ? `/${FetchAPI.API_PREFIX}/${endpoint}/${id}` : `/${FetchAPI.API_PREFIX}/${endpoint}/`
