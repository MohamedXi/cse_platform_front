import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Box, Tabs, Tab, Typography } from '@material-ui/core'
//Components
import EventLineSkeleton from './EventLineSkeleton'
import EventReturnsLine from './EventReturnsLine'

//Styles
import './styles/EventTabs.scss'

import { getAllPersons } from '../../actions/personsActions'
import { getAllItemTypes } from '../../actions/itemTypesActions'
import { getAllTags } from '../../actions/tagsActions'
import { useSelector } from 'react-redux'
import { GetCurrentPerson } from '../../utils'
import { RootState, useAppDispatch } from '../../store'
import { agenciesAlreadyLoadedSelector, agenciesLoadingSelector, AgencyByNameSelector } from '../../selectors/agencies'
import { getOnGoingCompoundedRentalsByAgency, rentalsSubresourcesLoadingSelector } from '../../selectors/rentals'
import { getItemsByAgency } from '../../actions/itemsActions'
import { getOnGoingRentalsByAgency } from '../../actions/rentalsActions'
import { isFuture, isToday } from 'date-fns'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
  className?: string
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, className, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={className}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const EventTabs = () => {
  const { user } = useSelector((state: RootState) => state.oidc)
  const dispatch = useAppDispatch()
  const currentUser = GetCurrentPerson()
  const agenciesLoading = useSelector(agenciesLoadingSelector)
  const rentalsSubLoading = useSelector(rentalsSubresourcesLoadingSelector)
  const agenciesAlreadyLoaded = useSelector(agenciesAlreadyLoadedSelector)
  const userAgency = useSelector(AgencyByNameSelector(user?.profile.office))
  const compoundedRentals = useSelector((state: RootState) =>
    getOnGoingCompoundedRentalsByAgency(state, userAgency?.id)
      .filter((r) => r.user === currentUser)
      .filter((r) => !r.restitutionBy && !r.endDate),
  )
  const restitutions = compoundedRentals.filter((v, index) => (isFuture(v.dueDate) || isToday(v.dueDate)) && v.giveBy)
  const collections = compoundedRentals.filter(
    (v, index) => (isFuture(v.startDate) || isToday(v.startDate)) && !v.giveBy,
  )

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

  const [value, setValue] = useState(0)

  const handlChangeTabs = (e: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const fakeLine = ['', '']

  return (
    <Box sx={{ width: '100%' }} className="event-tab">
      <Box>
        <Tabs
          value={value}
          onChange={handlChangeTabs}
          aria-label="Événements"
          className="header-tab"
          TabIndicatorProps={{
            style: {
              display: 'none',
            },
          }}
        >
          <Tab label="Restitution" {...a11yProps(0)} />
          <Tab label="Retrait" {...a11yProps(1)} />
        </Tabs>
      </Box>
      {rentalsSubLoading ? (
        <TabPanel value={value} index={0} className="tab-content">
          {fakeLine.map((s, i) => (
            <EventLineSkeleton key={`skeleton-${i}`} />
          ))}
        </TabPanel>
      ) : compoundedRentals.length > 0 ? (
        <>
          <TabPanel value={value} index={0} className="tab-content">
            {restitutions.length > 0 ? (
              restitutions.map((item) => <EventReturnsLine item={item} key={`line-${item.id}`} />)
            ) : (
              <Typography variant="subtitle2" className="py-10 tab-content-message">
                Vous n'avez pas de restitutions à venir
              </Typography>
            )}
          </TabPanel>
          <TabPanel value={value} index={1} className="tab-content">
            {collections.length > 0 ? (
              collections
                .filter((v, index) => (isFuture(v.startDate) || isToday(v.startDate)) && !v.giveBy)
                .map((item) => <EventReturnsLine item={item} key={`line-${item.id}`} />)
            ) : (
              <Typography variant="subtitle2" className="py-10 tab-content">
                Vous n'avez pas de retraits à venir
              </Typography>
            )}
          </TabPanel>
        </>
      ) : (
        <Typography variant="subtitle2" className="py-10 tab-content">
          Vous n'avez pas d'évènement à venir
        </Typography>
      )}
    </Box>
  )
}

export default EventTabs
