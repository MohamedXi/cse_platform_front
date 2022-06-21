import React from 'react'
import { UserManager } from 'oidc-client'
import { navigate, RouteComponentProps } from '@reach/router'
import { CallbackComponent } from 'redux-oidc'
import { Backdrop } from '@material-ui/core'

interface LoginWrapperProps {
  userManager: UserManager
}

function LoginRedirect({ userManager }: LoginWrapperProps & RouteComponentProps) {
  return (
    <CallbackComponent
      userManager={userManager}
      successCallback={() => navigate('/')}
      errorCallback={(error) => {
        console.error(error)
        navigate('/')
      }}
    >
      <Backdrop open={true} />
    </CallbackComponent>
  )
}

export default LoginRedirect
