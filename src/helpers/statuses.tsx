import { MouseEvent, MouseEventHandler, useContext } from 'react';
import { unwrapResult } from '@reduxjs/toolkit'
import { formatDistanceToNow, formatDistanceToNowStrict, isFuture, isPast, isToday } from 'date-fns'
import { Person, CompoundedRental } from '../types/entities'
import { Button, Typography, makeStyles } from '@material-ui/core'
import { fr } from 'date-fns/locale'
import { AccessTime } from '@material-ui/icons'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import CancelButton from '../components/Button/CancelButton'
import HomeIcon from '@material-ui/icons/Home'
import { useAppDispatch } from '../store'
import { Rental } from '../types/entities'
import { CollectedRental, RestitutedRental, } from '../types/dtos'
import { ModalContext } from '../context/Modal'
import { GetCurrentPerson } from '../utils/person'
import { deleteOneRental, unwrapRental, updateRental } from '../actions/rentalsActions'
import { useForm, useFormState } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CollectionCard from  '../components/LocationCard/CollectionCard'
import  { CollectionFormValues, collectionSchema } from '../components/Forms/CollectionForm'
import RestitutionCard from  '../components/LocationCard/RestitutionCard'
import  { RestitutionFormValues, RestitutionSchema } from '../components/Forms/RestitutionForm'

import StatusDialogContent from '../components/Dialogs/StatusDialogContent/StatusDialogContent'
import { StatusDialogContentType } from '../consts/global'



export enum rentalsStatuses {
  RESERVED = 'RESERVED',
  WAITING= 'WAITING',
  LATE = 'LATE',
  PENDING = 'PENDING',
  COMPLETE = 'COMPLETE',
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    minWidth: 141,
  },
}))

export function getRentalStatus({
    startDate,
    dueDate,
    giveBy,
    restitutionBy
  }:
  {
    startDate:Date, 
    dueDate : Date
    giveBy: Person | null,
    restitutionBy :Person | null

  }
): rentalsStatuses {
  if (isPast(startDate)) {
    if(!giveBy){
      return  rentalsStatuses.WAITING
    }
    else{
      if (isFuture(dueDate) && giveBy && !restitutionBy) {
        return rentalsStatuses.PENDING
      } else if (isPast(dueDate) && restitutionBy) {
        return rentalsStatuses.LATE
      } else {
        return rentalsStatuses.COMPLETE
      }
    }
  } 
  else {
    return rentalsStatuses.RESERVED
  }
}

const StatusText = ({ text }: { text: string }) => (
  <Typography
    variant="body1"
    sx={{ fontSize: '0.875rem', lineHeight: 1.2 }}
    className="line-clamp-3 max-h-12 overflow-ellipsis whitespace-normal"
  >
    {text}
  </Typography>
)

export function buildStatusCell(rental: CompoundedRental): JSX.Element[] {
  switch (getRentalStatus(rental)) {
    case rentalsStatuses.RESERVED:
      return [
        <AccessTime style={{ fontSize: '2rem' }} className="text-white bg-primary-light rounded-md p-0.5 mr-2" />,
        <StatusText
          text={`Retrait prévu dans ${formatDistanceToNow(rental.dueDate, {
            locale: fr,
          })}`}
        />,
      ]
      case rentalsStatuses.WAITING:
        return [ 
          <AccessTime style={{ fontSize: '2rem' }} className="text-white bg-primary-light rounded-md p-0.5 mr-1" />,
          <StatusText
            text={isToday(rental.startDate) ? " À retirer aujourd'hui" :  `${formatDistanceToNowStrict(rental.startDate, {
              locale: fr,
              roundingMethod: 'ceil',
              unit: 'day',
            })} jour(s) de retard`}
          />
         ]

    case rentalsStatuses.PENDING:
      return [
        <AccessTime style={{ fontSize: '2rem' }} className="text-white bg-primary-light rounded-md p-0.5 mr-2" />,
        <StatusText
          text={`Retour prévu ${formatDistanceToNowStrict(rental.dueDate, {
            locale: fr,
            addSuffix: true,
            roundingMethod: 'ceil',
            unit: 'day',
          })}`}
        />  
      ]
    case rentalsStatuses.LATE:
      return [
        <FlightTakeoffIcon
          style={{ fontSize: '2rem' }}
          className="text-white bg-primary-light rounded-md p-0.5 mr-2"
        />,
        <StatusText
          text={`${formatDistanceToNowStrict(rental.dueDate, {
            locale: fr,
            roundingMethod: 'ceil',
            unit: 'day',
          })} jour(s) de retard`}
        />,
      ]

    case rentalsStatuses.COMPLETE:
      return [<StatusText text="TERMINÉ" />]

    default:
      return [<StatusText text="STATUT INCONNU" />]
  }
}

