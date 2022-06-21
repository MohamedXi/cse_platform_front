// Types
import { Roles } from '../consts/roles'
import { Person } from '../types/entities'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { allPersonsSelector } from '../selectors/persons'

export const getTextByRole = (role: Roles): string => {
  switch (role) {
    case Roles.admin:
      return 'Administrateur'
    case Roles.collaborator:
      return 'Collaborateur'
    case Roles.storekeeper:
      return 'Magasinier'
    default:
      return ''
  }
}

export const GetCurrentPerson = (): Person | undefined => {
  const { user } = useSelector((state: RootState) => state.oidc)
  const persons = useSelector(allPersonsSelector)

  return persons.find((person) => person.username === user?.profile?.preferred_username ?? '')
}
