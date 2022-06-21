import { Item, Rental } from '../types/entities'
import { compareAsc, isPast } from 'date-fns'
import { Dictionary } from '@reduxjs/toolkit'

function getSortedItemsByAvailability(items: Item[], rentals: Dictionary<Rental>): Item[] {
  return items.sort((a: Item, b: Item) => {
    // endDateAvailable passed, put at the end
    if (a.endDateAvailable && isPast(a.endDateAvailable)) {
      return 1
    }
    if (b.endDateAvailable && isPast(b.endDateAvailable)) {
      return -1
    }
    const getCurrentLoc = (item: Item) =>
      item.rentals &&
      item.rentals
        .filter((r: string) => !!rentals[r])
        ?.map((r: string) => rentals[r])
        .reduce((acc: Rental | undefined, curr: Rental | undefined) => {
          if (!acc) {
            return curr
          } else {
            if (!curr) {
              return acc
            }
            return curr.dueDate < acc.dueDate ? curr : acc
          }
        }, undefined)
    const locA = getCurrentLoc(a)
    const locB = getCurrentLoc(b)

    if (!locA) {
      return locB ? -1 : 0
    } else if (!locB) {
      return locA ? 1 : 0
    }
    // locaA and locB set
    return compareAsc(locA.dueDate, locB.dueDate)
  })
}

function sortByName(a: { name: string }, b: { name: string }): number {
  const sortA = a.name.toUpperCase()
  const sortB = b.name.toUpperCase()
  return sortA === sortB ? 0 : sortA > sortB ? 1 : -1
}

export { getSortedItemsByAvailability, sortByName }
