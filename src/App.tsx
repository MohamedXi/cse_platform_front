import React from 'react'
import theme from './styles/theme'
import './App.scss'
import { Router } from '@reach/router'
import { Provider } from 'react-redux'
import { store } from './store'
import Layout from './components/Layout/Layout'
import { OidcProvider } from 'redux-oidc'
import userManager from './auth/userManager'
import LoginRedirect from './pages/LoginRedirect'
import { ModalProvider } from './context/Modal'
import { GlobalProvider } from './context/Global'
import { ThemeProvider } from '@material-ui/core'

function App() {
  return (
    <Provider store={store}>
      <OidcProvider store={store} userManager={userManager}>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <GlobalProvider>
              <Router>
                <Layout path="/*" />
                <LoginRedirect path="/login_redirect" userManager={userManager} />
              </Router>
            </GlobalProvider>
          </ModalProvider>
        </ThemeProvider>
      </OidcProvider>
    </Provider>
  )
}

export default App
