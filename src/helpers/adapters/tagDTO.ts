import { Tag } from '../../types/entities'
import { TagDto } from '../../types/dtos'

/**
 * From domain to API
 * @param tag
 */
export const tagToDto = (tag: Tag): TagDto => ({
  ...tag,
})

/**
 * From domain to API
 * @param tags
 */
export const tagsToDtos = (tags: Tag[]): TagDto[] => tags.map(tagToDto)

/**
 * From API to domain
 * @param tag
 */
export const dtoToTag = (tag: TagDto): Tag => ({
  id: tag.id,
  name: tag.name,
  createdAt: tag.createdAt,
  updatedAt: tag.updatedAt,
})

/**
 * From API to domain
 * @param tags
 */
export const dtosToTags = (tags: TagDto[]): Tag[] => tags.map(dtoToTag)
