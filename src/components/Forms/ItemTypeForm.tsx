import React from 'react'
import BaseTextField from './Inputs/BaseTextField'
import { InputAdornment } from '@material-ui/core'
import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import z from '../../helpers/zod'
import './styles/ItemTypeForm.scss'

export const ItemTypeSchema = z.object({
  name: z.string().nonempty({ message: 'Le titre est obligatoire' }),
  depositPaid: z.number(),
  rentPrice: z.number()
})

export interface ItemTypeFormValues {
  name: string,
  depositPaid: number,  
  rentPrice:  number,
}

export interface ItemTypeFormProps {
  control: Control<ItemTypeFormValues>
  setValue: UseFormSetValue<ItemTypeFormValues>
  getValues?: UseFormGetValues<ItemTypeFormValues>
  isSubmitting: boolean
  errors: any
}

const ItemTypeForm = ({ control, setValue, isSubmitting, errors }: ItemTypeFormProps) => {
  return (
    <form className="flex flex-col item-type-collection">
      <BaseTextField
        name="name"
        control={control}
        label="Titre"
        setValue={(value) => setValue('name', value)}
        disabled={isSubmitting}
        required
        error={errors?.name}
        InputLabelProps={{ shrink: true }}
      />
      <div  className="flex flex-row justify-between input">
        <BaseTextField
          name="depositPaid"
          control={control}
          label="Caution"
          setValue={(value) => setValue('depositPaid', value? parseInt(value) : 0)}
          disabled={isSubmitting}
          required
          error={errors?.depositPaid}
          InputProps={{
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
          }}
        />
        <BaseTextField
          name="rentPrice"
          control={control}
          label="Prix location"
          setValue={(value) =>  setValue('rentPrice',value ? parseInt(value) : 0 )}
          required
          error={errors?.rentPrice}
          InputProps={{
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
          }}
        />
      </div>
    </form>
  )
}

export default ItemTypeForm
