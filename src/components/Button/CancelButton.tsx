import React, { MouseEventHandler, PropsWithChildren } from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/styles/withStyles'

export interface CancelButtonProps {
  disabled?: boolean
  onClick?: MouseEventHandler<Element>
  classes?: ClassNameMap
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
  },
}))

function CancelButton({
  disabled = false,
  onClick = () => Promise.resolve(),
  classes = {},
  children = 'ANNULER',
}: PropsWithChildren<CancelButtonProps>) {
  const btnStyles = Object.assign({}, useStyles(), classes)
  return (
    <Button type="button" variant="contained" disabled={disabled} onClick={onClick} classes={btnStyles}>
      {children}
    </Button>
  )
}

export default CancelButton
