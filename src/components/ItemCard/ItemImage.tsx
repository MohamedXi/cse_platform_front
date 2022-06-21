import React from 'react'
import { CardMedia, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((_theme) => ({
  root: {
    width: '94.5px',
    height: '137px',
    boxShadow: '0px 3px 6px #00000029',
  },
}))

export interface ItemImageProps {
  alt: string
  title: string
  src?: string
}

function ItemImage(props: ItemImageProps) {
  const classes = useStyles()
  return <CardMedia className={classes.root} component="img" {...props} />
}

export default ItemImage
