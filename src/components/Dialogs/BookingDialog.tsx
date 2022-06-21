import { useSelector } from 'react-redux'
import { isPast } from 'date-fns'

// Types
import { RootState } from '../../store'

import { ongoingRentalsByItemIdSelector } from '../../selectors/rentals'
import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form'

// Types
import { CompoundedItem, Item } from '../../types/entities'

// Enums
import { StatusDialogContentType } from '../../consts/global'

// Utils
import { findDayOfAvailability, findItemFirstDayOfAvailability } from '../../utils'
import { Typography } from '@material-ui/core'

// Components

import './BookingDialog.scss'
import ItemCardContent from '../../components/ItemCard/ItemCardContent'

import StatusDialogContent from './StatusDialogContent/StatusDialogContent'
import './BookingDialog.scss'
import BookingCalendar from '../BookingCalendar/BookingCalendar'

export interface BookingCalendarValues {
  bookingCalendar: Date[]
  user: string
  item: string
}

export interface BookingDialogContentProps {
  item?: Item
  itemNew?: CompoundedItem
  holidaysDays: Date[]
  onError?: Function
  control: Control<BookingCalendarValues>
  setValue: UseFormSetValue<BookingCalendarValues>
  getValues: UseFormGetValues<BookingCalendarValues>
  completionStatus?: 'success' | 'error' | null
}

const BookingDialogContent = ({
  item,
  itemNew,
  holidaysDays,
  onError,
  control,
  setValue,
  getValues,
  completionStatus,
}: BookingDialogContentProps) => {
  const itemRentals = useSelector((state: RootState) =>
    item ? ongoingRentalsByItemIdSelector(state, item?.id!) : ongoingRentalsByItemIdSelector(state, itemNew?.id!),
  )
  const { user } = getValues()
  const availability: true | false | Date = item
    ? !(item!.endDateAvailable && isPast(item!.endDateAvailable))
      ? false
      : itemRentals.length === 0
      ? true
      : findDayOfAvailability(itemRentals, holidaysDays, user)
    : !(itemNew!.endDateAvailable && isPast(itemNew!.endDateAvailable))
    ? false
    : itemRentals.length === 0
    ? true
    : findDayOfAvailability(itemRentals, holidaysDays, user)

  const displayCalendarOrStatusMessage = () => {
    if (!completionStatus && item) {
      return (
        <BookingCalendar
          name="bookingCalendar"
          control={control}
          setValue={setValue}
          getValues={getValues}
          onError={onError}
          holidaysDays={holidaysDays}
          item={item}
        />
      )
    } else if (!completionStatus && itemNew) {
      return (
        <BookingCalendar
          name="bookingCalendar"
          control={control}
          setValue={setValue}
          getValues={getValues}
          onError={onError}
          holidaysDays={holidaysDays}
          item={itemNew}
        />
      )
    } else if (completionStatus === 'success') {
      return (
        <StatusDialogContent status={StatusDialogContentType.SUCCESS} message={'Votre article a bien été reservé !'} />
      )
    } else if (completionStatus === 'error') {
      return <StatusDialogContent status={StatusDialogContentType.ERROR} message={'Une erreur est survenue !'} />
    }
  }

  return (
    <div>
      <div className="booking-calendars__item-infos flex flex-row flex-shrink-0 relative">
        {item ? (
          <ItemCardContent inModal item={item!} hasCarousel availability={availability} />
        ) : (
          <ItemCardContent inModal itemNew={itemNew!} hasCarousel availability={availability} />
        )}
      </div>
      <div className="booking-calendars__title-container">
        <Typography className="booking-calendars__title">RÉSERVATIONS</Typography>
      </div>
      {displayCalendarOrStatusMessage()}
    </div>
  )
}

export default BookingDialogContent
