import React from 'react'
import BaseTextField from './Inputs/BaseTextField'
import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import z from '../../helpers/zod'

export const RestitutionSchema = z.object({
    comment:z.string()
})

export interface RestitutionFormValues {
    comment:  string
}

export interface RestitutionFormProps {
  control: Control<RestitutionFormValues>
  setValue: UseFormSetValue<RestitutionFormValues>
  getValues?: UseFormGetValues<RestitutionFormValues>
  isSubmitting: boolean
  errors: any
}

const RestitutionForm = ({ control, setValue, isSubmitting, errors }: RestitutionFormProps) => {

  return (
    <form className="flex flex-col justify-between">
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

export default RestitutionForm
