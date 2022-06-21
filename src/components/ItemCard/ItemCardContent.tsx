import { Fragment, Key } from 'react'
import { CardContent, Divider, makeStyles, Typography } from '@material-ui/core'

// Redux
import { RootState, store } from '../../store'
import { itemTypesAdapter, tagsAdapter } from '../../adapters'

// Types
import { CompoundedItem, Item } from '../../types/entities'

// Components
import ItemImage from './ItemImage'
import ItemCardHeader from './ItemCardHeader'
import Carousel from '../Carousel/Carousel'

interface ItemCardContentProps {
  item?: Item
  itemNew?: CompoundedItem
  hasCarousel?: boolean
  hasAvailabilty?: boolean
  availability: boolean | Date
  inModal?: boolean
}

const useCardContentStyles = makeStyles((_theme) => ({
  root: {
    height: '146px',
    width: '100%',
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

const ItemCardContent = ({
  item,
  itemNew,
  hasCarousel = false,
  hasAvailabilty = false,
  availability = false,
  inModal,
}: ItemCardContentProps) => {
  const imgBaseUri = window['runConfig'].REACT_APP_IMAGE_BASE_URI

  const itemTypesSelector = itemTypesAdapter.getSelectors<RootState>((state) => state.itemTypes)
  const tagsSelector = tagsAdapter.getSelectors<RootState>((state) => state.tags)

  const contentClasses = useCardContentStyles()
  const carouselClasses = useCarouselStyles()
  return (
    <Fragment>
      {hasCarousel ? (
        <Carousel className={carouselClasses.root} slidesToScroll={1} slidesToShow={1}>
          {item && [
            ...item.images.map((image: string, index: Key) => (
              <ItemImage key={`image-${index}`} src={`${imgBaseUri}/${image}`} alt={item.name} title={item.name} />
            )),
              <ItemImage
              key={`default-image`}
                alt={item!.name}
                title={item!.name}
                src={
                  item!.images[0]
                    ? `${imgBaseUri}/${item!.images[0]}`
                    : `${imgBaseUri}/creative-logo-design-icon-colorful-600w-658173808-jpg-140_140.png`
                }
              />,
          ]}
          {itemNew && [
            ...itemNew!.images.map((image: string, index: Key) => (
              <ItemImage key={index} src={`${imgBaseUri}/${image}`} alt={itemNew!.name} title={itemNew!.name} />
            )),
            <ItemImage
              alt={itemNew!.name}
              title={itemNew!.name}
              src={
                itemNew!.images[0]
                  ? `${imgBaseUri}/${itemNew!.images[0]}`
                  : `${imgBaseUri}/creative-logo-design-icon-colorful-600w-658173808-jpg-140_140.png`
              }
            />,
          ]}
        </Carousel>
      ) : item ? (
        <ItemImage
          alt={item!.name}
          title={item!.name}
          src={
            item!.images[0]
              ? `${imgBaseUri}/${item!.images[0]}`
              : `${imgBaseUri}/creative-logo-design-icon-colorful-600w-658173808-jpg-140_140.png`
          }
        />
      ) : (
        <ItemImage
          alt={itemNew!.name}
          title={itemNew!.name}
          src={
            itemNew!.images[0]
              ? `${imgBaseUri}/${itemNew!.images[0]}`
              : `${imgBaseUri}/creative-logo-design-icon-colorful-600w-658173808-jpg-140_140.png`
          }
        />
      )}
      <CardContent classes={contentClasses} className="flex flex-col">
        {item && (
          <ItemCardHeader
            availability={availability}
            itemName={item!.name}
            inModal={inModal}
            itemTypeName={itemTypesSelector.selectById(store.getState(), item!.itemType)?.name ?? ''}
            tagsNames={item!.tags
              .map((t) => tagsSelector.selectById(store.getState(), t)?.name ?? '')
              .filter((t) => t !== '')}
          />
        )}
        {itemNew && (
          <ItemCardHeader
            availability={availability}
            itemName={itemNew?.name!}
            inModal={inModal}
            itemTypeName={itemNew?.itemType.name!}
            tagsNames={itemNew!.tags
              .map((t) => tagsSelector.selectById(store.getState(), t.id)?.name ?? '')
              .filter((t) => t !== '')}
          />
        )}
        <div className="divider__container">
          <Divider light={true} />
        </div>
        {item && (
          <Typography
            lineHeight={1.4}
            marginTop="0.2rem"
            fontSize="0.625rem"
            variant="body2"
            className="text-lg line-clamp-5"
          >
            {item?.description ? item?.description : 'Aucune description disponible'}
          </Typography>
        )}
        {itemNew && (
          <Typography
            lineHeight={1.4}
            marginTop="0.2rem"
            fontSize="0.625rem"
            variant="body2"
            className="text-lg line-clamp-5"
          >
            {itemNew?.description ? itemNew?.description : 'Aucune description disponible'}
          </Typography>
        )}
      </CardContent>
    </Fragment>
  )
}

export default ItemCardContent
