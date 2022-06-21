import React, {MouseEventHandler, MouseEvent, useState, useContext} from 'react'
import { RouteComponentProps } from '@reach/router'
import { deleteOneItem } from '../../actions/itemsActions'
import ItemForm from '../../components/Forms/ItemForm'
import EditItemForm from '../../components/Forms/EditItemForm'
import CloneItemForm from '../../components/Forms/CloneItemForm'
import { IconButton, Typography } from '@material-ui/core'
import SubmitButton from '../../components/Button/SubmitButton'
import AddIcon from '@material-ui/icons/Add'
import BaseDialog from '../../components/Dialogs/BaseDialog'
import StatusDialogContent from '../../components/Dialogs/StatusDialogContent/StatusDialogContent'
import { StatusDialogContentType } from '../../consts/global'
import { useAppDispatch } from '../../store'
import { ModalContext } from '../../context/Modal'

//icons
import CreateOutlineIcon from '@material-ui/icons/CreateOutlined'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import ContentCopy from '@material-ui/icons/ContentCopy'

//type 
import { Item }  from  '../../types/entities'

const ItemEditPage = (_props: RouteComponentProps) => {
  return (
    <section>
      <Typography variant="h1">Ajouter un objet</Typography>
    </section>
  )
}

export const  ItemAddButton =():JSX.Element=>{
  const { openAlertDialog } = useContext(ModalContext)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleError = (error: any) => {
    setOpenModal(false)
    openAlertDialog({
      content: <StatusDialogContent status={StatusDialogContentType.ERROR}
                    message={'UN ERREUR EST SURVENUE!'} /> ,
      onClose : ()  => {},
      modalStyle: { minWidth: 475}
    })
    console.warn(error)
  }

  const confirm = (resp: any) => {
    setOpenModal(false)
    openAlertDialog({
        content: <StatusDialogContent status={StatusDialogContentType.SUCCESS}
                      message={"L'ARTICLE A BIEN ÉTÉ CREÉ  !"} /> ,
        onClose : ()  => {},
        buttonCaption:'Super',
        modalStyle: { minWidth: 475}
     })
  }
  const cancel =  ( ) => setOpenModal(false) 

  return (
    <div className="mr-4">
      <SubmitButton leftIcon={<AddIcon />} color="secondary" onClick={()=>setOpenModal(true)}>
        Nouvel article
      </SubmitButton>
      <BaseDialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          content={
              <ItemForm {...{confirm, handleError, cancel}} />
          }
          otherDialogProps={{
            maxWidth:false}
          }
        />
    </div>
  )
}

export const  ItemDeleteButton =({item,  status} : {item : Item, status: string}):JSX.Element=>{
  const { openConfirmDialog, openAlertDialog, removeModalFromStack } = useContext(ModalContext)
  const dispatch = useAppDispatch()
  const errorHandler = (error: any) => {
    openAlertDialog({
      content: <StatusDialogContent status={StatusDialogContentType.ERROR}
                    message={'UN ERREUR EST SURVENUE!'} /> ,
      onClose : ()  => {},
    })
    console.warn(error)
  }

  const handleDelete = () => {
    removeModalFromStack()
    return  dispatch(deleteOneItem({id:item.id})).then(() => 
    openAlertDialog({
      content: <StatusDialogContent status={StatusDialogContentType.SUCCESS}
                    message={'LA SUPPRESSION A BIEN ÉTÉ CONFIRMÉE !'} /> ,
      onClose : ()  => {},
      buttonCaption:'Super',
      modalStyle: { minWidth: 475}
      })
    )
    .catch(errorHandler)
  }

  const onDeleteClickHandler: MouseEventHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    if(status!=='INDISPONIBLE' && status !=='DISPONIBLE'){
      openAlertDialog({
        content: <StatusDialogContent status={StatusDialogContentType.ERROR}
                      message={"L'ARTICLE EST EN COURS DE RÉSÉRVATION !"} /> ,
        onClose : ()  => {},
        buttonCaption:'OK',
        modalStyle: { minWidth: 475}
        })
        return
    }
    openConfirmDialog({
      title: "Supprimer un article",
      content: (
        <Typography className="my-4 pt-2 pb-8">
          Êtes-vous sûr de vouloir supprimer l'arctile <span className="font-bold">{item.name}</span>?
        </Typography>
      ),
      onConfirm: handleDelete,
      confirmCaption:'Oui',
      cancelCaption: 'Non',
      canCloseAfterConfirm:false
    })
  }

  return <IconButton  style={{outline: 'none'}} ria-label="modify" size="small" onClick={onDeleteClickHandler}>
      <DeleteOutlinedIcon />
    </IconButton>
}


