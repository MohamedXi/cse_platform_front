/* eslint-disable import/no-anonymous-default-export */
// Redux
import { RootState } from '../store'
import { useSelector } from 'react-redux'

// Types
import { Role } from '../types/entities';

/**
 * To check if the user roles correspond to the required roles
 */
export default (roles: Array<Role>): boolean => {
  const { user } = useSelector((state: RootState) => state.oidc)
  if (roles.length && (!user || !Array.isArray(user.profile.roles))) {
    return false
  }
  return roles.some((role: Role) => user?.profile.roles.includes(role))
}
