import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { allCompoundedItemsByAgencySelector, itemsLoadingSelector } from '../../selectors/items'

import ItemCardRental from '../ItemCardRental/ItemCardRental'
import Carousel from '../Carousel/Carousel'
import ItemCardRentalSkeleton from '../ItemCardRental/ItemCardRentalSkeleton'
import { rentalsSubresourcesLoadingSelector } from '../../selectors/rentals'

//Styles
import './styles/DisplayNewRentals.scss'
import { makeStyles, Typography } from '@material-ui/core'
import { differenceInDays } from 'date-fns'

const useCarouselStyles = makeStyles((_theme) => ({
  root: {
    width: '86.6%',
    marginRight: '0px',
    marginLeft: '25px',
  },
}))

const DisplayNewRentals = () => {
  const itemsSubLoading = useSelector(itemsLoadingSelector)
  const rentalsSubLoading = useSelector(rentalsSubresourcesLoadingSelector)
  const itemsByAgency = useSelector(allCompoundedItemsByAgencySelector)
  const carouselClasses = useCarouselStyles()
  const [itemsListByAgency, setItemListByAgency] = useState(itemsByAgency)

  //Check if the item is new item (<30 days)
  const distanceDates = (dateCompared: Date) => {
    const today = new Date()
    return Math.abs(differenceInDays(today, dateCompared))
  }

  useEffect(() => {
    setItemListByAgency(
      itemsByAgency
        .filter((n) => distanceDates(n.createdAt) < 30)
        .sort((a, b) => Number(b.createdAt) - Number(a.createdAt)),
    )
  }, [itemsByAgency])

  const fakeItems = ['', '', '']

  return (
    <div className="flex flex-row overflow-x-scroll overflow-y-hidden horizontal-scroll-nobar newRentals mt-2">
      {rentalsSubLoading && itemsSubLoading ? (
        <div className="ml-4 flex flex-row pb-2">
          {fakeItems.map((s, i) => (
            <ItemCardRentalSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      ) : itemsListByAgency.length ? (
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
          {itemsListByAgency.map((item) => (
            <ItemCardRental itemNew={item} key={`item-${item.id}`} />
          ))}
        </Carousel>
      ) : (
        <Typography variant="subtitle2" className="py-10">
          Aucun nouvel article
        </Typography>
      )}
    </div>
  )
}

export default DisplayNewRentals
