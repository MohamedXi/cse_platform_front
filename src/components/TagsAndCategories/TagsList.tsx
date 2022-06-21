import TagsListItem from '../../components/TagsAndCategories/tagsListItem'
import './styles/TagsList.scss'
import SubmitButton from '../Button/SubmitButton'
import { ItemType, Tag } from '../../types/entities'
import AddIcon from '@material-ui/icons/Add'
import { MouseEvent, MouseEventHandler, useContext } from 'react'
import { useAppDispatch } from '../../store'
import { ModalContext } from '../../context/Modal'
import { PostTag, PostItemType } from '../../types/dtos'
import { addOneTag, unwrapTag } from '../../actions/tagsActions'
import { addOneItemType, unwrapItemType} from '../../actions/itemTypesActions'
import { unwrapResult } from '@reduxjs/toolkit'
import TagForm, { TagFormValues, tagSchema } from '../Forms/TagForm'
import ItemTypeForm, { ItemTypeFormValues, ItemTypeSchema } from '../Forms/ItemTypeForm'
import { useForm, useFormState } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import StatusDialogContent from '../Dialogs/StatusDialogContent/StatusDialogContent'
import { StatusDialogContentType } from '../../consts/global'

export interface TagsListProps {
  data: ItemType[] | Tag[]
  title: string
  isCategories?: boolean
}

const TagsList = ({ data, title, isCategories }: TagsListProps) => {
  return (
    <div className={`tagsList ${isCategories ? 'tagsList__categories' : ''}`}>
      <div className={'tagsList--header'}>
        <h2 className="text-base font-bold">{title}</h2>
        {isCategories ? (
          <AddItemType/>
        ) : (
          <AddTag/>
        )}
      </div>
      <div className={'tagsList--list'}>
        <div className={'tagsList--list__labels'}>
          <span className={'tagsList--list__labels__name text-sm'}>{title}</span>
          {isCategories && (
            <div className={'tagsList--list__labels__prices'}>
              <span className={'tagsList--list__labels__prices__deposit'}>Caution</span>
              <span className={'tagsList--list__labels__prices__rent'}>Location</span>
            </div>
          )}
          <div className={'tagsList--list__labels__icons'}></div>
        </div>
        <div className={'tagsList--list__items'}>
          {data.map((item:  ItemType | Tag, index : number) => (
            <TagsListItem item={item} isCategory={isCategories} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

  const AddTag= ():JSX.Element=>{
    const { openConfirmDialog, openAlertDialog, removeModalFromStack } = useContext(ModalContext)
    const dispatch = useAppDispatch()
  
    const addTag = (tag: PostTag): Promise<Tag> => dispatch(addOneTag(tag)).then(unwrapResult).then(unwrapTag)

    const errorHandler = (error: any) => {
      openAlertDialog({
        content: <StatusDialogContent status={StatusDialogContentType.ERROR}
                      message={'UN ERREUR EST SURVENUE !'} /> ,
        onClose : ()  => {},
        buttonCaption:'OK',
        modalStyle: { minWidth: 475}
      })
      console.warn(error)
    }
  
    const defaultValues: TagFormValues = {
      name: '',
    }
  
    const { setValue, handleSubmit, control } = useForm<TagFormValues>({
      defaultValues,
      resolver: zodResolver(tagSchema),
      mode: 'all',
    })
  
    const { errors, isSubmitting } = useFormState({ control })

    const submitHandler = (formValues: TagFormValues) => {
      removeModalFromStack()
      const apiCall = addTag({ ...formValues }).then( () =>
        openAlertDialog({
          content: <StatusDialogContent status={StatusDialogContentType.SUCCESS}
                        message={'Le TAG A BIEN ÉTÉ AJOUTÉ !'} /> ,
          onClose : ()  => {},
          buttonCaption:'Super',
          modalStyle: { minWidth: 475}
          })
      )
      return apiCall.catch(errorHandler)
    }
  
    const onEditClickHandler: MouseEventHandler = (_event: MouseEvent<HTMLElement>) => {
      openConfirmDialog({
        title: 'Nouveau tag',
        confirmCaption:'CRÉER',
        content: <TagForm control={control} setValue={setValue} isSubmitting={isSubmitting} errors={errors} />,
        onConfirm: handleSubmit(submitHandler),
        canCloseAfterConfirm:false
      })
    }
    return  (
        <SubmitButton leftIcon={<AddIcon />} onClick={onEditClickHandler}>
          Ajouter un tag
        </SubmitButton>
    )
  } 

  const AddItemType = ():JSX.Element =>{
    const { openConfirmDialog, openAlertDialog, removeModalFromStack } = useContext(ModalContext)
    const dispatch = useAppDispatch()
  
    const addItemType = (ItemType: PostItemType): Promise<ItemType> => dispatch(addOneItemType(ItemType)).then(unwrapResult).then(unwrapItemType)
    
    const errorHandler = (error: any) => {
      openAlertDialog({
        content: <StatusDialogContent status={StatusDialogContentType.ERROR}
                      message={'UN ERREUR EST SURVENUE !'} /> ,
        onClose : ()  => {},
        buttonCaption:'OK',
        modalStyle: { minWidth: 475}
      })
      console.warn(error)
    }

    const defaultValues: ItemTypeFormValues = {
      name: '',
      depositPaid: 50,  
      rentPrice:  5,
    }
  
    const { setValue, handleSubmit, control } = useForm<ItemTypeFormValues>({
      defaultValues,
      resolver: zodResolver(ItemTypeSchema),
      mode: 'all',
    })
  
    const { errors, isSubmitting } = useFormState({ control })
  
  
    const submitHandler = (formValues: ItemTypeFormValues) => {
      removeModalFromStack()
      const {name}= formValues
      const apiCall = addItemType({ name }).then( () =>
          openAlertDialog({
            content: <StatusDialogContent status={StatusDialogContentType.SUCCESS}
                          message={'LA CATÉGORIE A BIEN ÉTÉ AJOUTÉE !'} /> ,
            onClose : ()  => {},
            buttonCaption:'Super',
            modalStyle: { minWidth: 475}
            })
      )
      return apiCall.catch(errorHandler)
    }
  
    const onEditClickHandler: MouseEventHandler = (_event: MouseEvent<HTMLElement>) => {
      openConfirmDialog({
        title: 'Nouvelle Catégorie',
        confirmCaption:'CRÉER',
        content: <ItemTypeForm control={control} setValue={setValue} isSubmitting={isSubmitting} errors={errors} />,
        onConfirm: handleSubmit(submitHandler),
        canCloseAfterConfirm:false
      })
    }
    return  (
      <SubmitButton leftIcon={<AddIcon />} onClick={onEditClickHandler}>Ajouter une catégorie</SubmitButton>
    )
  }




export default TagsList
