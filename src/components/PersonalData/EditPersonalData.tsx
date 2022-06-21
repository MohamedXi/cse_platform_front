import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../store'
import { FormControl, InputAdornment, TextField } from '@material-ui/core'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import { unwrapPerson, updatePersons, updatePersonsPhone } from '../../actions/personsActions'
import { unwrapResult } from '@reduxjs/toolkit'

// Types
import { Person } from '../../types/entities'
import { PostPersonEmail, PostPersonPhone, WithId } from '../../types/dtos'

//styles
import './styles/EditPersonalData.scss'

export interface EditPersonalDataProps {
  currentUserId: string
  currentUserEmail: string
  currentUserPhone: string
  className: string
}

const EditPersonalData = ({
  currentUserId,
  currentUserEmail,
  currentUserPhone,
  className,
}: // currentUser,
EditPersonalDataProps) => {
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    setEmail(currentUserEmail)
    setPhone(currentUserPhone)
  }, [currentUserEmail, currentUserPhone])

  const updateEmail = (person: PostPersonEmail & WithId): Promise<Person> =>
    dispatch(updatePersons(person)).then(unwrapResult).then(unwrapPerson)

  const updatePhone = (person: PostPersonPhone & WithId): Promise<Person> =>
    dispatch(updatePersonsPhone(person)).then(unwrapResult).then(unwrapPerson)

  const onChangeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const errorChange = (error: any) => console.warn(error)

  //Update email value in base when unfocus the textfield
  const handleOnBlurEmail = () => {
    const apiCall = updateEmail({
      id: currentUserId,
      email: email!,
    })
    return apiCall.catch(errorChange)
  }

  const onChangePhoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }

  const handleOnBlurPhoneNumber = () => {
    const apiCall = updatePhone({
      id: currentUserId,
      phoneNumber: phone!,
    })
    return apiCall.catch(errorChange)
  }

  return (
    <div className={`editData w-full ${className}`}>
      <FormControl className="flex flex-col items-start w-full">
        <TextField
          id="email"
          label="Email"
          className="textField-email w-full"
          placeholder="Adresse mail"
          value={email || ''}
          onChange={onChangeEmailHandler}
          onBlur={handleOnBlurEmail}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CreateOutlinedIcon />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="tel"
          label="Téléphone"
          className="textField-tel w-full"
          value={phone || ''}
          onChange={onChangePhoneHandler}
          onBlur={handleOnBlurPhoneNumber}
          placeholder="Numéro de téléphone"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CreateOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </div>
  )
}

export default EditPersonalData
