import React from 'react'
import BaseTextField from './Inputs/BaseTextField'
import { InputAdornment } from '@material-ui/core'
import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import z from '../../helpers/zod'
import './styles/CollectionForm.scss'

export const collectionSchema = z.object({
    depositPaid: z.number(),
    comment:z.string()
})

export interface CollectionFormValues {
    depositPaid: number,  
    rentPrice:  string,
    comment:  string

}

export interface CollectionFormProps {
  control: Control<CollectionFormValues>
  setValue: UseFormSetValue<CollectionFormValues>
  getValues?: UseFormGetValues<CollectionFormValues>
  isSubmitting: boolean
  errors: any
}

const CollectionForm = ({ control, setValue, isSubmitting, errors }: CollectionFormProps) => {

  return (
    <form className="flex flex-col justify-between">
      <div  className="flex flex-row justify-between form-collection w-7/12">
        <BaseTextField
          name="depositPaid"
          control={control}
          label="Caution"
          setValue={(value) => value && setValue('depositPaid', parseInt(value))}
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
          setValue={(value) => setValue('rentPrice', value)}
          required
          error={errors?.rentPrice}
          InputProps={{
            endAdornment: <InputAdornment position="end">€</InputAdornment>,
            readOnly: true
          }}
        />
      </div>
      <BaseTextField
          name="comment"
          control={control}
          label="Commentaire"
          setValue={(value) =>setValue('comment', value)}
          disabled={isSubmitting}
          multiline
          fullwidth
          rows={3}
          error={errors?.comment}
          InputLabelProps={{ shrink: true }}
        />
    </form>
  )
}

export default CollectionForm
