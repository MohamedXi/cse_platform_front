import React from 'react'
import BaseTextField from './Inputs/BaseTextField'
import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import z from '../../helpers/zod'
import './styles/TagForm.scss'

export const tagSchema = z.object({
  name: z.string().nonempty({ message: 'Le titre est obligatoire' }),
})

export interface TagFormValues {
  name: string
}

export interface TagFormProps {
  control: Control<TagFormValues>
  setValue: UseFormSetValue<TagFormValues>
  getValues?: UseFormGetValues<TagFormValues>
  isSubmitting: boolean
  errors: any
}

const TagForm = ({ control, setValue, isSubmitting, errors }: TagFormProps) => {
  return (
    <form className="flex flex-col form-Tag">
      <BaseTextField
        name="name"
        control={control}
        label="Titre"
        setValue={(value) => setValue('name', value)}
        disabled={isSubmitting}
        required
        error={errors?.name}
      />
    </form>
  )
}

export default TagForm
