import React from 'react'
import { Typography } from '@material-ui/core'
import ItemTypeIcon from '../ItemCard/ItemTypeIcon'
import { ItemType } from '../../types/entities'

export interface ItemCardRentalHeaderProps {
  itemTypeName: ItemType
  itemName: string
  tagsNames: Array<any>
}

const ItemCardRentalHeader = ({ itemTypeName, itemName, tagsNames }: ItemCardRentalHeaderProps) => {
  return (
    <div
      className="flex flex-row flex-nowrap mb-1 px-4"
      style={{ height: '70px' }}
    >
      <ItemTypeIcon itemTypeName={itemTypeName.name} />
      <div className="flex flex-col items-start ml-3">
        <Typography
          lineHeight="1rem"
          fontSize="0.75rem"
          component="span"
          className="text-lg font-semibold text-body opacity-50 leading-none"
        >
          {itemTypeName.name}
        </Typography>
        <Typography
          lineHeight="0.9rem"
          fontSize="0.875rem"
          component="span"
          className="overflow-ellipsis overflow-hidden text-lg font-semibold text-body line-clamp-2"
        >
          {itemName}
        </Typography>
        <div className="h-4 mt-1 flex flex-row flex-nowrap ">
          {tagsNames.map((tagName, i) => {
            // Return just two tags if there's more tags
            if (i < 2) {
              return (
                <Typography
                  key={`tag-${tagName.name}- ${i}`}
                  fontSize="0.53rem"
                  sx={{ marginRight: '0.2rem' }}
                  className="text-white bg-primary py-0.5 px-2 rounded-sm "
                  component="span"
                >
                  {tagName.name}
                </Typography>
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}

export default ItemCardRentalHeader
