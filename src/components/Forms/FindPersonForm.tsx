import { useState } from 'react'
import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import { Typography } from '@material-ui/core'
import Autocomplete, { AutocompleteRenderInputParams, AutocompleteChangeReason } from '@material-ui/core/Autocomplete'

// Redux
import { useSelector } from 'react-redux'
import { allPersonsSelector } from '../../selectors/persons'

// Types
import { Person } from '../../types/entities'

// Components
import BaseTextField from './Inputs/BaseTextField'

export interface FindPersonFormValues {
  userLogin: string
  person: Person
}

export interface FindPersonFormProps {
  control: Control<FindPersonFormValues>
  setValue: UseFormSetValue<FindPersonFormValues>
  getValues?: UseFormGetValues<FindPersonFormValues>
  persons?: Array<Person> | undefined
}

const FindPersonForm = ({ control, setValue, getValues, persons }: FindPersonFormProps) => {
  const [selectedPerson, setSelectedPerson] = useState<Person>({} as Person)

  const customPersons = useSelector(allPersonsSelector)

  const getRenderInput = (params: AutocompleteRenderInputParams) => (
    <BaseTextField
      name="userLogin"
      label="Rechercher un collaborateur (login, nom ou prénom) :"
      placeholder=""
      control={control}
      setValue={(value) => setValue('person', value)}
      required
      disabled={params.disabled}
      fullwidth={params.fullWidth}
      id={params.id}
      inputProps={params.inputProps}
      InputProps={params.InputProps}
      InputLabelProps={params.InputLabelProps}
    />
  )

  const handleChange = (value: Person, reason: AutocompleteChangeReason) => {
    if (reason === 'selectOption' && value) {
      // If the user click on element in the list
      try {
        setValue('userLogin', `${value.firstName} ${value.lastName} (${value.username})`)
        setValue('person', value)
        setSelectedPerson(value as Person)
      } catch (ex) {
        console.warn(ex)
      }
    }
  }

  return (
    <form className="flex flex-col items-start h-56">
      <Autocomplete
        id="userLogin"
        fullWidth
        freeSolo
        disableListWrap
        options={customPersons}
        getOptionLabel={(option) => `${option.firstName} ${option.lastName} (${option.username})`}
        renderInput={(params: AutocompleteRenderInputParams) => getRenderInput(params)}
        onChange={(event, value, reason) => handleChange(value as Person, reason)}
      />
      <div>
        <div className="flex mt-3">
          <Typography className="text-gray-400">Login : </Typography>
          <Typography>{selectedPerson.username}</Typography>
        </div>
        <div className="flex mt-3">
          <Typography className="text-gray-400">Nom : </Typography>
          <Typography>{selectedPerson.lastName}</Typography>
        </div>
        <div className="flex mt-3">
          <Typography className="text-gray-400">Prénom : </Typography>
          <Typography>{selectedPerson.firstName}</Typography>
        </div>
      </div>
    </form>
  )
}

export default FindPersonForm
