import React, { CSSProperties, PropsWithChildren, ReactEventHandler } from 'react'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  makeStyles,
} from '@material-ui/core'
import { ClassNameMap } from '@material-ui/styles/withStyles'

export interface BaseDialogProps {
  open: boolean
  content: React.ReactElement
  onClose: ReactEventHandler<{}>
  disableBackdropClick?: boolean
  title?: string
  closeIcon?: 'none' | 'default' | 'white'
  classes?: ClassNameMap
  modalStyle?: CSSProperties
  otherDialogProps?: Partial<DialogProps>
}

const useStyles = makeStyles(() => ({
  root: {},
  paper: { background: 'none', boxShadow: 'none', borderRadius: '1rem' },
  closeIconClasses: { position: 'absolute', top: '0.25rem', right: '0.25rem' },
  actionsClasses: {
    transform: 'translateY(-50%)',
    justifyContent: 'center',
    marginLeft: '2rem',
    marginRight: '2rem',
  },
}))

function BaseDialog({
  open,
  title,
  content,
  disableBackdropClick = true,
  children,
  onClose,
  closeIcon = 'default',
  classes = {},
  modalStyle = {},
  otherDialogProps = {},
}: PropsWithChildren<BaseDialogProps>) {
  const materialClasses = Object.assign({}, useStyles(), classes)
  const { actionsClasses, closeIconClasses, ...dialogClasses } = materialClasses

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onBackdropClick={disableBackdropClick ? onClose : undefined}
      aria-labelledby={title ? 'alert-dialog-title' : ''}
      classes={dialogClasses}
      {...otherDialogProps}
    >
      <div className="flex flex-col rounded-2xl bg-white" style={modalStyle}>
        <div className="relative flex flex-row items-center justify-center w-full">
          {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
          {closeIcon !== 'none' && (
            <IconButton size="small" className={closeIconClasses} onClick={onClose}>
              <CloseRoundedIcon
                style={{
                  fontSize: '1.2rem',
                  color: closeIcon === 'white' ? 'white' : 'inherit',
                }}
              />
            </IconButton>
          )}
        </div>
        <DialogContent>{content}</DialogContent>
      </div>
      {children && <DialogActions className={actionsClasses}>{children}</DialogActions>}
    </Dialog>
  )
}

export default BaseDialog
