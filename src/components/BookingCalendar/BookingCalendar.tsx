import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import { Typography } from '@material-ui/core'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import './BookingCalendar.scss'
import { CalendarTileProperties } from 'react-calendar'
import clsx from 'clsx'
import { CompoundedItem, Item } from '../../types/entities'
import { ongoingRentalsByItemIdSelector } from '../../selectors/rentals'
import { addDays, eachDayOfInterval, format, isEqual, isToday } from 'date-fns'
import { Control, Controller, UseFormSetValue, UseFormGetValues, useWatch } from 'react-hook-form'
import { BookingCalendarValues } from '../Dialogs/BookingDialog'

// Utils
import {
  checkDayAvailability,
  findItemFirstDayOfAvailability,
  formatDate,
  checkOffDay,
  checkDayAlreadyBooked,
  checkFirstDayAlreadyBooked,
  checkLastDayAlreadyBooked,
  bookingNeighboringOtherUser,
  findDayOfAvailability,
} from '../../utils'

export interface BookingCalendarProps {
  item: Item | CompoundedItem
  holidaysDays: Date[]
  onError?: Function
  name: string
  control: Control<any>
  setValue: UseFormSetValue<BookingCalendarValues>
  getValues: UseFormGetValues<BookingCalendarValues>
}

const BookingCalendar = ({ item, holidaysDays, onError, name, control, setValue, getValues }: BookingCalendarProps) => {
  //default range of 2 dates for booking : today and today + 1
  const itemRentals = useSelector((state: RootState) => ongoingRentalsByItemIdSelector(state, item.id))
  const { user } = getValues()
  //1 possible error, booking > 8 days
  const [bookingTooLong, setBookingTooLong] = useState<boolean>(false)

  const [bookingRentalBetweenDates, setBookingRentalBetweenDates] = useState<boolean>(false)

  const [notBookingToday, setNotBookingToday] = useState<boolean>(false)

  const [bookingDateStartChoose, setBookingDateStartChoose] = useState<Date[]>(getValues('bookingCalendar'))

  const bookingCalendar = useWatch({
    control,
    name,
  })

  //1 possible error : booking > 8 days
  useEffect(() => {
    onError && (onError(bookingTooLong) || onError(bookingRentalBetweenDates) || onError(notBookingToday))
  }, [bookingTooLong, onError, bookingRentalBetweenDates, notBookingToday])

  // return the first day available for booking
  useEffect(() => {
    const firstDayAvailable = findDayOfAvailability(itemRentals, holidaysDays, user)

    setValue('bookingCalendar', [formatDate(firstDayAvailable), formatDate(firstDayAvailable)])
  }, [itemRentals, holidaysDays, setValue, user])

  useEffect(() => {
    if (bookingCalendar) {
      const valueSelect = getValues('bookingCalendar')
      // The booking is too long if the range is above 8 days

      setBookingTooLong(
        eachDayOfInterval({
          start: bookingCalendar[0],
          end: bookingCalendar[1],
        }).length > 8,
      )
      if (!isEqual(bookingCalendar[0], bookingCalendar[1])) {
        setBookingRentalBetweenDates(bookingNeighboringOtherUser(itemRentals, bookingCalendar[0], bookingCalendar[1]))
      }
      if (isEqual(valueSelect[0], valueSelect[1]) && isToday(valueSelect[0])) {
        setNotBookingToday(!notBookingToday)
      }
      setBookingDateStartChoose(getValues('bookingCalendar'))
    }
  }, [bookingCalendar])

  return (
    <div className="booking-calendars__container">
      <div className="booking-calendar__container">
        {bookingTooLong && (
          <Typography className="booking-calendar__warning">* La durée de location maximale est de 8 jours.</Typography>
        )}
        {bookingRentalBetweenDates && (
          <Typography className="booking-calendar__warning">
            * Une réservation est déjà présente entre vos dates sélectionnés.
          </Typography>
        )}
        {notBookingToday && (
          <Typography className="booking-calendar__warning">* Vous ne pouvez pas réserver pour le jour même</Typography>
        )}
        <div className="booking-calendar-choseDay flex flex-row">
          <span className="text-xs flex w-1/2">Du : {format(bookingDateStartChoose[0], 'dd/LL')} </span>

          <span className="text-xs flex w-1/2 pl-4">Au : {format(bookingDateStartChoose[1], 'dd/LL')} </span>
        </div>

        <Controller
          name={name}
          control={control}
          render={({ field: { value } }) => {
            return (
              <Calendar
                value={value}
                onClickDay={(value) => {
                  setBookingTooLong(false)
                  setBookingRentalBetweenDates(false)
                  setNotBookingToday(false)
                  setValue('bookingCalendar', [formatDate(value), formatDate(value)])
                }}
                onChange={(newValue: Date[]) => {
                  setValue('bookingCalendar', [formatDate(newValue[0]), formatDate(newValue[1])])
                }}
                returnValue="range"
                showDoubleView
                selectRange
                view="month"
                minDetail="month"
                maxDetail="month"
                tileDisabled={(day: CalendarTileProperties) =>
                  !checkDayAvailability(day.date, itemRentals, user ?? '') || checkOffDay(holidaysDays, day.date)
                }
                tileClassName={({ date }: CalendarTileProperties) =>
                  clsx({
                    bookingTooLong,
                    bookingRentalBetweenDates,
                    oneDayOnly: isEqual(bookingCalendar[0], bookingCalendar[1]),
                    isAlreadyBooked: !checkDayAlreadyBooked(itemRentals, date),
                    isFirstDayAlreadyBooked: !checkFirstDayAlreadyBooked(itemRentals, date),
                    isLastDayAlreadyBooked: !checkLastDayAlreadyBooked(itemRentals, date),
                  })
                }
                className="booking-calendar"
              />
            )
          }}
        />
      </div>
    </div>
  )
}

export default BookingCalendar
