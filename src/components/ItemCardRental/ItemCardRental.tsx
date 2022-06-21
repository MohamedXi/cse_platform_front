import { useContext, useRef, useState } from 'react'
import { Button, Card, makeStyles } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { addDays, isEqual, isPast } from 'date-fns'

// Store
import { RootState, useAppDispatch } from '../../store'

// Selectors
import { ongoingRentalsByItemIdSelector } from '../../selectors/rentals'

// Context
import { GlobalContext } from '../../context/Global'

//Types
import { PostRental } from '../../types/dtos'
import { CompoundedItem, CompoundedRental } from '../../types/entities'

//Actions
import { addRental } from '../../actions/rentalsActions'

//Utils
import { formatDate, GetCurrentPerson, findItemFirstDayOfAvailability, findDayOfAvailability } from '../../utils'

// Components
import ItemCardRentalContent from './ItemCardRentalContent'
import BookingDialogContent, { BookingCalendarValues } from '../Dialogs/BookingDialog'
import ConfirmDialog from '../Dialogs/ConfirmDialog'
import BaseDialog from '../Dialogs/BaseDialog'
import ItemCardContent from '../ItemCard/ItemCardContent'

interface ItemCardRentalProps {
  item?: CompoundedRental
  itemNew?: CompoundedItem
}

const useCardStyles = makeStyles((_theme) => ({
  root: {
    width: '210px',
    height: '150px',
    boxSizing: 'border-box',
    marginTop: '0',
  },
}))

const ItemCardRental = ({ item, itemNew }: ItemCardRentalProps) => {
  const id = item ? item.item.id : itemNew ? itemNew.id : ''
  const itemRentals = useSelector((state: RootState) => ongoingRentalsByItemIdSelector(state, id))
  const currentUser = GetCurrentPerson()
  const [modalStatus, setModalStatus] = useState<'success' | 'error' | null>(null)

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openItemNewInfoModal, setOpenItemNewInfoModal] = useState<boolean>(false)
  const [openRentalInfoModal, setOpenRentalInfoModal] = useState<boolean>(false)
  const defaultValues: BookingCalendarValues = {
    bookingCalendar: [formatDate(new Date()), formatDate(new Date())],
    user: currentUser?.id ?? '',
    item: itemNew?.id ?? '',
  }

  const { setValue, getValues, handleSubmit, control } = useForm<BookingCalendarValues>({
    defaultValues,
    mode: 'all',
  })
  const { user } = getValues()

  const cardClasses = useCardStyles()
  const { holidaysDays } = useContext(GlobalContext)
  const dispatch = useAppDispatch()

  const handleSubmitRental = ({ bookingCalendar, user, item }: BookingCalendarValues) => {
    const rental: PostRental = {
      startDate: bookingCalendar[0],
      dueDate: isEqual(formatDate(bookingCalendar[0]), formatDate(bookingCalendar[1]))
        ? bookingCalendar[0]
        : bookingCalendar[1],
      endDate: null,
      user,
      item,
    }
    return dispatch(addRental(rental))
      .then((response: any) => {
        if (response.error) {
          setModalStatus('error')
        } else {
          setModalStatus('success')
        }
      })
      .catch(() => {
        setModalStatus('error')
      })
  }
  const itemAvailability: true | false | Date =
    item && !(item.item.endDateAvailable && isPast(item.item.endDateAvailable))
      ? false
      : itemRentals.length === 0
      ? true
      : findDayOfAvailability(itemRentals, holidaysDays, user)

  const itemNewAvailability: true | false | Date =
    itemNew && !(itemNew.endDateAvailable && isPast(itemNew.endDateAvailable))
      ? false
      : itemRentals.length === 0
      ? true
      : findDayOfAvailability(itemRentals, holidaysDays, user)

  const handleCloseModal = async () => {
    setOpenModal(false)
    setOpenItemNewInfoModal(false)
    setOpenRentalInfoModal(false)
    setOpenRentalInfoModal(false)
    //If the modal isn't set back to null, re-opening the modal displays the success message instead of the booking calendar after t
    setModalStatus(null)
  }

  const getConfirmCaption = () => {
    switch (modalStatus) {
      case 'success':
        return 'Super !'
      case 'error':
        return 'Retour'
      default:
        return 'Réserver'
    }
  }
  const handleItemNewDisplayMore = () => {
    setOpenItemNewInfoModal(true)
  }
  const handleRentalDisplayMore = () => {
    setOpenRentalInfoModal(true)
  }
  return (
    <div className={`relative flex flex-col items-center ${item?.id}`}>
      <Card
        variant="outlined"
        key={`item-card-${item?.id}`}
        classes={cardClasses}
        className="py-4 px-0 flex flex-row flex-shrink-0 rounded-2xl mr-2 my-5"
      >
        {/* Display cards for myRentals */}
        {item && (
          <ItemCardRentalContent
            item={item?.item!}
            endDate={item?.endDate!}
            startDate={item?.startDate!}
            dueDate={item.dueDate}
          />
        )}
        {/* Display cards for newItem */}
        {itemNew && <ItemCardRentalContent item={itemNew} />}
      </Card>
      <div className="absolute bottom-2 w-20 h-6 button-container">
        {item && (
          <Button variant="contained" onClick={handleRentalDisplayMore}>
            Voir plus
          </Button>
        )}
        {itemNew && (
          <Button variant="contained" onClick={handleItemNewDisplayMore}>
            Voir plus
          </Button>
        )}
        {itemNew && (
          <Button variant="contained" onClick={() => setOpenModal(true)} color="secondary">
            Réserver
          </Button>
        )}
      </div>
      <ConfirmDialog
        open={openModal}
        onConfirm={!modalStatus ? handleSubmit(handleSubmitRental) : handleCloseModal}
        onClose={() => handleCloseModal()}
        onCancel={handleCloseModal}
        confirmCaption={getConfirmCaption()}
        isVisibleCancelButton={!modalStatus}
        canCloseAfterConfirm={false}
        content={
          <BookingDialogContent
            control={control}
            setValue={setValue}
            getValues={getValues}
            itemNew={itemNew}
            holidaysDays={holidaysDays}
            completionStatus={modalStatus}
          />
        }
      />
      <BaseDialog
        open={openRentalInfoModal}
        onClose={() => handleCloseModal()}
        content={
          <div className="booking-calendars__item-infos flex flex-row flex-shrink-0 relative">
            <ItemCardContent inModal itemNew={item?.item} hasCarousel availability={itemAvailability} />
          </div>
        }
      />
      <BaseDialog
        open={openItemNewInfoModal}
        onClose={() => handleCloseModal()}
        content={
          <div className="booking-calendars__item-infos flex flex-row flex-shrink-0 relative">
            <ItemCardContent inModal itemNew={itemNew} hasCarousel availability={itemNewAvailability} />
          </div>
        }
      />
    </div>
  )
}

export default ItemCardRental
