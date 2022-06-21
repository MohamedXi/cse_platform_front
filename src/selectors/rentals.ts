import { RootState } from '../store'
import { rentalsAdapter } from '../adapters'
import { createSelector } from '@reduxjs/toolkit'
import { requestStatuses } from '../types/actions'
import isFuture from 'date-fns/isFuture'
import { compareAsc, compareDesc } from 'date-fns'
import { allCompoundedItemsEntitiesSelector, allItemsEntitiesSelector, itemsLoadingSelector } from './items'
import { allPersonsEntitiesSelector, personsLoadingSelector } from './persons'
import { itemTypesLoadingSelector } from './itemTypes'
import { tagsLoadingSelector } from './tags'
import { CompoundedItem, CompoundedRental, Person, Rental } from '../types/entities'
import { getRentalStatus, rentalsStatuses } from '../helpers/statuses'

// Global selectors
const rentalState = (state: RootState) => state.rentals
export const allRentalsSelector = rentalsAdapter.getSelectors(rentalState).selectAll
export const rentalsByIdSelector = rentalsAdapter.getSelectors(rentalState).selectById

// Meta selectors
const rentalMetaSelector = createSelector(rentalState, (state) => state.meta)
export const rentalsLoadingSelector = createSelector(
  rentalMetaSelector,
  (meta) => meta.requestStatus === requestStatuses.pending,
)
export const rentalsSubresourcesLoadingSelector = createSelector(
  rentalsLoadingSelector,
  itemsLoadingSelector,
  itemTypesLoadingSelector,
  tagsLoadingSelector,
  personsLoadingSelector,
  (...args) => args.some((arg) => arg),
)
// Ongoing selectors
export const ongoingRentalsSelector = createSelector(allRentalsSelector, (rentals): Rental[] =>
  rentals.filter((r) => isFuture(r.dueDate)).sort((a, b) => compareAsc(a.dueDate, b.dueDate)),
)
export const ongoingRentalsByItemIdSelector = createSelector(
  ongoingRentalsSelector,
  (state: RootState, id: string) => id,
  (rentals, id) => rentals.filter((r) => r.item === id),
)
export const ongoingRentalsByAgencyIdSelector = createSelector(
  ongoingRentalsSelector,
  allItemsEntitiesSelector,
  (state: RootState, id: string | undefined) => id,
  (rentals, items, id) =>
    !id ? [] : rentals.filter((r) => r.item && items[r.item] && items[r.item]!.agency === id),
)

export const rentalsByAgencyIdSelector = createSelector(
  allRentalsSelector,
  allItemsEntitiesSelector,
  (state: RootState, id: string | undefined) => id,
  (rentals, items, id) =>
    !id ? [] : rentals.filter((r) =>   r.item && items[r.item] && items[r.item]!.agency === id)
                      .sort((a, b) => (a.endDate && b.endDate) ? compareDesc(a.endDate, b.endDate) :  
                             !a.endDate ? -1 : !b.endDate ? -1 : compareAsc(a.dueDate, b.dueDate)),
)


export const ongoingRentalsUserIdSelector = createSelector(
  ongoingRentalsSelector,
  allItemsEntitiesSelector,
  (state: RootState, id: string | undefined) => id,
  (rentals, items, id) =>
    !id ? [] : rentals.filter((r) => r.endDate && r.user && r.user === id),
)

export const getOnGoingCompoundedRentalsByAgency = createSelector(
  ongoingRentalsByAgencyIdSelector,
  allCompoundedItemsEntitiesSelector,
  allPersonsEntitiesSelector,
  (rentals: Rental[], items, persons) => {
    return rentals.map(
      (r: Rental): CompoundedRental => ({
        ...r,
        item: items[r.item] as CompoundedItem,
        user: persons[r!.user] as Person,
        giveBy: r?.giveBy ? (persons[r!.giveBy] as Person) : null,
        restitutionBy: r?.restitutionBy ? (persons[r!.restitutionBy] as Person) : null,
        status: getRentalStatus({ startDate: r.startDate,
                                  dueDate: r.dueDate,
                                  giveBy: r?.giveBy ? (persons[r!.giveBy] as Person) : null,
                                  restitutionBy: r?.restitutionBy ? (persons[r!.restitutionBy] as Person) : null
                                }),
        startDate: r.startDate,
        endDate: r.endDate,
        dueDate: r.dueDate,
      }),
    )
  },
)

export const getOngoingCompoundedRentalsByCurrentUser = createSelector(
  ongoingRentalsUserIdSelector,
  allCompoundedItemsEntitiesSelector,
  allPersonsEntitiesSelector,
  (rentals: Rental[], items, persons) => {
    return rentals.map(
      (r: Rental): CompoundedRental => ({
        ...r,
        item: items[r.item] as CompoundedItem,
        user: persons[r!.user] as Person,
        giveBy: r?.giveBy ? (persons[r!.giveBy] as Person) : null,
        restitutionBy: r?.restitutionBy ? (persons[r!.restitutionBy] as Person) : null,
        status: getRentalStatus({ startDate: r.startDate,
                                  dueDate: r.dueDate,
                                  giveBy: r?.giveBy ? (persons[r!.giveBy] as Person) : null,
                                  restitutionBy: r?.restitutionBy ? (persons[r!.restitutionBy] as Person) : null
                                }),
        startDate: r.startDate,
        endDate: r.endDate,
        dueDate: r.dueDate,
      }),
    )
  },
)

export const getCompoundedRentalsByAgency = createSelector(
  rentalsByAgencyIdSelector,
  allCompoundedItemsEntitiesSelector,
  allPersonsEntitiesSelector,
  (rentals: Rental[], items, persons) => {
    return rentals.map(
      (r: Rental): CompoundedRental => ({
        ...r,
        item: items[r.item] as CompoundedItem,
        user: persons[r!.user] as Person,
        giveBy: r?.giveBy ? (persons[r!.giveBy] as Person) : null,
        restitutionBy: r?.restitutionBy ? (persons[r!.restitutionBy] as Person) : null,
        status: getRentalStatus({ startDate: r.startDate,
                                  dueDate: r.dueDate,
                                  giveBy: r?.giveBy ? (persons[r!.giveBy] as Person) : null,
                                  restitutionBy: r?.restitutionBy ? (persons[r!.restitutionBy] as Person) : null
                                }),
        startDate: r.startDate,
        endDate: r.endDate,
        dueDate: r.dueDate,
      }),
    ).sort((a,b)=> ((a.status === rentalsStatuses.COMPLETE  && b.status !== rentalsStatuses.COMPLETE) ? 1 : -1) || 
    ((a.status === rentalsStatuses.WAITING  && b.status !== rentalsStatuses.WAITING) ?-1 : 1) || -1)
   },  
)
