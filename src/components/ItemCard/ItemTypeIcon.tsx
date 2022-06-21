import React from 'react'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset'
import AutoAwesomeMosaic from '@material-ui/icons/AutoAwesomeMosaic'
import Album from '@material-ui/icons/Album'
import HandymanIcon from '@material-ui/icons/Handyman'
import './ItemCard.scss'

export interface ItemTypeIconProps {
  itemTypeName: string
  smallIcon?: boolean
  smallOutlinedIcon?: boolean
  fontSize?: number
  classname?: string
}

function ItemTypeIcon({ itemTypeName, smallOutlinedIcon, smallIcon, fontSize = 24, classname }: ItemTypeIconProps) {
  const getIcon = (itemTypeName: string) => {
    // TODO Switch to images stored in itemType
    switch (itemTypeName.toUpperCase()) {
      case 'LIVRE':
        return <MenuBookIcon />
      case 'JEUX DE SOCIÉTÉ':
        return <MenuBookIcon />
      case 'JEUX VIDÉO':
        return <VideogameAssetIcon />
      case 'MATÉRIELS':
        return <HandymanIcon />
      case 'DVD':
        return <Album />
      default:
        return <AutoAwesomeMosaic />
    }
  }
  return (
    <div
      className={`svg-container ${
        !smallOutlinedIcon ? 'rounded-full text-white  bg-primary-light h-11 w-11 icon-bg ' : ''
      }${smallIcon ? 'h-5 w-5  rounded-full text-white bg-primary-light' : ''}
          flex flex-shrink-0 items-center justify-center justify-centericon-cards ${classname}`}
    >
      {React.cloneElement(getIcon(itemTypeName), { sx: { fontSize } })}
    </div>
  )
}

export default ItemTypeIcon
