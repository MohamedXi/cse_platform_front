import React, { useEffect, useContext } from 'react'
import { Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos'
import IconButton from '@material-ui/core/IconButton'
import { RouteComponentProps, navigate } from '@reach/router'
import { useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { personAdminWithoutStorekeeperSelector, personsStorekeeperSelector } from '../../selectors/persons'
import { getAllPersons } from '../../actions/personsActions'
import { getAllAgencies } from '../../actions/agenciesActions'
import { useForm } from 'react-hook-form'
import { unwrapResult } from '@reduxjs/toolkit'
import { ICellRendererParams } from 'ag-grid-community'

// Context
import { ModalContext } from '../../context/Modal'

// Types
import { Person, Role } from '../../types/entities'
import { PostPersonRoles, WithId } from '../../types/dtos'

// Enums
import { Roles } from '../../consts/roles'
// import { StatusDialogContentType } from '../../consts/global'

// Actions
import { unwrapPerson, updatePersonRoles } from '../../actions/personsActions'

// Utils
import { getTextByRole } from '../../utils'

// Components
import DataGrid from '../../components/DataGrid/DataGrid'
import BaseTextCellRenderer from '../../components/DataGrid/BaseTextCellRenderer'
import StatusDialogContent from '../../components/Dialogs/StatusDialogContent/StatusDialogContent'
import { StatusDialogContentType } from '../../consts/global'

//css
import './styles/CreaPersons.scss'

import { ColDef } from 'ag-grid-community'
import SubmitButton from '../../components/Button/SubmitButton'
import FindPersonForm, { FindPersonFormValues } from '../../components/Forms/FindPersonForm'
// import StatusDialogContent from '../../components/Dialogs/StatusDialogContent/StatusDialogContent'

const CreaLocPersons = (_props: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const personAdminWithoutStorekeeper = useSelector(personAdminWithoutStorekeeperSelector)
  const personsStrekeeper = useSelector(personsStorekeeperSelector)

  const { openConfirmDialog, openAlertDialog, removeModalFromStack } = useContext(ModalContext)

  const gridData = personsStrekeeper.map((p: Person) => ({
    ...p,
    role: getTextByRole(Object.values(p.roles).includes(Roles.admin) ? Roles.admin : Roles.storekeeper),
  }))

  const cols: ColDef[] = [
    { field: 'username', headerName: 'Login', cellRenderer: 'baseTextCellRender', resizable: true, minWidth: 70 },
    { field: 'lastName', headerName: 'Nom', cellRenderer: 'baseTextCellRender', resizable: true, minWidth: 70 },
    { field: 'firstName', headerName: 'Prénom', cellRenderer: 'baseTextCellRender', resizable: true, minWidth: 70 },
    {
      field: 'role',
      headerName: 'Rôle',
      cellRenderer: 'baseTextCellRender',
      resizable: true,
      minWidth: 70,
    },
    {
      field: 'actions',
      headerName: '       ',
      resizable: true,
      minWidth: 70,
      cellRendererFramework: (params: ICellRendererParams) =>
        params.data.roles.includes(Roles.storekeeper) && (
          <IconButton aria-label="delete" onClick={() => handleClickDeleteStorekeeper(params.data)}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        ),
    },
  ]

  const defaultValues: FindPersonFormValues = {
    userLogin: '',
    person: {} as Person,
  }

  const { setValue, handleSubmit, control } = useForm<FindPersonFormValues>({
    defaultValues,
    mode: 'all',
  })

  useEffect(() => {
    dispatch(getAllPersons())
    dispatch(getAllAgencies())
  }, [dispatch])

  const updatePerson = (person: PostPersonRoles & WithId): Promise<Person> =>
    dispatch(updatePersonRoles(person)).then(unwrapResult).then(unwrapPerson)

  const errorHandler = (error: any) => {
    openAlertDialog({
      content: <StatusDialogContent status={StatusDialogContentType.ERROR} message={'UN ERREUR EST SURVENUE!'} />,
      onClose: () => {},
    })
    console.warn(error)
  }

  const submitHandlerAddStorekeeper = (formValues: FindPersonFormValues) => {
    removeModalFromStack()
    const apiCall = updatePerson({
      id: formValues.person.id,
      roles: [...formValues.person.roles, Roles.storekeeper],
    }).then(() => {
      openAlertDialog({
        content: (
          <StatusDialogContent status={StatusDialogContentType.SUCCESS} message={'LE MAGASINIER A BIEN ÉTÉ AJOUTÉ !'} />
        ),
        onClose: () => {},
        buttonCaption: 'Super',
        modalStyle: { minWidth: 475 },
      })
    })
    return apiCall.catch(errorHandler)
  }

  /**
   * To the delete the storekeeper
   * @param personToDelete - the storekeeper to delete
   */
  const handleDeleteStorekeeper = (personToDelete: Person) => {
    removeModalFromStack()
    const apiCall = updatePerson({
      id: personToDelete.id,
      roles: Object.values(personToDelete.roles).filter((role: Role) => role !== Roles.storekeeper),
    }).then(() => {
      openAlertDialog({
        content: (
          <StatusDialogContent
            status={StatusDialogContentType.SUCCESS}
            message={'LE MAGASINIER A BIEN ÉTÉ SUPPRIMÉ !'}
          />
        ),
        onClose: () => {},
        buttonCaption: 'Super',
        modalStyle: { minWidth: 475 },
      })
    })
    return apiCall.catch(errorHandler)
  }

  const handleClickAddStorekeeper = () => {
    openConfirmDialog({
      title: 'Ajouter un magasinier',
      content: <FindPersonForm control={control} setValue={setValue} persons={personAdminWithoutStorekeeper} />,
      confirmCaption: 'Ajouter',
      onConfirm: handleSubmit(submitHandlerAddStorekeeper),
      modalStyle: { minWidth: 500 },
      canCloseAfterConfirm: false,
    })
  }

  //   /**
  //    * To open the modal to confirm the success suppression of the storekeeper
  //    */
  //   const handleSuccessAddStorekeeper = () => {
  //     openAlertDialog({
  //       content: (
  //         <StatusDialogContent
  //           status={StatusDialogContentType.SUCCESS}
  //           message={'LE MAGASINIER &Agrave; BIEN &Eacute;T&Eacute; AJOUT&Eacute;'}
  //         />
  //       ),
  //       onClose: () => {},
  //       modalStyle: {
  //         minWidth: 475,
  //         paddingTop: '2rem',
  //         backgroundImage: "url('/ressources/images/Groupe_456.png')",
  //         backgroundSize: '70%',
  //         backgroundPositionX: '155%',
  //         backgroundPositionY: '45%',
  //         backgroundRepeat: 'no-repeat',
  //       },
  //     })
  //   }

  /**
   * To open the modal to confirm the suppression of the storekeeper
   * @param personToDelete
   */
  const handleClickDeleteStorekeeper = (personToDelete: Person) => {
    openConfirmDialog({
      title: 'Supprimer un magasinier',
      content: (
        <div className="h-16">
          <Typography>{`Êtes-vous sûr de vouloir supprimer le magasinier ${personToDelete.firstName} ${personToDelete.lastName} ?`}</Typography>
        </div>
      ),
      confirmCaption: 'Supprimer',
      onConfirm: () => handleDeleteStorekeeper(personToDelete),
      canCloseAfterConfirm: false,
    })
  }

  return (
    <section className="h-full flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <div className="flex flex-col justify-center cursor-pointer" onClick={() => navigate('/')}>
            <ArrowBackIcon style={{ height: '14px' }} />
          </div>
          <Typography
            variant="h1"
            style={{
              fontSize: '1.5rem',
              letterSpacing: '2.2px',
              paddingLeft: 0,
            }}
          >
            Magasiniers
          </Typography>
        </div>
        <SubmitButton leftIcon={<AddIcon />} onClick={() => handleClickAddStorekeeper()}>
          Ajouter un magasinier
        </SubmitButton>
      </div>
      <div className="flex flex-grow items-center justify-center overflow-hidden mb-8">
        <DataGrid
          data={gridData}
          cols={cols}
          frameworkComponents={{
            baseTextCellRender: BaseTextCellRenderer,
          }}
          rowClass="h-14 flex row  flex-row items-center rounded mb-7"
          defaultColDef={{
            filter: false,
            floatingFilter: false,
            suppressMenu: false,
            sortable: true,
            cellClass: (_params) => {
              return 'flex flex-row items-center justify-center w-full h-full overflow-hidden overflow-ellipsis bg-white'
            },
          }}
        />
      </div>
    </section>
  )
}

export default CreaLocPersons
