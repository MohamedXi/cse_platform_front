import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'
import { Item as ItemEntity } from '../../types/entities'
import ItemCard from '../ItemCard/ItemCard'
import ItemCardSkeleton from '../ItemCard/ItemCardSkeleton'
import { ItemType } from '../../types/entities'
import Carousel from '../../components/Carousel/Carousel'
import '../../components/Catalogue/Catalogue.scss'

interface ItemsProps {
  items: ItemEntity[]
  loading: boolean
  categories: ItemType[]
}

// interface SortedItems {
//   category: string;
//   items: Item[];
// }

const Items = ({ items, loading, categories }: ItemsProps) => {
  const fakeItems = ['', '', '', '', '', '']

  // sortedItems is an array object with a category and an array of items of that category
  const sortedItems = categories.map((cat) => {
    return {
      category: cat.name,
      //assign all the items of the same categories by filtering the items array
      //by comparing the running category, and each item and its category
      items: items
        .filter((item) => {
          //get the category name from the categoryId of the item
          const categoryName = categories.find((el) => el.id === item.itemType)?.name
          return cat.name === categoryName
        })
        .sort(function (a, b) {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        }),
    }
  })
  const useCarouselStyle = makeStyles((_theme) => ({
    root: {
      width: '100%',
      height: '249px',
      boxSizing: 'border-box',
      position: 'relative',
    },
  }))

  const carouselClasses = useCarouselStyle()

  const displayItemsCarouselsByCategory = () => {
    return sortedItems.map((category, i) => {
      if (!category.items.length) {
        return null
      } else {
        return (
          <div className="w-full flex flex-col relative carousel__container px-15" key={`${category.category}`}>
            <div className="carousel__background"></div>
            <h1 className="block">{category.category}</h1>
            {category.items.length > 4 ? (
              <Carousel
                catalogue={true}
                className={`${carouselClasses.root}`}
                infinite={false}
                dots={false}
                slidesToShow={4}
                slidesToScroll={4}
                children={category.items.map((i) => {
                  return <ItemCard item={i} inCarousel key={`item-${i.id}`} />
                })}
              ></Carousel>
            ) : (
              <div className="flex flex-row relative">
                {category.items.map((i) => {
                  return <ItemCard item={i} inCarousel={false} key={`item-${i.id}`} />
                })}
              </div>
            )}
          </div>
        )
      }
    })
  }

  return (
    <div className="flex flex-col w-full  items__list horizontal-scroll-nobar">
      {loading ? (
        <div className="flex flex-row relative flex-wrap">
          {fakeItems.map((s, i) => (
            <ItemCardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      ) : items.length ? (
        displayItemsCarouselsByCategory()
      ) : (
        <Typography variant="subtitle2" className="py-10">
          Aucun article n'est disponible à la location.
        </Typography>
      )}
    </div>
  )
}

export default Items
