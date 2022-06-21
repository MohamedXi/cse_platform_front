import { isPast } from 'date-fns'

// Store
import { RootState } from '../store'

// Selectors
import { useSelector } from 'react-redux'
import { ongoingRentalsByItemIdSelector } from '../selectors/rentals'

// Types
import { Item, ItemType, Tag, CompoundedItem } from '../types/entities'

export const checkItemMatchCategorieFilters = (item: Item, catFilters: string[], categories: ItemType[]): boolean => {
  const itemTypeName = categories.find((el) => el.id === item.itemType)?.name
  if (catFilters.length === 0) {
    return true
  } else {
    return catFilters.includes(itemTypeName!)
  }
}

export const checkItemMatchTagFilters = (item: Item, tagFilters: string[], tags: Tag[]): boolean => {
  // it returns true if there is no selected tags
  if (tagFilters.length === 0) {
    return true
  } else {
    // we need to get a tag name from every tag id s get in item.tags
    // in order to compare them
    const itemTagsNames = item.tags.map((tag) => {
      return tags.find((el) => {
        return el.id === tag
      })?.name
    })

    // the item must have EVERY tag of the selected filter tags for it to return true
    return tagFilters.every((filter) => {
      return itemTagsNames.includes(filter)
    })
  }
}

export const sortItemsByCategory = (items: Item[]): Item[] => {
  return items.sort((a, b) => {
    if (a.itemType < b.itemType) {
      return -1
    }
    if (a.itemType > b.itemType) {
      return 1
    }
    return 0
  })
}

export const GetItemAvailability = (item?: Item, itemNew?: CompoundedItem): boolean | Date => {
  const itemRentals = useSelector((state: RootState) =>
    ongoingRentalsByItemIdSelector(state, item ? item.id : itemNew?.id!),
  )

  if (item) {
    return item!.endDateAvailable && isPast(item!.endDateAvailable) ? false : itemRentals.length === 0 ? true : false
  } else {
    return itemNew!.endDateAvailable && isPast(itemNew!.endDateAvailable)
      ? false
      : itemRentals.length === 0
      ? true
      : false
  }
}
