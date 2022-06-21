import React, { useEffect, useState } from 'react'
import Main from '../Main/Main'
import { RouteComponentProps } from '@reach/router'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import userManager from '../../auth/userManager'
import { Backdrop, CircularProgress } from '@material-ui/core'
import VerticalNav from '../VerticalNav/VerticalNav'
import Routes from '../../Routes'
import { getAllAgencies } from '../../actions/agenciesActions'
import { getAllPersons } from '../../actions/personsActions'


const Layout = (_props: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const { user, isLoadingUser } = useSelector((state: RootState) => state.oidc)

  useEffect(() => {
    if (!isLoadingUser && !user) {
      // Clear userManager state and redirecting to SSO
      userManager.clearStaleState().then(() => userManager.signinRedirect())
    } else if (user && !user.expired) {
      // Fetch agencies when user access app
      // TODO fetch user instead with sth like /profile see https://jira.groupe-creative.fr/browse/MCE-66
      dispatch(getAllPersons())
      dispatch(getAllAgencies())
    }
  }, [user, isLoadingUser, dispatch])

  const [drawerOpen, setDrawerOpen] = useState<boolean>(true)
  return (  (isLoadingUser || !user)) ? (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  ) : (
    <div className="flex flex-row relative m-0 p-0 h-screen w-screen overflow-hidden bg-primary-light-bg">
      <VerticalNav open={drawerOpen} setOpen={setDrawerOpen} />
      <Main>
        <Routes />
      </Main>
      {/*<Footer/>*/}
    </div>
  )
}

export default Layout
