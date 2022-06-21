import { Person } from '../../types/entities'
import { PersonDto } from '../../types/dtos'
import { makeUri } from './misc'
import { endpoints } from '../../consts/endpoints'

/**
 * From domain to API
 * @param person
 */
export const personToDto = (person: Person): PersonDto => ({
  ...person,
  agency: person.agency ? makeUri(endpoints.persons, person.agency) : '',
})

/**
 * From domain to API
 * @param persons
 */
export const personsToDtos = (persons: Person[]): PersonDto[] => persons.map(personToDto)

/**
 * From API to domain
 * @param person
 */
export const dtoToPerson = (person: PersonDto): Person => ({
  ...person,
  roles: person.roles,
  agency: person.agency ? person.agency.replace(makeUri(endpoints.agencies), '') : '',
})

/**
 * From API to domain
 * @param person
 */
export const dtoToOnePerson = (person: PersonDto): Person => ({
  ...person,
  email: person.email,
  phoneNumber: person.phoneNumber,
})

/**
 * From API to domain
 * @param persons
 */
export const dtosToPersons = (persons: PersonDto[]): Person[] => persons.map(dtoToPerson)
