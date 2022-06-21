import React, { useEffect } from 'react'
import z from '../../helpers/zod'
import { Controller, useForm, useFormState } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import BaseTextField from './Inputs/BaseTextField'
import {
  Backdrop,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  InputAdornment,
} from '@material-ui/core'
import { Agency, ItemType } from '../../types/entities'
import ChipsInput from './Inputs/ChipsInput'
import SubmitButton from '../Button/SubmitButton'
import ImageUploader from '../Image/ImageUploader'
import { DevTool } from '@hookform/devtools'
import InputDatePicker from './Inputs/DatePicker'
import { useAppDispatch } from '../../store'
import { addOneItem } from '../../actions/itemsActions'
import { getAllItemTypes } from '../../actions/itemTypesActions'
import { getAllAgencies } from '../../actions/agenciesActions'
import { allItemTypesSelector, itemTypesLoadingSelector } from '../../selectors/itemTypes'
import { agenciesLoadingSelector, allAgenciesSelector } from '../../selectors/agencies'
import { allTagsSelector, tagsLoadingSelector } from '../../selectors/tags'
import { useSelector } from 'react-redux'
import { addOneTag, getAllTags, unwrapTag } from '../../actions/tagsActions'
import { unwrapResult } from '@reduxjs/toolkit'

//type
import { Item } from '../../types/entities'

//css
import './styles/ItemForm.scss'

const imgBaseUri = window['runConfig'].REACT_APP_IMAGE_BASE_URI

interface ItemFormProps {
  item: Item
  confirm: (resp: any) => void
  handleError: (e: any) => void
  cancel: () => void
}

export interface ItemFormValues {
  id?: string
  name: string
  description: string
  depositAmount: number
  rentPrice: number
  agency: string
  itemType: string
  tags: string[]
  images: string[]
  endDateAvailable: Date
}

const schema = z.object({
  name: z.string().nonempty({ message: 'Le nom est obligatoire' }),
  agency: z.string().nonempty({ message: 'Sélectionnez une agence' }),
  description: z.string(),
  tags: z.array(z.string()),
  rentPrice: z.number().nonnegative({ message: 'Doit être un nombre positif' }),
  depositAmount: z.number().nonnegative({ message: 'Doit être un nombre positif' }),
  itemType: z.string().nonempty({ message: 'Sélectionnez une catégorie' }),
  images: z.array(z.string()),
  endDateAvailable: z.date().refine((date) => {
    return date < new Date()
      ? {
          message: `La date de fin d'emprunt ne peut être abtérieure à aujourd'hui`,
        }
      : null
  }),
})

