import { Tag, ItemType } from '../../types/entities'
import './TagFilters.scss'
import clsx from 'clsx'

export interface TagFiltersProps {
  tags: Tag[]
  categories: ItemType[]
  setTagFilters: Function
  setCategoryFilters: Function
  tagFilters: string[]
  categoryFilters: string[]
}

const TagFilters = ({
  tags,
  categories,
  setTagFilters,
  setCategoryFilters,
  tagFilters,
  categoryFilters,
}: TagFiltersProps) => {
  const displayTags = () => {
    if (!tags && !categories) {
      return
    }

    const toggleFilter = (tag: Tag, filterType: 'category' | 'tag') => {
      if (filterType === 'category') {
        if (categoryFilters.includes(tag.name)) {
          setCategoryFilters(categoryFilters.filter((filter) => filter !== tag.name))
        } else {
          setCategoryFilters([...categoryFilters, tag.name])
        }
      } else {
        if (tagFilters.includes(tag.name)) {
          setTagFilters(tagFilters.filter((filter) => filter !== tag.name))
        } else {
          setTagFilters([...tagFilters, tag.name])
        }
      }
    }

    return (
      <div className="catalogue--filters">
        <span className="catalogue--filters__title">Catégories & Genres</span>
        <div className="catalogue--filters__tags">
          {categories.map((cat, key) => {
            return (
              <div
                key={key}
                onClick={() => toggleFilter(cat, 'category')}
                className={`
                catalogue--filters__tag 
                ${clsx({ selected: categoryFilters.includes(cat.name) })}
                `}
              >
                {cat.name}
              </div>
            )
          })}
          {tags.map((tag, key) => {
            return (
              <div
                key={key}
                onClick={() => toggleFilter(tag, 'tag')}
                className={`
                catalogue--filters__tag 
                ${clsx({ selected: tagFilters.includes(tag.name) })}
                `}
              >
                {tag.name}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return <> {displayTags()} </>
}

export default TagFilters
