import FetchAPI from './fetch'
import { endpoints } from '../../consts/endpoints'
import { ApiResource, Rental, TimeStampable } from '../../types/entities'
import { RentalDto, PostRental,CollectedRental,RestitutedRental,WithId } from '../../types/dtos'
import apiResponseToResource from '../adapters/apiResponseToResource'
import { format } from 'date-fns'
import { rentalToDto } from '../../helpers/adapters/rentalDTO'

export const getRentals = (): Promise<ApiResource<RentalDto[]>> =>
  FetchAPI.get<RentalDto[]>(endpoints.rentals).then(apiResponseToResource)

export const getOnGoingRentalsByAgency = (agencyId: string): Promise<ApiResource<RentalDto[]>> => {
  const now = format(new Date(), 'Y-M-d')
  const uri = `${endpoints.rentals}?agency=${agencyId}&dueDate[after]=${now}`

  return FetchAPI.get<RentalDto[]>(uri).then(apiResponseToResource)
}

export const postRental = (rental: PostRental): Promise<ApiResource<RentalDto>> => {
  // Provide fake Timestampable data to Adapter but remove them before post
  const fakeTimeStampable: TimeStampable = {
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  const rentalModel = { id: '', ...fakeTimeStampable, ...rental } as Rental
  const { id, createdAt, updatedAt, ...rentalToPost } = rentalToDto(rentalModel)
  return FetchAPI.post<RentalDto, PostRental>(endpoints.rentals, rentalToPost).then(apiResponseToResource)
}

export const updateRentalRequest = (rental: CollectedRental| RestitutedRental): Promise<ApiResource<RentalDto>> => {
    const {id,...rentalWithoutId}=rental
    return FetchAPI.put<RentalDto, Omit<CollectedRental| RestitutedRental, 'id'>>(`${endpoints.rentals}/${id}`, rentalWithoutId).then(apiResponseToResource)
}

export const deleteRental = (rentalWithId: WithId): Promise<void> => FetchAPI.delete(`${endpoints.rentals}/${rentalWithId.id}`)