export function BuildActionsCell(rental: CompoundedRental): JSX.Element[] {
  switch (getRentalStatus(rental)) {
    case rentalsStatuses.RESERVED:
      return [
        <DeleteStatus rental={rental}/>
      ]
    case rentalsStatuses.WAITING:
      return [
        <CollectionStatus rental={rental}/>,
        <DeleteStatus rental={rental}/>
      ]

    case rentalsStatuses.PENDING:
      return [
          <RestitutionStatus rental={rental}/>
      ]
    case rentalsStatuses.LATE:
      return [
        <RestitutionStatus rental={rental}/>
      ]
    case rentalsStatuses.COMPLETE:
    default:
      return [<Typography variant="body1">COMPLET</Typography>]
  }
}


const CollectionStatus = ({rental}:{rental:CompoundedRental}): JSX.Element=>{
  const { openConfirmDialog,  openAlertDialog, removeModalFromStack } = useContext(ModalContext)
  const dispatch = useAppDispatch()
  const currentUser = GetCurrentPerson()
  const collectionDefaultValues: CollectionFormValues = {
    depositPaid: rental.depositPaid || 50,
    rentPrice:  String(rental.item.rentPrice || 5),
    comment: rental.comment || 'Article retiré'
  }
    const { setValue, getValues, handleSubmit,  control } = useForm<CollectionFormValues>({
      defaultValues:collectionDefaultValues,
      resolver: zodResolver(collectionSchema),
      mode: 'all',
    })
    const { isSubmitting } = useFormState({ control })
    const modifyRental = (updatedRental: CollectedRental): Promise<Rental> =>
    dispatch(updateRental(updatedRental)).then(unwrapResult).then(unwrapRental)

  const errorHandler = (error: any) =>{
    openAlertDialog({
      content: <StatusDialogContent status={StatusDialogContentType.ERROR}
                    message={'UN ERREUR EST SURVENUE!'} /> ,
      onClose : ()  => {},
      buttonCaption:'OK',
      modalStyle: { minWidth: 475}
    })
    console.warn(error)
  }

  const submiCollectiontHandler = (formValues: CollectionFormValues) => { 
      removeModalFromStack()
      const updatedRental: CollectedRental = {
        id:rental.id,
        depositPaid:formValues.depositPaid,
        giveBy: `/api/users/${currentUser?.id}`,
        comment: formValues.comment
      }
      const apiCall = modifyRental(updatedRental).then((response:any) => {
        if(response.error) {
          errorHandler(response.error)
        } else {
          openAlertDialog({
            content: <StatusDialogContent status={StatusDialogContentType.SUCCESS}
                          message={'LE RETRAIT A BIEN ÉTÉ CONFIRMÉ !'} /> ,
            onClose : ()  => {},
            buttonCaption:'Super',
            modalStyle: { minWidth: 475}
          })
        }
        })
      return apiCall.catch(errorHandler) // TODO Manage errors
  }
  const oncollectionClickHandler: MouseEventHandler = (_event: MouseEvent<HTMLElement>) => {
    openConfirmDialog({
      title: 'Retrait',
      confirmCaption: 'CONFIRMER LE RETRAIT',
      content:  <CollectionCard control={control} rental ={rental} setValue={setValue} 
                getValues={getValues} />,
      onConfirm :handleSubmit(submiCollectiontHandler),
      confirmDisabled:isSubmitting,
      canCloseAfterConfirm:false
    })
  }

    return (
      <Button sx={{ marginRight: '.5rem' , minWidth:141}} variant="contained" startIcon={<ExitToAppIcon />}  
      onClick={oncollectionClickHandler}>
        RETRAIT
      </Button>
    )
}

