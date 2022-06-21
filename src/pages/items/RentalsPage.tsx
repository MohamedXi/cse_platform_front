import React, { useEffect } from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import { Backdrop, CircularProgress, Typography } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos'
import { RootState, useAppDispatch } from '../../store'
import { getOnGoingRentalsByAgency } from '../../actions/rentalsActions'
import { getItemsByAgency } from '../../actions/itemsActions'
import { useSelector } from 'react-redux'
import { agenciesAlreadyLoadedSelector, agenciesLoadingSelector, AgencyByNameSelector } from '../../selectors/agencies'
import { getAllPersons } from '../../actions/personsActions'
import { getCompoundedRentalsByAgency, rentalsSubresourcesLoadingSelector } from '../../selectors/rentals'
import { getAllItemTypes } from '../../actions/itemTypesActions'
import { getAllTags } from '../../actions/tagsActions'
import RentalList from '../../components/RentalList/RentalList'

function RentalsPage(_props: RouteComponentProps) {
  const { user } = useSelector((state: RootState) => state.oidc)
  const agenciesLoading = useSelector(agenciesLoadingSelector)
  const rentalsSubLoading = useSelector(rentalsSubresourcesLoadingSelector)
  const agenciesAlreadyLoaded = useSelector(agenciesAlreadyLoadedSelector)
  const userAgency = useSelector(AgencyByNameSelector(user?.profile.office))
  const compoundedRentals = useSelector((state: RootState) => getCompoundedRentalsByAgency(state, userAgency?.id))
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Fetch rentals metaData
    dispatch(getAllPersons()) // TODO have a route to fetch only persons from agency
    dispatch(getAllItemTypes())
    dispatch(getAllTags())
  }, [dispatch])

  useEffect(() => {
    if (!agenciesLoading && agenciesAlreadyLoaded && userAgency) {
      dispatch(getItemsByAgency(userAgency.id)) // TODO replace with agencyId from profile
      dispatch(getOnGoingRentalsByAgency(userAgency.id)) // TODO replace with agencyId from profile
    }
  }, [agenciesLoading, agenciesAlreadyLoaded, userAgency, dispatch])

  return (
    <section className="h-full flex flex-col">
      <div className="flex flex-row">
        <div className="flex flex-col justify-center cursor-pointer" onClick={() => navigate('/')}>
          <ArrowBackIcon style={{ height: '14px' }} />
        </div>
        <Typography
          variant="h1"
          style={{
            fontSize: '1.5rem',
            letterSpacing: '2.2px',
            paddingLeft: 0,
          }}
        >
          Réservations
        </Typography>
      </div>
      {rentalsSubLoading ? (
        <Backdrop open={true}>
          <CircularProgress sx={{ color: 'white', opacity: '0.5' }} />
        </Backdrop>
      ) : (
        <RentalList rentals={compoundedRentals} />
      )}
    </section>
  )
}

export default RentalsPage
