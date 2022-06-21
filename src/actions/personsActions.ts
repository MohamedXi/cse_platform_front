import { createAsyncThunk } from '@reduxjs/toolkit'

// Helpers
import { getPersons, updateOnePersonPhone } from '../helpers/api/persons'
import { dtosToPersons, dtoToOnePerson, dtoToPerson } from '../helpers/adapters/personDTO'
import { updatePerson, updateOnePerson } from '../helpers/api/persons'

// Types
import { Person } from '../types/entities'
import { WithId, PostPersonRoles, PostPersonEmail, PostPersonPhone } from '../types/dtos'

export enum personsActions {
  GET_ALL = 'GET_ALL_PERSONS',
  UPDATE_ROLES = 'UPDATE_PERSON_ROLES',
  UPDATE_ONE_PERSON = 'UPDATE_ONE_PERSON',
  UPDATE_ONE_PERSON_PHONE = 'UPDATE_ONE_PERSON_PHONE',
}

export const unwrapPerson = (personResult: { person: Person }) => ({
  ...personResult.person,
})

export const getAllPersons = createAsyncThunk(
  personsActions.GET_ALL,
  async (): Promise<{ persons: Person[] }> =>
    getPersons().then((personsResource) => ({
      persons: dtosToPersons(personsResource.payload),
    })),
)

export const updatePersonRoles = createAsyncThunk(
  personsActions.UPDATE_ROLES,
  async (person: PostPersonRoles & WithId): Promise<{ person: Person }> =>
    updatePerson(person).then((personResource) => ({
      person: dtoToPerson(personResource.payload),
    })),
)

export const updatePersons = createAsyncThunk(
  personsActions.UPDATE_ONE_PERSON,
  async (person: PostPersonEmail & WithId): Promise<{ person: Person }> =>
    updateOnePerson(person).then((personResource) => ({
      person: dtoToOnePerson(personResource.payload),
    })),
)

export const updatePersonsPhone = createAsyncThunk(
  personsActions.UPDATE_ONE_PERSON_PHONE,
  async (person: PostPersonPhone & WithId): Promise<{ person: Person }> =>
    updateOnePersonPhone(person).then((personResource) => ({
      person: dtoToOnePerson(personResource.payload),
    })),
)
