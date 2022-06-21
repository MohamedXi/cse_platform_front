import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { TextField } from '@material-ui/core'
import { addMonths } from 'date-fns'
import format from 'date-fns/format'
export interface InputDatePickerProps {
  name: string
  control: Control<any>
  label: string
  setValue: (value: any) => void
}

const InputDatePicker = ({ name, control, label, setValue }: InputDatePickerProps) => {
  const endDate = format(addMonths(new Date(), 6), 'yyyy-MM-dd')
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <TextField
            id="date"
            label={label}
            type="date"
            sx={{ width: 220 }}
            defaultValue={endDate}
            InputLabelProps={{
              shrink: true,
            }}
            required
            margin="normal"
          />
        )
      }}
    />
  )
}

export default InputDatePicker
