import { Item } from '../../types/entities'
import { ItemDto, UpdatedItem, updatedItemDto } from '../../types/dtos'
import { makeUri } from './misc'
import { endpoints } from '../../consts/endpoints'

/**
 * From domain to API
 * @param item
 */
export const itemToDto = (item: Item): ItemDto => ({
  ...item,
  agency: item?.agency ? makeUri(endpoints.agencies, item.agency) : '',
  images: Array.isArray(item?.images) ? item.images.map((image) => makeUri(endpoints.images, image)) : [],
  itemType: item?.itemType ? makeUri(endpoints.itemType, item.itemType) : '',
  tags: item?.tags ? item.tags.map((tagId: string) => makeUri(endpoints.tags, tagId)) : [],
  endDateAvailable: item.endDateAvailable ? new Date(item.endDateAvailable) : null,
})

/**
 * From domain to API
 * @param item
 */
 export const updatedItemToDto = (item: UpdatedItem): updatedItemDto => ({
  ...item,
  agency: item?.agency ? makeUri(endpoints.agencies, item.agency) : '',
  images: Array.isArray(item?.images) ? item.images.map((image) => makeUri(endpoints.images, image)) : [],
  itemType: item?.itemType ? makeUri(endpoints.itemType, item.itemType) : '',
  tags: item?.tags ? item.tags.map((tagId: string) => makeUri(endpoints.tags, tagId)) : [],
  endDateAvailable: item.endDateAvailable ? new Date(item.endDateAvailable) : null,
})

/**
 * From domain to API
 * @param items
 */
export const itemsToDtos = (items: Item[]): ItemDto[] => items.map(itemToDto)

/**
 * From API to domain
 * @param item
 */
export const dtoToItem = (item: ItemDto): Item => ({
  ...item,
  agency: item?.agency ? item.agency.replace(makeUri(endpoints.agencies), '') : '',
  itemType: item?.itemType ? item.itemType.replace(makeUri(endpoints.itemType), '') : '',
  images: item?.images ?? [],
  tags: item?.tags ? item.tags.map((t) => t.replace(makeUri(endpoints.tags), '')) : [],
  rentals: item?.rentals ? item.rentals.map((r) => r.replace(makeUri(endpoints.rentals), '')) : [],
  endDateAvailable: item.endDateAvailable ? new Date(item.endDateAvailable) : null,
  createdAt: new Date(item.createdAt),
})

/**
 * From API to domain
 * @param resource
 */
export const dtosToItems = (items: ItemDto[]): Item[] => items.map(dtoToItem)

// /**
//  * From API to domain
//  * @param item
//  */
// export const jsonldToResource = (item: ItemDto): Item => ({
//   ...item,
//   agency: item?.agency ? item.agency.replace(makeUri(endpoints.agencies), '') : '',
//   itemType: item?.itemType ? item.itemType.replace(makeUri(endpoints.itemType), '') : '',
//   tags: item?.tags ? item.tags.map(t => t.replace(makeUri(endpoints.tags), '')) : [],
// });
