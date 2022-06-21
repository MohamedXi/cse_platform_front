// Types
import { Item, Rental } from '../types/entities'

// Utils
import { formatDate } from '.'
import { isPast, isWithinInterval, addDays, isWeekend, isEqual, subDays, format } from 'date-fns'

// return availbility status
export const availabilityStatus = (item: Item, itemRentals: Rental[], holidaysDays: Date[]) => {
  const availability: true | false | Date = !(item.endDateAvailable && isPast(item.endDateAvailable))
    ? false
    : itemRentals.length === 0
    ? true
    : findItemFirstDayOfAvailability(itemRentals, holidaysDays)
  return availability === true
    ? 'DISPONIBLE'
    : availability === false
    ? 'INDISPONIBLE'
    : `DISPONIBLE LE ${format(availability, 'dd/LL')}`
}

// Check if an item is available for rental on a specified date
export const checkDayAvailability = (date: Date, rentals: Rental[], userId: String): boolean => {
  return (
    // Check if an item is booked ?
    checkDayAlreadyBooked(rentals, formatDate(date)) &&
    // ...a day is past ?
    !isPast(formatDate(date)) &&
    // ...the item already has been rented in day + 3 / day - 3 ?
    !ownBookingNeighboringDisabledDays(rentals, date, userId)
  )
}

//Check if there is a rental between the two dates
// export const checkRentalBetweenDatesBooking = (date: Date, rentals: Rentals[])

//WARNING PERF IF THERE'S A LOT OF RESERVATIONS (freeze catalogue or modal reservation on dashboard)
// Find the first day of availability for an item from today
export const findItemFirstDayOfAvailability = (rentals: Rental[], holidaysDays: Date[]): Date => {
  let dateToCheck = formatDate(new Date())
  let firstDayOfAvailability = null
  while (firstDayOfAvailability === null) {
    // eslint-disable-next-line no-loop-func
    let daysOfRental = rentals.filter(({ startDate, dueDate }: Rental) =>
      // ...the item already has been rented in day + 3 / day - 3 ?
      isWithinInterval(dateToCheck, {
        start: formatDate(subDays(startDate, 4)),
        end: formatDate(dueDate),
      }),
    )
    if (daysOfRental.length === 0 && !checkOffDay(holidaysDays, dateToCheck)) {
      firstDayOfAvailability = dateToCheck
      break
    } else {
      dateToCheck = addDays(dateToCheck, 1)
    }
  }
  return firstDayOfAvailability
}

export const findDayOfAvailability = (rentals: Rental[], holidaysDays: Date[], userId: String): Date => {
  let dateCheck = findItemFirstDayOfAvailability(rentals, holidaysDays)
  let firstDayAvailable = null

  while (firstDayAvailable === null) {
    if (checkDayAvailability(dateCheck, rentals, userId) === true && !checkOffDay(holidaysDays, dateCheck)) {
      firstDayAvailable = dateCheck
      break
    } else {
      dateCheck = addDays(dateCheck, 1)
    }
  }
  return firstDayAvailable
}

//Check if a day is a week-end day or a holiday day in France
export const checkOffDay = (holidaysDays: Date[], day: Date): boolean => {
  return (
    holidaysDays.filter((holidaysDay) => isEqual(formatDate(holidaysDay), formatDate(day))).length > 0 || isWeekend(day)
  )
}

export const checkDayAlreadyBooked = (rentals: Rental[], day: Date) => {
  // Check if a day is not in any rental range for one item
  return (
    rentals.filter(({ startDate, dueDate, endDate }: Rental) =>
      isWithinInterval(formatDate(day), {
        start: formatDate(startDate),
        end: formatDate(endDate || dueDate),
      }),
    ).length === 0
  )
}

export const checkFirstDayAlreadyBooked = (rentals: Rental[], day: Date) => {
  // Check if a day is not the first day of a rental range for one item
  return rentals.filter(({ startDate }: Rental) => isEqual(formatDate(day), formatDate(startDate))).length === 0
}

export const checkLastDayAlreadyBooked = (rentals: Rental[], day: Date) => {
  // Check if a day is not the last day of a rental range for one item
  return rentals.filter(({ dueDate }: Rental) => isEqual(formatDate(day), formatDate(dueDate))).length === 0
}

export const ownBookingNeighboringDisabledDays = (rentals: Rental[], day: Date, userId: String): boolean => {
  // Check if a day is neighboring (3 days before or after) a rental for the user. (can't book again before 4 days)

  return (
    rentals.filter(
      ({ dueDate, startDate, user }: Rental) =>
        user === userId &&
        (isWithinInterval(day, {
          start: formatDate(dueDate),
          end: formatDate(addDays(dueDate, 4)),
        }) ||
          isWithinInterval(day, {
            start: formatDate(subDays(startDate, 4)),
            end: formatDate(startDate),
          })),
    ).length > 0
  )
}

export const bookingNeighboringOtherUser = (rentals: Rental[], dayStart: Date, dayEnd: Date): boolean => {
  return (
    rentals.filter(({ dueDate, startDate }: Rental) =>
      isWithinInterval(startDate, {
        start: formatDate(dayStart),
        end: formatDate(dayEnd),
      }),
    ).length > 0
  )
}

//Return all rental for the current user
export const getRentalCurrentUser = (rentals: Rental[], userId: String) => {
  return rentals.filter(({ user }: Rental) => user === userId)
}
