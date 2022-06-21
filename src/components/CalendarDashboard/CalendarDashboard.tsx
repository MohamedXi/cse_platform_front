import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { GetCurrentPerson } from '../../utils/person'
import { addBusinessDays, addWeeks, endOfWeek, format, startOfWeek, subWeeks,  isSameDay, isFuture, isToday } from 'date-fns'
import { fr } from 'date-fns/locale'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { AgencyByNameSelector } from '../../selectors/agencies'
import {
  rentalsSubresourcesLoadingSelector,
  getOnGoingCompoundedRentalsByAgency,
} from '../../selectors/rentals'


//Styles
import './styles/CalendarDashboard.scss'
import DayCardsCalendar from './DayCardsCalendar'
import { Typography } from '@material-ui/core'

export interface CalendarDashboardProps {
  loading?:boolean,
  dates?:Date[]
}

const CalendarDashboard = ({loading,dates}:CalendarDashboardProps) => {
  const { user } = useSelector((state: RootState) => state.oidc)
  const [currentWeeksValue, setCurrentWeeksMonth] = useState<Date>(new Date())
  const currentUser = GetCurrentPerson()
  const rentalsSubLoading = useSelector(rentalsSubresourcesLoadingSelector)
  const userAgency = useSelector(AgencyByNameSelector(user?.profile.office))
  const compoundedRentals  = useSelector((state: RootState) =>getOnGoingCompoundedRentalsByAgency(state, userAgency?.id)).filter((r) => 
  r.user === currentUser).filter(r=>!r.restitutionBy &&  !r.endDate)

  const markedDates=compoundedRentals.reduce((dates,r)=> r.giveBy ? [...dates,r.dueDate] : [...dates,r.startDate ], [] as Date[])
                                     .filter(date=>isFuture(date) || isToday(date)) 

  const dateFormat: string = 'dd MMMM'
  const daysWorks: number = 10

  //Change two weeks per two weeks
  const next = () => {
    setCurrentWeeksMonth(addWeeks(currentWeeksValue, 2))
  }
  const prev = () => {
    setCurrentWeeksMonth(subWeeks(currentWeeksValue, 2))
  }

  //   Return the first day of this week
  const firstDayWeek = (date: Date) => {
    return startOfWeek(date, { weekStartsOn: 1 })
  }
  //Return the last day of the second week
  const lastDaySecondWeek = (date: Date) => {
    const lastDaySecondWeek = endOfWeek(addWeeks(date, 1), { weekStartsOn: 6 })
    return lastDaySecondWeek
  }

  useEffect(() => {
  }, [rentalsSubLoading])

  return (
    <div className="mr-11">
      <header className="header flex flex-row justify-between mb-5">
        <Typography style={{ fontSize: '1rem' }} className="leading-6 text-base">
          Calendrier
        </Typography>
        <div className="flex">
          <div className="arrow-back arrow-icon" onClick={prev}>
            <ArrowBackIosIcon className="icon" fontSize="large" />
          </div>
          <div className="flex flex-row text-base text-primary-light">
            Semaine du{' '}
            {format(firstDayWeek(currentWeeksValue), dateFormat, {
              locale: fr,
            })}{' '}
            au{' '}
            {format(lastDaySecondWeek(currentWeeksValue), dateFormat, {
              locale: fr,
            })}
          </div>
          <div className="arrow-forward arrow-icon" onClick={next}>
            <ArrowForwardIosIcon className="icon" fontSize="large" />
          </div>
        </div>
      </header>
      <main className="flex flex-row justify-between">
        {[...Array(daysWorks)].map((el, index) => {
          const day=addBusinessDays(firstDayWeek(currentWeeksValue), index)
          return <DayCardsCalendar key={index} day={day} isMarkedDay={markedDates.some((d)=>isSameDay(d,day))} />
       })}
      </main>
    </div>
  )
}

export default CalendarDashboard
