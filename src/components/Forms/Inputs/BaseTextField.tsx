import React from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'
import { TextField } from '@material-ui/core'
import CSS from 'csstype'

export interface TextFieldProps {
  name: string
  control: Control<any>
  label: string
  placeholder?: string
  disabled?: boolean
  margin?: 'normal' | 'dense'
  variant?: 'standard' | 'outlined' | 'filled'
  error?: FieldError
  required?: boolean
  multiline?: boolean
  fullwidth?: boolean
  rows?: string | number // Should be int
  style?: CSS.Properties
  type?: 'number' | 'text'
  setValue: (value: any) => void
  inputProps?: Object
  InputProps?: Object
  InputLabelProps?: Object
  id?: string
}

const BaseTextField = ({
  name,
  label,
  control,
  placeholder,
  error,
  required = false,
  disabled = false,
  margin = 'normal',
  variant = 'outlined',
  multiline = false,
  fullwidth = false,
  rows,
  style,
  type = 'text',
  setValue,
  inputProps = {},
  InputProps = {},
  InputLabelProps = {},
  id = '',
}: TextFieldProps) => {
  const minWidth = '8rem'
  const handleChange = (value: string | undefined) => {
    if (!value) {
      if (required) {
        setValue(type === 'number' ? 0 : '')
      } else {
        setValue(null)
      }
    } else if (type === 'number') {
      setValue(parseFloat(value))
    } else {
      setValue(value)
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...others } }) => {
        return (
          <TextField
            {...others}
            id={id}
            inputProps={inputProps}
            InputProps={InputProps}
            InputLabelProps={InputLabelProps}
            onChange={(e: any) => handleChange(e?.target?.value)}
            label={label}
            placeholder={placeholder ?? label}
            margin={margin}
            required={required}
            variant={variant}
            error={!!error}
            helperText={error?.message ?? ''}
            disabled={disabled}
            fullWidth={fullwidth}
            multiline={multiline}
            rows={rows}
            style={{ ...style, minWidth }}
            type={type}
          />
        )
      }}
    />
  )
}

export default BaseTextField
