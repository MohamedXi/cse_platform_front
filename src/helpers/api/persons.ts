import FetchAPI from './fetch'
import { endpoints } from '../../consts/endpoints'
import apiResponseToResource from '../adapters/apiResponseToResource'

// Types
import { ApiResource, Person } from '../../types/entities'
import { WithId, PostPersonRoles, PersonDto, PostPersonEmail, PostPersonPhone } from '../../types/dtos'

export const getPersons = (): Promise<ApiResource<Person[]>> =>
  FetchAPI.get<Person[]>(endpoints.persons).then(apiResponseToResource)

export const updatePerson = (person: PostPersonRoles & WithId): Promise<ApiResource<PersonDto>> =>
  FetchAPI.put<PersonDto, PostPersonRoles>(`${endpoints.persons}/${person.id}`, person).then(apiResponseToResource)

export const updateOnePerson = (person: PostPersonEmail & WithId): Promise<ApiResource<PersonDto>> =>
  FetchAPI.put<PersonDto, PostPersonEmail>(`${endpoints.persons}/${person.id}`, person).then(apiResponseToResource)

export const updateOnePersonPhone = (person: PostPersonPhone & WithId): Promise<ApiResource<PersonDto>> =>
  FetchAPI.put<PersonDto, PostPersonPhone>(`${endpoints.persons}/${person.id}`, person).then(apiResponseToResource)
