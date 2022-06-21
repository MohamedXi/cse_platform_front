import React from 'react'
import { Typography } from '@material-ui/core'
import ItemTypeIcon from './ItemTypeIcon'
import AvailabiltyFlag from '../ItemCard/AvailabiltyFlag'

export interface ItemCardHeaderProps {
  itemTypeName: string
  itemName: string
  tagsNames: string[]
  inModal?: boolean
  availability: boolean | Date
}

function ItemCardHeader({ itemTypeName, itemName, tagsNames, inModal, availability }: ItemCardHeaderProps) {
  return (
    <div className="flex flex-row flex-nowrap mb-1" style={{ height: '70px' }}>
      <ItemTypeIcon itemTypeName={itemTypeName} />
      <div className="flex flex-col items-start ml-3 w-full">
        <Typography
          lineHeight="1rem"
          fontSize="0.75rem"
          component="span"
          className="text-lg font-semibold text-body opacity-50 text-xs leading-none"
        >
          {itemTypeName}
        </Typography>
        <div className="flex flex-row justify-between w-full">
          <Typography
            lineHeight="1.2rem"
            fontSize="0.875rem"
            component="span"
            className="text-lg font-semibold text-body line-clamp-2"
          >
            {itemName}
          </Typography>
          {/* If the itemcard content belongs in a modal, the tag belongs here */}
          {inModal && <AvailabiltyFlag inModal availability={availability} roundedType="all" />}
        </div>

        <div className="h-4 flex flex-row">
          {tagsNames.map((tagName, i) => {
            return (
              <Typography
                key={`tag-${tagName}- ${i}`}
                fontSize="0.43rem"
                sx={{ marginRight: '0.2rem' }}
                className={`text-white block bg-primary py-1 px-2 rounded-sm ${i >= 2 ? 'hidden' : ''}`}
                component="span"
              >
                {tagName.toUpperCase()}
              </Typography>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ItemCardHeader