const RestitutionStatus= ({rental}:{rental:CompoundedRental}): JSX.Element=>{
  const { openConfirmDialog, openAlertDialog, removeModalFromStack } = useContext(ModalContext)
  const dispatch = useAppDispatch()
  const currentUser = GetCurrentPerson()
  const restitutionDefaultValues: RestitutionFormValues = {
    comment: 'Article restitué'
  }
  
  const { setValue, getValues, handleSubmit, control } = useForm<RestitutionFormValues>({
    defaultValues:restitutionDefaultValues,
    resolver: zodResolver(RestitutionSchema),
    mode: 'all',
  })

  const modifyRental = (updatedRental: RestitutedRental): Promise<Rental> =>
  dispatch(updateRental(updatedRental)).then(unwrapResult).then(unwrapRental)

  const errorHandler = (error: any) =>{
    openAlertDialog({
      content: <StatusDialogContent status={StatusDialogContentType.ERROR}
                    message={'UN ERREUR EST SURVENUE!'} /> ,
      onClose : ()  => {},
      buttonCaption:'OK',
      modalStyle: { minWidth: 475}
    })
    console.warn(error)
  }

  const submiRestitutiontHandler = (formValues: RestitutionFormValues) => {
    removeModalFromStack()
    const updatedRental: RestitutedRental = {
      id:rental.id,
      restitutionBy: `/api/users/${currentUser?.id}`,
      comment: formValues.comment,
      endDate: new Date()
    }
    const apiCall = modifyRental(updatedRental).then((response:any) => {
      if(response.error) {
        errorHandler(response.error)
      } else {
          openAlertDialog({
            content: <StatusDialogContent status={StatusDialogContentType.SUCCESS}
                          message={'LA RESTITUTION A BIEN ÉTÉ CONFIRMÉE !'} /> ,
            onClose : ()  => {},
            buttonCaption:'Super',
            modalStyle: { minWidth: 475}
          })
      }
      })
    return apiCall.catch(errorHandler) // TODO Manage errors
  }

   const onRestitutionClickHandler: MouseEventHandler = (_event: MouseEvent<HTMLElement>) => {
    openConfirmDialog({
      title: 'Restitution',
      confirmCaption: 'CONFIRMER LA RESTITUTION',
      content:  <RestitutionCard control={control} rental ={rental} setValue={setValue} 
                getValues={getValues} />,
      onConfirm :handleSubmit(submiRestitutiontHandler),
      canCloseAfterConfirm:false
    })
  }

  return (
        <Button  style={{minWidth:141}} sx={{ marginRight: '.5rem' }} variant="contained" startIcon={<HomeIcon />}
        onClick={onRestitutionClickHandler}>
          RESTITUER
        </Button>
  )

}


const DeleteStatus = ({rental}:{rental:CompoundedRental}):JSX.Element =>{
  const { openConfirmDialog, openAlertDialog, removeModalFromStack } = useContext(ModalContext)
  const dispatch = useAppDispatch()

  const errorHandler = (error: any) =>{
    openAlertDialog({
      content: <StatusDialogContent status={StatusDialogContentType.ERROR}
                    message={'UN ERREUR EST SURVENUE!'} /> ,
      onClose : ()  => {},
      buttonCaption:'OK',
      modalStyle: { minWidth: 475}
    })
    console.warn(error)
  }
  const deleteRental = (rental: CompoundedRental) =>{
      removeModalFromStack()
      return dispatch(deleteOneRental({id:rental.id}))
      .then(() => {
          openAlertDialog({
            content: <StatusDialogContent status={StatusDialogContentType.SUCCESS}
                          message={'LA SUPPRESSION A BIEN ÉTÉ CONFIRMÉE !'} /> ,
            onClose : ()  => {},
            buttonCaption:'Super',
            modalStyle: { minWidth: 475}
            })
      })
      .catch((error) => errorHandler(error) )
  }
  const handleDelete = () => deleteRental(rental)
  const onDeleteClickHandler: MouseEventHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    openConfirmDialog({
      title: "Annuler une réservation",
      content: (
        <Typography className="my-4 pt-2 pb-8">
          Êtes-vous sûr de vouloir d'annuler la réservation ?
        </Typography>
      ),
      onConfirm: handleDelete,
      canCloseAfterConfirm:false
    })}
  return <CancelButton  classes={useStyles()} onClick={onDeleteClickHandler} >ANNULER</CancelButton>
}