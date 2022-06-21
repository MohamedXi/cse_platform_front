import React from 'react'
import { Typography } from '@material-ui/core'
import { format } from 'date-fns'
import { CompoundedRental } from '../../types/entities'

//components
import ItemTypeIcon from '../ItemCard/ItemTypeIcon'

interface EventReturnsLineProps {
  item: CompoundedRental
}

const EventReturnsLine = ({ item }: EventReturnsLineProps) => {
  return (
    <div className="flex flex-row justify-between line-item px-2">
      <ItemTypeIcon itemTypeName={item.item.itemType.name} fontSize={15} smallOutlinedIcon smallIcon />
      <Typography
        lineHeight="1.2rem"
        fontSize="0.875rem"
        component="span"
        className="text-lg  font-semibold text-body name truncate"
        sx={{ marginLeft: '0.2rem' }}
      >
        {item.item.name}
      </Typography>
      <Typography lineHeight="1.2rem" fontSize="0.875rem" component="span" className="text-lg font-semibold text-body">
        {format(item.giveBy ? item.dueDate : item.startDate, 'dd/MM/Y')}
      </Typography>
      <div className="h-full flex flex-row flex-nowrap w-20">
        {item.item.tags.map((tagName, i) => {
          // Return just two tags if there's more tags
          if (i < 2) {
            return (
              <Typography
                key={`tag-${tagName.name}- ${i}`}
                fontSize="0.6rem"
                sx={{ marginRight: '0.2rem', marginTop: '2px' }}
                className="text-white bg-primary py-1 px-1 rounded-sm"
                component="span"
              >
                {tagName.name}
              </Typography>
            )
          }
          return null
        })}
      </div>

      {/*
        Don't show the button until US Add time doesn't dev
       <Button
        variant="contained"
        onClick={() => handleCloseModal}
        color="secondary"
      >
        Ajouter du temps
      </Button> */}
    </div>
  )
}

export default EventReturnsLine
