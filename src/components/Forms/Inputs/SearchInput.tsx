import { Control } from 'react-hook-form'
import Autocomplete from '@material-ui/lab/Autocomplete'

// Components
import BaseTextField from './BaseTextField'

export interface SearchInputProps {
  inputName: string
  label: string
  control: Control<any>
  setValue: (value: string) => void
  getValues?: () => string
  suggestions: any[]
}

const SearchInput = ({ inputName, label, control, setValue, suggestions }: SearchInputProps) => {
  const getRenderInput = () => (
    <BaseTextField name={inputName} label={label} control={control} setValue={(value) => setValue(value)} required />
  )

  return (
    <Autocomplete
      id="combo-box-demo"
      options={suggestions}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => getRenderInput()}
    />
  )
}

export default SearchInput
