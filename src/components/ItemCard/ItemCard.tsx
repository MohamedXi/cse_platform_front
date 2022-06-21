import { useContext, useRef, useState } from 'react'
import { Button, Card, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { addDays, isEqual, isPast } from 'date-fns'
import { useForm } from 'react-hook-form'

// Store
import { RootState, useAppDispatch } from '../../store'

// Actions
import { addRental } from '../../actions/rentalsActions'

// Selectors
import { ongoingRentalsByItemIdSelector } from '../../selectors/rentals'

// Types
import { PostRental } from '../../types/dtos'
import { Item } from '../../types/entities'

// Utils
import { findDayOfAvailability, findItemFirstDayOfAvailability, formatDate, GetCurrentPerson } from '../../utils'

// Context
import { GlobalContext } from '../../context/Global'

// Components
import AvailabiltyFlag from './AvailabiltyFlag'
import ConfirmDialog from '../Dialogs/ConfirmDialog'
import ItemCardContent from './ItemCardContent'
import BookingDialogContent, { BookingCalendarValues } from '../Dialogs/BookingDialog'

// Style
import './ItemCard.scss'
import BaseDialog from '../Dialogs/BaseDialog'

interface ItemCardProps {
  item: Item
  inCarousel?: boolean
}

const useCardStyles = makeStyles((_theme) => ({
  root: {
    width: '100%',
    height: '200px',
    boxSizing: 'border-box',
    border: 'none',
  },
}))

function ItemCard({ item, inCarousel }: ItemCardProps) {
  const itemRentals = useSelector((state: RootState) => ongoingRentalsByItemIdSelector(state, item.id))
  const currentUser = GetCurrentPerson()
  const currentUserAgency = currentUser?.agency
  const [modalStatus, setModalStatus] = useState<'success' | 'error' | null>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openInfoModal, setOpenInfoModal] = useState<boolean>(false)
  const defaultValues: BookingCalendarValues = {
    bookingCalendar: [formatDate(new Date()), formatDate(new Date())],
    user: currentUser?.id ?? '',
    item: item?.id ?? '',
  }

  const { setValue, getValues, handleSubmit, control } = useForm<BookingCalendarValues>({
    defaultValues,
    mode: 'all',
  })
  const { user } = getValues()

  const cardClasses = useCardStyles()
  const { holidaysDays } = useContext(GlobalContext)
  const containerRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const availability: true | false | Date = !(item.endDateAvailable && isPast(item.endDateAvailable))
    ? false
    : itemRentals.length === 0
    ? true
    : findDayOfAvailability(itemRentals, holidaysDays, user)

  const handleSubmitRental = ({ bookingCalendar, user, item }: BookingCalendarValues) => {
    const rental: PostRental = {
      startDate: bookingCalendar[0],
      dueDate: bookingCalendar[1],
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

  const handleCloseModal = async () => {
    setOpenModal(false)
    setOpenInfoModal(false)
    //If the modal isn't set back to null, re-opening the modal displays the success message instead of the booking calendar after t
    setModalStatus(null)
  }

  const handleDisplayMore = () => {
    setOpenInfoModal(true)
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

  return (
    <div className={`relative flex flex-col items-center item-card__container ${inCarousel ? 'carousel__item' : ''}`}>
      <AvailabiltyFlag availability={availability} />
      <Card
        variant="outlined"
        key={`item-card-${item.id}`}
        classes={cardClasses}
        className="p-6 flex flex-row flex-shrink-0 rounded-2xl mr-4 my-5"
      >
        <ItemCardContent item={item} availability={availability} />
      </Card>
      {currentUserAgency === item.agency ? (
        <div ref={containerRef} className="absolute bottom-1">
          <Button variant="contained" onClick={() => setOpenModal(true)}>
            RÉSERVER
          </Button>
        </div>
      ) : (
        <div ref={containerRef} className="absolute bottom-1">
          <Button variant="contained" onClick={handleDisplayMore}>
            Voir plus
          </Button>
        </div>
      )}

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
            item={item}
            holidaysDays={holidaysDays}
            completionStatus={modalStatus}
          />
        }
      />
      <BaseDialog
        open={openInfoModal}
        onClose={() => handleCloseModal()}
        content={
          <div className="booking-calendars__item-infos flex flex-row flex-shrink-0 relative">
            <ItemCardContent inModal item={item} hasCarousel availability={availability} />
          </div>
        }
      />
    </div>
  )
}

export default ItemCard
