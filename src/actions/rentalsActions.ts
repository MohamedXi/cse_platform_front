import { createAsyncThunk } from '@reduxjs/toolkit'
import { Rental } from '../types/entities'
import {
  getRentals,
  getOnGoingRentalsByAgency as getOnGoingRentalsByAgencyAPI,
  postRental,
  updateRentalRequest,
  deleteRental
} from '../helpers/api/rentals'
import { dtosToRentals, dtoToRental } from '../helpers/adapters/rentalDTO'
import { PostRental, CollectedRental, RestitutedRental,WithId } from '../types/dtos'

export enum rentalsActions {
  GET_ALL = 'GET_ALL_RENTALS',
  GET_ONGOING = 'GET_ONGOING_RENTALS',
  ADD_RENTAL = 'ADD_RENTAL',
  UPDATE = 'UPDATE_RENTAL',
  DELETE= 'DELETE_RENTAL'
}

export const unwrapRental = (rentalResult: { rental: Rental }) => ({ ...rentalResult.rental })

export const getAllRentals = createAsyncThunk(
  rentalsActions.GET_ALL,
  async (): Promise<{ rentals: Rental[] }> =>
    getRentals().then((rentalsResource) => ({
      rentals: dtosToRentals(rentalsResource.payload),
    })),
)

export const getOnGoingRentalsByAgency = createAsyncThunk(
  rentalsActions.GET_ONGOING,
  async (agencyId: string): Promise<{ rentals: Rental[] }> =>
    getOnGoingRentalsByAgencyAPI(agencyId).then((rentalsResource) => {
      return {
        rentals: dtosToRentals(rentalsResource.payload),
      }
    }),
)

export const addRental = createAsyncThunk(
  rentalsActions.ADD_RENTAL,
  async (rental: PostRental): Promise<{ rental: Rental }> =>
    postRental(rental).then((rentalsResource) => ({
      rental: dtoToRental(rentalsResource.payload),
    })),
)

export const updateRental = createAsyncThunk(
  rentalsActions.UPDATE,  
  async (rental:CollectedRental| RestitutedRental ): Promise<{ rental: Rental }> =>
  updateRentalRequest(rental).then((rentalsResource) => ({
    rental: dtoToRental(rentalsResource.payload),
    })),
)

export const deleteOneRental = createAsyncThunk(
  rentalsActions.DELETE,
  async (rentalWithId: WithId): Promise<{ id: string }> =>
  deleteRental(rentalWithId).then(() => ({
      id: rentalWithId.id,
    })),
)

