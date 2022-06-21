interface RuntimeConfig {
  NODE_ENV: string
  REACT_APP_VERSION: string
  REACT_APP_NAME: string
  REACT_APP_BASE_URI: string
  REACT_APP_SERVER_BASE_URI: string
  REACT_APP_API_PREFIX: string
  REACT_APP_IMAGE_BASE_URI: string
  REACT_APP_AUTH_AUTHORITY: string
  REACT_APP_AUTH_CLIENT_ID: string
  REACT_APP_AUTH_SCOPE: 'openid profile email'
}

declare global {
  interface Window {
    runConfig: RuntimeConfig
  }
}

export default {}
