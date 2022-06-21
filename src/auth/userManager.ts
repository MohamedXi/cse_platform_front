import { createUserManager } from 'redux-oidc'
import { UserManagerSettings } from 'oidc-client'

const userManagerConfig: UserManagerSettings = {
  // Client config
  authority: window['runConfig'].REACT_APP_AUTH_AUTHORITY,
  client_id: window['runConfig'].REACT_APP_AUTH_CLIENT_ID,
  scope: window['runConfig'].REACT_APP_AUTH_SCOPE,
  redirect_uri: `${window['runConfig'].REACT_APP_BASE_URI}/login_redirect`,
  post_logout_redirect_uri: `${window['runConfig'].REACT_APP_BASE_URI}`,
  // Session management
  response_type: 'code',
  revokeAccessTokenOnSignout: true,
  automaticSilentRenew: true,
  silentRequestTimeout: 10000,
}

const userManager = createUserManager(userManagerConfig)

export default userManager