export const  ItemEditButton =({item,  status} : {item : Item, status: string}):JSX.Element=>{
  const { openAlertDialog } = useContext(ModalContext)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleError = (error: any) => {
    setOpenModal(false)
    openAlertDialog({
      content: <StatusDialogContent status={StatusDialogContentType.ERROR}
                    message={'UN ERREUR EST SURVENUE!'} /> ,
      onClose : ()  => {},
      modalStyle: { minWidth: 475}
    })
    console.warn(error)
  }

  const confirm = (resp: any) => {
    setOpenModal(false)
    openAlertDialog({
        content: <StatusDialogContent status={StatusDialogContentType.SUCCESS}
                      message={"L'ARTICLE A BIEN ÉTÉ MODIFIÉ  !"} /> ,
        onClose : ()  => {},
        buttonCaption:'Super',
        modalStyle: { minWidth: 475}
     })
  }
  const cancel =  ( ) => setOpenModal(false)
  
  const onEditButtonHandler : MouseEventHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    if(status!=='INDISPONIBLE' && status !=='DISPONIBLE'){
      openAlertDialog({
        content: <StatusDialogContent status={StatusDialogContentType.ERROR}
                      message={"L'ARTICLE EST EN COURS DE RÉSÉRVATION !"} /> ,
        onClose : ()  => {},
        buttonCaption:'OK',
        modalStyle: { minWidth: 475}
        })
        return
    }
    setOpenModal(true)
  }
  return (
    <div className="mr-4">
      <IconButton style={{outline: 'none'}} ria-label="modify" size="small" onClick={onEditButtonHandler}>
          <CreateOutlineIcon />
      </IconButton>
      <BaseDialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          content={
              <EditItemForm {...{item, confirm, handleError, cancel}} />
          }
          otherDialogProps={{
            maxWidth:false}
          }
        />
    </div>
  )
}

export const  ItemCloneButton =({item} : {item : Item}):JSX.Element=>{
  const clonedItem= {...item, name:`copie ${item.name}`} as Item
  const { openAlertDialog } = useContext(ModalContext)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleError = (error: any) => {
    setOpenModal(false)
    openAlertDialog({
      content: <StatusDialogContent status={StatusDialogContentType.ERROR}
                    message={'UN ERREUR EST SURVENUE!'} /> ,
      onClose : ()  => {},
      modalStyle: { minWidth: 475}
    })
    console.warn(error)
  }

  const confirm = (resp: any) => {
    setOpenModal(false)
    openAlertDialog({
        content: <StatusDialogContent status={StatusDialogContentType.SUCCESS}
                      message={"L'ARTICLE A BIEN ÉTÉ MODIFIÉ  !"} /> ,
        onClose : ()  => {},
        buttonCaption:'Super',
        modalStyle: { minWidth: 475}
     })
  }
  const cancel =  ( ) => setOpenModal(false) 

  return (
    <div className="mr-4">
      <IconButton  style={{outline: 'none'}} ria-label="modify" size="small" onClick={()=>setOpenModal(true)}>
        <ContentCopy />
      </IconButton>
      <BaseDialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          content={
              <CloneItemForm {...{item : clonedItem, confirm, handleError, cancel}} />
          }
          otherDialogProps={{
            maxWidth:false}
          }
        />
    </div>
  )
}


export default ItemEditPage
