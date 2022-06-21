import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAgencies, getAgency } from '../helpers/api/agencies'
import { Agency } from '../types/entities'
import { dtoToAgency } from '../helpers/adapters/agencyDTO'

export enum agenciesActions {
  GET_ALL = 'GET_ALL_AGENCIES',
  GET_ONE = 'GET_ONE_AGENCY',
}

export const getAllAgencies = createAsyncThunk(
  agenciesActions.GET_ALL,
  async (): Promise<{ agencies: Agency[] }> =>
    getAgencies().then((agenciesResource) => ({
      agencies: agenciesResource.payload,
    })),
)

export const getOneAgency = createAsyncThunk(
  agenciesActions.GET_ONE,
  async (id: string): Promise<{ agency: Agency }> =>
    getAgency(id).then((agencyResource) => ({
      agency: dtoToAgency(agencyResource.payload),
    })),
)
