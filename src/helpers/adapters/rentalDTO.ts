import { Rental } from '../../types/entities'
import { RentalDto } from '../../types/dtos'
import { makeUri } from './misc'
import { endpoints } from '../../consts/endpoints'

/**
 * From domain to API
 * @param rental
 */
export const rentalToDto = (rental: Rental): RentalDto => ({
  ...rental,
  item: makeUri(endpoints.items, rental.item),
  user: makeUri(endpoints.persons, rental.user),
  //  giveBy: rental?.giveBy ? makeUri(endpoints.persons, rental.giveBy) : null,
  // restitutionBy: rental?.restitutionBy ? makeUri(endpoints.persons, rental.restitutionBy) : null,
})

/**
 * From domain to API
 * @param rentals
 */
export const rentalsToDtos = (rentals: Rental[]): RentalDto[] => rentals.map(rentalToDto)

/**
 * From API to domain
 * @param rental
 */
export const dtoToRental = (rental: RentalDto): Rental => {
  return {
    ...rental,
    item: rental.item.replace(makeUri(endpoints.items), ''),
    user: rental.user.replace(makeUri(endpoints.persons), ''),
    giveBy: rental?.giveBy ? rental.giveBy.replace(makeUri(endpoints.persons), '') : null,
    restitutionBy: rental?.restitutionBy ? rental.restitutionBy.replace(makeUri(endpoints.persons), '') : null,
    createdAt: new Date(rental.createdAt),
    updatedAt: new Date(rental.updatedAt),
    startDate: new Date(rental.startDate),
    dueDate: new Date(rental.dueDate),
    endDate: rental.endDate ? new Date(rental.endDate) : null,
    depositPaid: rental.depositPaid || null,
  }
}

/**
 * From API to domain
 * @param rentals
 */
export const dtosToRentals = (rentals: RentalDto[]): Rental[] => rentals.map(dtoToRental)
