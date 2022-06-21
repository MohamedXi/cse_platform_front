import React from 'react'
import { Button } from '@material-ui/core'
import BaseDialog, { BaseDialogProps } from './BaseDialog'
import {TransitionProps } from '@material-ui/core/transitions/transition';

export interface AlertDialogProps extends BaseDialogProps {
  buttonCaption?: string
  TransitionComponent ?:  React.JSXElementConstructor<TransitionProps & { children?: React.ReactElement<any, any> }>

}

/**
 * Wrapper around the BaseDialog that provide a single action button which triggers the onClose.
 *
 * @param buttonCaption
 * @param baseDialogProps
 * @constructor
 */
function AlertDialog({ buttonCaption = 'OK',TransitionComponent, ...baseDialogProps }: AlertDialogProps) {
  return (
    <BaseDialog closeIcon="none"  
      otherDialogProps={{ TransitionComponent}}
      {...baseDialogProps}>
      <Button variant="contained" onClick={baseDialogProps.onClose} color="primary">
        {buttonCaption}
      </Button>
    </BaseDialog>
  )
}

export default AlertDialog
