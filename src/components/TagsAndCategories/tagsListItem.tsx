import { Tag, ItemType } from '../../types/entities'
import './styles/TagsListItem.scss'
import ItemTypeIcon from '../ItemCard/ItemTypeIcon'
import TagActionsCellRender from '../DataGrid/TagActionsCellRender'
import ItemTypeActionsRender from '../DataGrid/ItemTypeActionsRender'

export interface TagsListItemProps {
  item: ItemType | Tag
  isCategory?: boolean
}
const TagsListItem = ({ item, isCategory }: TagsListItemProps) => {
  return (
    <div className={'tagsListItem'}>
      <div className={'tagsListItem__name text-sm'}>
        {isCategory && <ItemTypeIcon itemTypeName={item.name} smallOutlinedIcon={true} classname="pr-5" />}
        {item.name}
      </div>
      {isCategory && (
        <div className={'tagsListItem__prices text-sm'}>
          <div className={'tagsListItem__prices__deposit'}>3€</div>
          <div className={'tagsListItem__prices__rent'}>3€</div>
        </div>
      )}
      <div className={'tagsListItem__icons'}>
        {!isCategory && <TagActionsCellRender tags={item} />}
        {isCategory && <ItemTypeActionsRender itemType={item} />}
      </div>
    </div>
  )
}

export default TagsListItem
