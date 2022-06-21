import { ItemType } from '../../types/entities'
import { ItemTypeDto } from '../../types/dtos'

/**
 * From domain to API
 * @param itemType
 */
export const itemTypeToDto = (itemType: ItemType): ItemTypeDto => ({
  ...itemType,
})

/**
 * From domain to API
 * @param itemTypes
 */
export const itemTypesToDtos = (itemTypes: ItemType[]): ItemTypeDto[] => itemTypes.map(itemTypeToDto)

/**
 * From API to domain
 * @param itemType
 */
export const dtoToItemType = (itemType: ItemTypeDto): ItemType => ({
  ...itemType,
})

/**
 * From API to domain
 * @param itemTypes
 */
export const dtosToItemTypes = (itemTypes: ItemTypeDto[]): ItemType[] => itemTypes.map(dtoToItemType)