const CloneItemForm = ({ item, confirm, handleError, cancel }: ItemFormProps) => {
  const dispatch = useAppDispatch()

  const itemTypesLoading = useSelector(itemTypesLoadingSelector)
  const itemTypes = useSelector(allItemTypesSelector)
  const agenciesLoading = useSelector(agenciesLoadingSelector)
  const agencies = useSelector(allAgenciesSelector)
  const tagsLoading = useSelector(tagsLoadingSelector)
  const tags = useSelector(allTagsSelector)

  const formIsLoading: boolean = agenciesLoading || itemTypesLoading || tagsLoading

  const defaultValues = item

  const { setValue, getValues, handleSubmit, control } = useForm<Item>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'all',
  })

  const { errors, isSubmitting, isValid, isDirty } = useFormState({ control })

  const handleAddTag = (tagName: string) =>
    dispatch(addOneTag({ name: tagName }))
      .then(unwrapResult)
      .then(unwrapTag)

  const submitHandler = (values: Item) =>
    dispatch(addOneItem(values))
      .then((resp: any) => {
        if (resp.error) {
          handleError(resp.error)
          return
        }
        confirm(resp)
      })
      .catch((err) => {
        handleError(err)
      })

  // Load all needed resources to fill form
  useEffect(() => {
    dispatch(getAllItemTypes())
    dispatch(getAllAgencies())
    dispatch(getAllTags())
  }, [dispatch])

  return (
    <div style={{ width: 900 }} className="root flex flex-col items-center justify-center">
      <Typography
        variant="h1"
        style={{
          fontSize: '1.5rem',
          letterSpacing: '2.2px',
          paddingLeft: 0,
        }}
      >
        Nouvel Article
      </Typography>
      <div className="flex flex-row  justify-around w-full itemForm-container mb-6">
        <form className="flex flex-col items-start" onSubmit={handleSubmit(submitHandler)}>
          {/*NOM | AGENCE*/}
          <div className="flex flex-row items-center justify-between w-full mb-5 mt-6">
            <BaseTextField
              name="name"
              setValue={(value) => setValue('name', value)}
              label="Titre"
              style={{ marginBottom: '0', width: '200px' }}
              required
              control={control}
              placeholder="Titre"
              error={errors?.name}
              disabled={isSubmitting}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl variant="outlined" margin="normal" sx={{ m: 0 }}>
              <InputLabel id="agency-select-label">Agence</InputLabel>
              <Controller
                render={({ field }) => (
                  <Select
                    required
                    {...field}
                    style={{ minWidth: '200px' }}
                    id="agency-select"
                    label="Agence"
                    labelId="agency-select-label"
                  >
                    {agencies.map((a: Agency) => (
                      <MenuItem key={`${a.id}`} value={a.id}>
                        {a.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                name="agency"
                control={control}
              />
            </FormControl>
          </div>
          <BaseTextField
            name="description"
            setValue={(value) => setValue('description', value)}
            label="Description"
            multiline
            fullwidth
            rows={3}
            control={control}
            placeholder="Description"
            error={errors?.description}
            disabled={isSubmitting}
            InputLabelProps={{ shrink: true }}
          />
          {/*PRIX | CATEGORY*/}
          <div className="flex flex-row  justify-between w-full mt-3">
            <div style={{ width: '200px' }}>
              <FormControl variant="outlined" margin="normal" style={{ width: '200px' }}>
                <InputLabel id="item-type-select-label">Catégorie</InputLabel>
                <Controller
                  render={({ field }) => (
                    <Select
                      {...field}
                      required
                      style={{ minWidth: '200px' }}
                      id="item-type-select"
                      label="Catégorie"
                      labelId="item-type-select-label"
                    >
                      {itemTypes.map((c: ItemType) => (
                        <MenuItem key={`${c.id}`} value={c.id}>
                          {c.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  name="itemType"
                  control={control}
                />
              </FormControl>
            </div>
            <div className="flex flex-row ">
              <BaseTextField
                name="rentPrice"
                setValue={(value) => setValue('rentPrice', value)}
                required
                control={control}
                style={{ width: '8rem', margin: '0 5px' }}
                label="Prix de la location"
                error={errors?.rentPrice}
                type="number"
                disabled={isSubmitting}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">€</InputAdornment>,
                }}
              />
              <BaseTextField
                name="depositAmount"
                setValue={(value) => setValue('depositAmount', value)}
                required
                control={control}
                style={{ maxWidth: '95px' }}
                label="Caution"
                error={errors?.depositAmount}
                type="number"
                disabled={isSubmitting}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">€</InputAdornment>,
                }}
              />
            </div>
          </div>
          {/*TAGS*/}
          <div className="mt-3 mb-5 flex-wrap w-full">
            <ChipsInput
              className="tag-input"
              control={control}
              inputName="tags"
              inputLabel="Tags"
              options={tags}
              setValue={(value) => setValue('tags', value)}
              getValues={() => getValues('tags') ?? []}
              placeholder="Ajouter un tag"
              chipLabel="Tag"
              addOptionFunc={handleAddTag}
            />
          </div>
          {/*DATE DE FIN D'EMPRUNT*/}
          <InputDatePicker
            name="endDateAvailable"
            label="fin de disponibilité"
            control={control}
            setValue={(value) => setValue('endDateAvailable', value)}
          />
        </form>
        <div className="flex flex-col items-center">
          <Typography style={{ fontSize: '1rem' }} className="leading-6 text-base">
            AJOUT DES VISUELS
          </Typography>
          <ImageUploader initImages={getValues().images.map((img) => `${imgBaseUri}/${img}`)} />
        </div>
      </div>
      <div className="flex flex-row justify-evenly items-center w-56">
        <SubmitButton
          className="self-end"
          disabled={!isDirty || !isValid || isSubmitting}
          type="submit"
          submitting={isSubmitting}
          onClick={handleSubmit(submitHandler)}
        >
          CRÉER
        </SubmitButton>
        <SubmitButton className="self-end" type="cancel" onClick={cancel}>
          Annuler
        </SubmitButton>
      </div>
      <Backdrop open={formIsLoading} className="text-white">
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* {window['runConfig'].NODE_ENV === 'development' && <DevTool placement="bottom-right" control={control} />} */}
    </div>
  )
}

export default CloneItemForm
