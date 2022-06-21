import React, { MouseEvent, MouseEventHandler, useContext } from 'react'
import { IconButton, Typography } from '@material-ui/core'
import CreateOutlineIcon from '@material-ui/icons/CreateOutlined'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import { ModalContext } from '../../context/Modal'
import { useForm, useFormState } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import TagForm, { TagFormValues, tagSchema } from '../Forms/TagForm'
import { useAppDispatch } from '../../store'
import { PostTag, WithId } from '../../types/dtos'
import { Tag } from '../../types/entities'
import { deleteOneTag, unwrapTag, updateOneTag } from '../../actions/tagsActions'
import { unwrapResult } from '@reduxjs/toolkit'
import StatusDialogContent from '../Dialogs/StatusDialogContent/StatusDialogContent'
import { StatusDialogContentType } from '../../consts/global'

export interface TagsActionsRenderProps {
  tags: Tag
}

const TagActionsCellRender = ({ tags }: TagsActionsRenderProps) => {
  const { openConfirmDialog, openAlertDialog, removeModalFromStack } = useContext(ModalContext)
  const dispatch = useAppDispatch()

  const updateTag = (tag: PostTag & WithId): Promise<Tag> =>
    dispatch(updateOneTag(tag)).then(unwrapResult).then(unwrapTag)

  const deleteTag = (tag: PostTag & WithId) => dispatch(deleteOneTag(tag)).then(() => {})

  const defaultValues: TagFormValues = {
    name: tags.name ?? '',
  }

  const { setValue, handleSubmit, control } = useForm<TagFormValues>({
    defaultValues,
    resolver: zodResolver(tagSchema),
    mode: 'all',
  })

  const { errors, isSubmitting } = useFormState({ control })

  const errorHandler = (error: any) => {
    openAlertDialog({
      content: <StatusDialogContent status={StatusDialogContentType.ERROR} message={'UN ERREUR EST SURVENUE!'} />,
      onClose: () => {},
      buttonCaption: 'OK',
      modalStyle: { minWidth: 475 },
    })
    console.warn(error)
  }

  const submitHandler = (formValues: TagFormValues) => {
    removeModalFromStack()
    const apiCall = updateTag({ id: tags.id, ...formValues }).then(() =>
      openAlertDialog({
        content: (
          <StatusDialogContent status={StatusDialogContentType.SUCCESS} message={'Le TAG A BIEN ÉTÉ MODIFIÉ !'} />
        ),
        onClose: () => {},
        buttonCaption: 'Super',
        modalStyle: { minWidth: 475 },
      }),
    )
    return apiCall.catch(errorHandler)
  }

  const onEditClickHandler: MouseEventHandler = (_event: MouseEvent<HTMLElement>) => {
    openConfirmDialog({
      title: 'Modifier un tag',
      content: <TagForm control={control} setValue={setValue} isSubmitting={isSubmitting} errors={errors} />,
      onConfirm: handleSubmit(submitHandler),
      confirmCaption: 'Modifier',
      canCloseAfterConfirm: false,
    })
  }

  const handleDelete = () => {
    removeModalFromStack()
    return deleteTag(tags)
      .then(() =>
        openAlertDialog({
          content: (
            <StatusDialogContent
              status={StatusDialogContentType.SUCCESS}
              message={'LA SUPPRESSION A BIEN ÉTÉ CONFIRMÉE !'}
            />
          ),
          onClose: () => {},
          buttonCaption: 'Super',
          modalStyle: { minWidth: 475 },
        }),
      )
      .catch(errorHandler)
  }

  const onDeleteClickHandler: MouseEventHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    openConfirmDialog({
      title: 'Supprimer un tag',
      content: (
        <Typography className="my-4 pt-2 pb-8">
          Êtes-vous sûr de vouloir supprimer le tag <span className="font-bold">{tags.name}</span>?
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
      <IconButton size="small" onClick={onEditClickHandler}>
        <CreateOutlineIcon />
      </IconButton>
    </div>
  )
}

export default TagActionsCellRender
