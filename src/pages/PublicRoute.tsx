import { ReactElement, FC, ElementType } from 'react'
import { RouteComponentProps } from '@reach/router'

type PublicRouteProps = {
  component: ElementType
} & RouteComponentProps

const PublicRoute: FC<PublicRouteProps> = ({ component: Component, ...props }: PublicRouteProps): ReactElement => (
  <Component {...props} />
)

export default PublicRoute
