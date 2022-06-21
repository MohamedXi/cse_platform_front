import { Fragment, Key, useContext } from 'react'
import { CardContent, Divider, makeStyles, Typography } from '@material-ui/core'

// Types
import { CompoundedItem } from '../../types/entities'

// Components
import ItemCardRentalHeader from './ItemCardRentalHeader'
import { format, isPast } from 'date-fns'

// Utils
import { ongoingRentalsByItemIdSelector } from '../../selectors/rentals'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import Carousel from '../Carousel/Carousel'
import ItemImage from '../ItemCard/ItemImage'
import { findDayOfAvailability, findItemFirstDayOfAvailability, GetCurrentPerson } from '../../utils'

// Context
import { GlobalContext } from '../../context/Global'

interface ItemCardRentalContentProps {
  item: CompoundedItem
  endDate?: number | Date
  dueDate?: number | Date
  startDate?: Date
  hasCarousel?: boolean
}

const useCardContentStyles = makeStyles((_theme) => ({
  root: {
    height: '146px',
    // width: '177px',
    padding: 0,
    margin: '0 0 0 1rem',
    boxSizing: 'border-box',
    '&:last-child': {
      padding: 0,
    },
  },
}))

const useCarouselStyles = makeStyles((_theme) => ({
  root: {
    width: '20%',
    marginRight: '35px',
  },
}))

const ItemCardRentalContent = ({ item, endDate, startDate, dueDate, hasCarousel }: ItemCardRentalContentProps) => {
  const currentUser = GetCurrentPerson()
  const contentClasses = useCardContentStyles()
  const carouselClasses = useCarouselStyles()
  const { holidaysDays } = useContext(GlobalContext)
  const imgBaseUri = window['runConfig'].REACT_APP_IMAGE_BASE_URI

  const itemRentals = useSelector((state: RootState) => ongoingRentalsByItemIdSelector(state, item.id!))
  const user = currentUser?.id ?? ''

  const availability: true | false | Date = !(item.endDateAvailable && isPast(item.endDateAvailable))
    ? false
    : itemRentals.length === 0
    ? true
    : findDayOfAvailability(itemRentals, holidaysDays, user)

  const availabilityText =
    availability === true
      ? `Disponible`
      : availability === false
      ? 'Indisponible'
      : `Disponible à partir du ${format(availability, 'dd/LL')}`

  return (
    <Fragment>
      {hasCarousel && (
        <Carousel className={carouselClasses.root} slidesToScroll={1} slidesToShow={1}>
          {[
            ...item.images.map((image: string, index: Key) => (
              <ItemImage key={`image-${index}`} src={`${imgBaseUri}/${image}`} alt={item.name} title={item.name} />
            )),
            <ItemImage
              key={'default-image'}
              alt={item!.name}
              title={item!.name}
              src={
                item!.images[0]
                  ? `${imgBaseUri}/${item!.images[0]}`
                  : `${imgBaseUri}/creative-logo-design-icon-colorful-600w-658173808-jpg-140_140.png`
              }
            />,
          ]}
        </Carousel>
      )}

      <CardContent classes={contentClasses} className="flex flex-col w-full">
        <ItemCardRentalHeader itemName={item.name} itemTypeName={item.itemType} tagsNames={item.tags} />
        <Divider />

        {startDate && (
          <div className="flex px-3.5 flex-col mt-2">
            <Typography
              lineHeight={1.2}
              marginTop="0.2rem"
              fontSize="0.625rem"
              variant="body2"
              className="text-lg line-clamp-5 "
            >
              Retrait: {format(startDate!, 'd/L/y')}
            </Typography>
          </div>
        )}

        {(endDate || dueDate) && (
          <div className="flex px-3.5 flex-col">
            <Typography
              lineHeight={1.2}
              marginTop="0.2rem"
              fontSize="0.625rem"
              variant="body2"
              className="text-lg line-clamp-5 "
            >
              Restitution: {format(endDate! || dueDate!, 'd/L/y')}
            </Typography>
          </div>
        )}
        {!startDate && (!endDate || !dueDate) && (
          <div className="flex px-3.5 flex-col mt-2">
            <Typography
              lineHeight={1.2}
              marginTop="0.2rem"
              fontSize="0.625rem"
              variant="body2"
              className="text-lg line-clamp-5 "
            >
              {availabilityText}
            </Typography>
          </div>
        )}
      </CardContent>
    </Fragment>
  )
}

export default ItemCardRentalContent
