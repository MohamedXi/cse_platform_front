import FetchAPI from './fetch'
import { endpoints } from '../../consts/endpoints'
import { ApiResource } from '../../types/entities'
import apiResponseToResource from '../adapters/apiResponseToResource'
import { AgencyDto } from '../../types/dtos'

export const getAgencies = (): Promise<ApiResource<AgencyDto[]>> =>
  FetchAPI.get<AgencyDto[]>(endpoints.agencies).then(apiResponseToResource)

export const getAgency = (id: string): Promise<ApiResource<AgencyDto>> =>
  FetchAPI.get<AgencyDto>(`${endpoints.agencies}/${id}`).then(apiResponseToResource)
