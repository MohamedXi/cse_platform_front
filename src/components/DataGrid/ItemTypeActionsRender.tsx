import React, { MouseEvent, MouseEventHandler, useContext } from 'react'
import { ItemType } from '../../types/entities'
import { ModalContext } from '../../context/Modal'
import { useAppDispatch, RootState } from '../../store'
import { deleteOneItemType, updateOneItemType, unwrapItemType } from '../../actions/itemTypesActions'
import { PostItemType, WithId } from '../../types/dtos'
import { IconButton, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import ItemTypeForm, { ItemTypeFormValues, ItemTypeSchema } from '../Forms/ItemTypeForm'
import { useForm, useFormState } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import StatusDialogContent from '../Dialogs/StatusDialogContent/StatusDialogContent'
import { StatusDialogContentType } from '../../consts/global'
//icons
import CreateOutlineIcon from '@material-ui/icons/CreateOutlined'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'

//selectors
import { allItemTypesSelector } from '../../selectors/itemTypes'

export interface ItemTypeActionsRenderProps {
  itemType: ItemType
}

const ItemTypeActionsRender = ({ itemType }: ItemTypeActionsRenderProps) => {
  const { openConfirmDialog, openAlertDialog, removeModalFromStack } = useContext(ModalContext)
  const dispatch = useAppDispatch()
  const compoundItemType = useSelector((state: RootState) => allItemTypesSelector(state)).find(
    (item) => item.id === itemType.id,
  )

  const deleteItemType = (itemType: PostItemType & WithId) => dispatch(deleteOneItemType(itemType)).then(() => {})

  const errorHandler = (error: any) => {
    openAlertDialog({
      content: <StatusDialogContent status={StatusDialogContentType.ERROR} message={'UN ERREUR EST SURVENUE!'} />,
      onClose: () => {},
      buttonCaption: 'OK',
      modalStyle: { minWidth: 475 },
    })
    console.warn(error)
  }
  const handleDelete = () => {
    removeModalFromStack()
    return deleteItemType(itemType)
      .then(() => {
        openAlertDialog({
          content: (
            <StatusDialogContent
              status={StatusDialogContentType.SUCCESS}
              message={'LA CATÉGORIE A BIEN ÉTÉ SUPPRIMÉE !'}
            />
          ),
          onClose: () => {},
          buttonCaption: 'Super',
          modalStyle: { minWidth: 475 },
        })
      })
      .catch(errorHandler)
  }

  const onDeleteClickHandler: MouseEventHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    if (compoundItemType && compoundItemType.items && compoundItemType.items.length > 0) {
      openAlertDialog({
        content: (
          <StatusDialogContent status={StatusDialogContentType.ERROR} message={'LA CATÉGORIE EST ENCORE UTILISÉE !'} />
        ),
        onClose: () => {},
        buttonCaption: 'Super',
        modalStyle: { minWidth: 475 },
      })
      return
    }
    openConfirmDialog({
      title: 'Supprimer une catégorie',
      content: (
        <Typography className="my-4 pt-2 pb-8">
          Êtes-vous sûr de vouloir supprimer la catégorie <span className="font-bold">{itemType.name}</span>?
        </Typography>
      ),
      onConfirm: handleDelete,
      confirmCaption: 'Oui',
      cancelCaption: 'Non',
      canCloseAfterConfirm: false,
    })
  }

  return (
    <div className="flex flex-row items-center">
      <IconButton size="small" onClick={onDeleteClickHandler} style={{ marginRight: '20px' }}>
        <DeleteOutlinedIcon />
      </IconButton>
      <UpdateItemType itemType={itemType} />
    </div>
  )
}

const UpdateItemType = ({ itemType }: { itemType: ItemType }): JSX.Element => {
  const { openConfirmDialog, openAlertDialog, removeModalFromStack } = useContext(ModalContext)
  const dispatch = useAppDispatch()

  const updateItemType = (itemType: PostItemType & WithId): Promise<ItemType> =>
    dispatch(updateOneItemType(itemType)).then(unwrapResult).then(unwrapItemType)

  const defaultValues: ItemTypeFormValues = {
    name: itemType.name,
    depositPaid: 50,
    rentPrice: 5,
  }

  const { setValue, handleSubmit, control } = useForm<ItemTypeFormValues>({
    defaultValues,
    resolver: zodResolver(ItemTypeSchema),
    mode: 'all',
  })

  const { errors, isSubmitting } = useFormState({ control })

  const errorHandler = (error: any) => {
    openAlertDialog({
      content: <StatusDialogContent status={StatusDialogContentType.ERROR} message={'UN ERREUR EST SURVENUE!'} />,
      onClose: () => {},
    })
    console.warn(error)
  }
  const submitHandler = (formValues: ItemTypeFormValues) => {
    removeModalFromStack()
    const { name } = formValues
    const apiCall = updateItemType({ id: itemType.id, name }).then(() => {
      openAlertDialog({
        content: (
          <StatusDialogContent
            status={StatusDialogContentType.SUCCESS}
            message={'LA CATÉGORIE A BIEN ÉTÉ MODIFIÉE !'}
          />
        ),
        onClose: () => {},
        buttonCaption: 'Super',
        modalStyle: { minWidth: 475 },
      })
    })
    return apiCall.catch(errorHandler)
  }

  const onEditClickHandler: MouseEventHandler = (_event: MouseEvent<HTMLElement>) => {
    openConfirmDialog({
      title: 'Modifier une  Catégorie',
      confirmCaption: 'Modifier',
      content: <ItemTypeForm control={control} setValue={setValue} isSubmitting={isSubmitting} errors={errors} />,
      onConfirm: handleSubmit(submitHandler),
      canCloseAfterConfirm: false,
    })
  }
  return (
    <IconButton size="small" onClick={onEditClickHandler}>
      <CreateOutlineIcon />
    </IconButton>
  )
}

export default ItemTypeActionsRender
