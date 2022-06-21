import React, { PropsWithChildren, useEffect, useState } from 'react'

// Components
import  Slide  from '@material-ui/core/Slide'
import AlertDialog, { AlertDialogProps } from '../components/Dialogs/AlertDialog'
import ConfirmDialog, { ConfirmDialogProps } from '../components/Dialogs/ConfirmDialog'



type OpenAlertDialogProps = Omit<AlertDialogProps, 'open' | 'closeModal'>
type OpenConfirmDialogProps = Omit<ConfirmDialogProps, 'open' | 'onClose'>

export const ModalContext = React.createContext({
  openAlertDialog: (_props: OpenAlertDialogProps) => {},
  openConfirmDialog: (_props: OpenConfirmDialogProps) => {},
  removeModalFromStack : () => {}
})

export function ModalProvider(props: PropsWithChildren<any>) {
  const [modalStack, setModalStack] = useState<JSX.Element[]>([])

  useEffect(() => {}, [modalStack])

  function addModalToStack(modal: JSX.Element) {
    setModalStack((modalStack) => modalStack.concat([modal]))
  }

  function removeModalFromStack() {
    setModalStack((modalStack) => modalStack.slice(0, -1))
  }

  function openAlertDialog(props: OpenAlertDialogProps) {
    return addModalToStack(
      <AlertDialog
        {...props}
        open={true}
        onClose={(e) => {
          props.onClose && props.onClose(e)
          removeModalFromStack()
        }}
        TransitionComponent={React.forwardRef(function Transition(props, ref) {
          return <Slide direction="up" ref={ref} {...props} />;
          })}
      />,
    )
  }

  function openConfirmDialog(props: OpenConfirmDialogProps) {
    return addModalToStack(
    <ConfirmDialog {...props} open={true} 
    TransitionComponent={React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
      })}
      onClose={removeModalFromStack} />)
  }

  return (
    <ModalContext.Provider value={{ openAlertDialog, openConfirmDialog, removeModalFromStack  }}>
      {props.children}
      {modalStack.map((modal, i) => React.cloneElement(modal, { key: `modal-${i}` }))}
    </ModalContext.Provider>
  )
}
