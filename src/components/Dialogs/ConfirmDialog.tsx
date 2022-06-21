import React, { MouseEvent, MouseEventHandler, useState, cloneElement } from 'react'
import BaseDialog, { BaseDialogProps} from './BaseDialog'
import {TransitionProps } from '@material-ui/core/transitions/transition';
import SubmitButton from '../Button/SubmitButton'
import CancelButton from '../Button/CancelButton'

export interface ConfirmDialogProps extends BaseDialogProps {
  confirmDisabled?: boolean
  confirmCaption?: string
  cancelCaption?: string
  onConfirm: (e: MouseEvent) => Promise<any>
  onCancel?: (e: MouseEvent) => Promise<any>
  isVisibleCancelButton?: boolean
  canCloseAfterConfirm?: boolean
  TransitionComponent ?:  React.JSXElementConstructor<TransitionProps & { children?: React.ReactElement<any, any> }>
}

function ConfirmDialog({
  confirmDisabled = false,
  onConfirm,
  onCancel = () => Promise.resolve(),
  confirmCaption = 'ACCEPTER',
  cancelCaption = 'ANNULER',
  otherDialogProps = {},
  content,
  isVisibleCancelButton = true,
  canCloseAfterConfirm = true,
  TransitionComponent,
  ...props
}: ConfirmDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState<boolean>(false)

  const handleConfirm: MouseEventHandler = (e) => {
    setIsSubmitting(true)
    return onConfirm(e)
      .then(() => {
        setIsSubmitting(false)
        canCloseAfterConfirm && props.onClose && props.onClose(e)
      })
      .catch(() => setIsSubmitting(false))
  }

  const handleCancel: MouseEventHandler = (e) => {
    const promise = onCancel ? onCancel(e) : Promise.resolve()
    return promise.then((res) => {
      props.onClose && props.onClose(e)
      return res
    })
  }

  return (
    <BaseDialog
      content={cloneElement(content, {
        ...(content?.props ?? {}),
        onError: setSubmitBtnDisabled,
      })}
      otherDialogProps={{
        TransitionComponent
      }}
      {...props}
    >
      <SubmitButton
        disabled={submitBtnDisabled || isSubmitting || confirmDisabled}
        submitting={isSubmitting}
        variant="contained"
        type="button"
        onClick={handleConfirm}
      >
        {confirmCaption}
      </SubmitButton>
      {isVisibleCancelButton && (
        <CancelButton disabled={isSubmitting} onClick={handleCancel}>
          {cancelCaption}
        </CancelButton>
      )}
    </BaseDialog>
  )
}

export default ConfirmDialog
