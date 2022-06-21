import React, { useEffect } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { RootState, useAppDispatch } from '../../store'
import { getOnGoingRentalsByAgency } from '../../actions/rentalsActions'
import { getItemsByAgency } from '../../actions/itemsActions'
import { useSelector } from 'react-redux'
import { agenciesAlreadyLoadedSelector, agenciesLoadingSelector, AgencyByNameSelector } from '../../selectors/agencies'
import { getAllPersons } from '../../actions/personsActions'
import {
  rentalsSubresourcesLoadingSelector,
  getOnGoingCompoundedRentalsByAgency,
} from '../../selectors/rentals'
import { getAllItemTypes } from '../../actions/itemTypesActions'
import { getAllTags } from '../../actions/tagsActions'
import { GetCurrentPerson } from '../../utils/person'
import ItemCardRental from '../ItemCardRental/ItemCardRental'
import ItemCardRentalSkeleton from '../ItemCardRental/ItemCardRentalSkeleton'

//Styleq
import './styles/myRental.scss'
import Carousel from '../Carousel/Carousel'

const useCarouselStyles = makeStyles((_theme) => ({
  root: {
    width: '86.6%',
    marginRight: '0px',
    marginLeft: '25px',
  },
}))

const MyRental = () => {
  const { user } = useSelector((state: RootState) => state.oidc)
  const dispatch = useAppDispatch()
  const currentUser = GetCurrentPerson()
  const agenciesLoading = useSelector(agenciesLoadingSelector)
  const rentalsSubLoading = useSelector(rentalsSubresourcesLoadingSelector)
  const agenciesAlreadyLoaded = useSelector(agenciesAlreadyLoadedSelector)
  const userAgency = useSelector(AgencyByNameSelector(user?.profile.office))
  const compoundedRentals = useSelector((state: RootState) =>
    getOnGoingCompoundedRentalsByAgency(state, userAgency?.id).filter((r) => r.user === currentUser).filter(r=>!r.restitutionBy &&  !r.endDate),
  )
  const carouselClasses = useCarouselStyles()
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

  const fakeItems = ['', '', '']

  return (
    <div
      className="flex flex-row overflow-y-hidden horizontal-scroll-nobar myRental mt-2
    "
    >
      {rentalsSubLoading ? (
        <div className="ml-4 flex flex-row pb-2">
          {fakeItems.map((s, i) => (
            <ItemCardRentalSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      ) : compoundedRentals.length ? (
        <Carousel
          className={carouselClasses.root}
          infinite={false}
          slidesToShow={1}
          slidesToScroll={1}
          initialSlide={0}
          variableWidth={true}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {compoundedRentals.map((item) => (
            <ItemCardRental item={item} key={`item-${item.id}`} />
          ))}
        </Carousel>
      ) : (
        <Typography variant="subtitle2" className="py-10">
          Aucun objet loué
        </Typography>
      )}
    </div>
  )
}

export default MyRental
