import { ReactElement, FC, ElementType } from 'react'
import { RouteComponentProps, Redirect } from '@reach/router'

// Auth
import hasRoles from '../auth/hasRoles'

// Enums
import { Roles } from '../consts/roles'

type ProtectedRouteProps = {
  roles: Array<Roles>
  component: ElementType
} & RouteComponentProps

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  component: Component,
  ...props
}: ProtectedRouteProps): ReactElement => {
  return hasRoles(props.roles) ? <Component {...props} /> : <Redirect from={props.path} to="/" noThrow />
}

export default ProtectedRoute
