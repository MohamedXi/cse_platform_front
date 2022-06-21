import React, { useContext } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Button, Checkbox, TextField } from '@material-ui/core'
import { Control, Controller, useForm, UseFormSetValue } from 'react-hook-form'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { ModalContext } from '../../../context/Modal'
import BaseTextField from './BaseTextField'
import { matchSorter } from 'match-sorter'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const filter = (options: ChipInterface[], { inputValue }: { inputValue: string }) => matchSorter(options, inputValue)
export interface ChipInterface {
  id: string
  name: string
}

/**
 * Form displayed when user wants to add a new Option to the list
 * @param control
 * @param setValue
 * @constructor
 */
function NewOptionForm({
  control,
  setValue,
}: {
  control: Control<Pick<ChipInterface, 'name'>>
  setValue: UseFormSetValue<Pick<ChipInterface, 'name'>>
}) {
  return (
    <form className="flex flex-col items-start">
      <BaseTextField name="name" control={control} label="Nom" setValue={(value) => setValue('name', value)} required />
    </form>
  )
}

export interface ChipsInputProps {
  control: Control<any>
  inputName: string
  setValue: (value: string[]) => any
  getValues: () => string[]
  options: ChipInterface[]
  inputLabel: string
  chipLabel?: string
  addOptionFunc?: (chipName: string) => Promise<void | ChipInterface>
  placeholder?: string
  className?: string
}

/**
 * Component based on AutoComplete that displays chips on items selection
 * If no item matches typed text, an 'add button' allows to create a new one.
 * THIS COMPONENT IS FULLY CONTROLLED. You have to provide getValues, setValue
 *
 * @param control The Control from useForm
 * @param inputName The name registered in Form
 * @param setValue The setValue CB from useForm
 * @param getValues The getValues CB from useForm
 * @param options An array of options. Should match ChipInterface[]
 * @param inputLabel The label dispalyed on field
 * @param chipLabel The label displayed in Popin 'add a {chipLabel}'
 * @param addChipFunc The CB responsible to add a new Option in the list
 * @param placeholder The placeholder of the field
 * @param className The class name
 * @constructor
 */
const ChipsInput = ({
  control,
  inputName,
  setValue,
  getValues,
  options,
  inputLabel,
  chipLabel = 'chip',
  addOptionFunc,
  placeholder = chipLabel,
  className,
}: ChipsInputProps) => {
  const {
    control: newOptionControl,
    setValue: newOptionSetValue,
    handleSubmit: newOptionHandleSubmit,
  } = useForm({
    mode: 'all',
    defaultValues: { name: '' },
  })

  const { openConfirmDialog } = useContext(ModalContext)

  /**
   * Handle add option
   * @param optionName
   */
  const handleAddOption = ({ name }: Pick<ChipInterface, 'name'>): Promise<void> => {
    // Do nothing if nothing to do :/
    if (!name || undefined === addOptionFunc) {
      console.warn('Should not be able to invoke this func if no chipname nor addOtionFunc provided')
      return Promise.reject("Une erreur inattendue s'est produite")
    }
    return (
      addOptionFunc(name)
        .then((res) => {
          if (res && res?.id) {
            setValue(getValues().concat(res.id))
          }
          newOptionSetValue('name', '')
        })
        // TODO manage error (waiting for error handling process to be validated)
        .catch((err) => {
          console.error(err)
        })
    )
  }

  /**
   * CB responsible to manage Form values.
   * This component is Managed, it doesn't set him self his values, they're "inherit" from form.
   *
   * @param event
   * @param value
   */
  const onSelectionChange = (event: any, value: ChipInterface[]) => {
    setValue(value.map((v) => v.id))
  }

  return (
    <>
      <Controller
        name={inputName}
        control={control}
        render={() => {
          return (
            <Autocomplete
              className={className}
              value={options.filter((o) => getValues().includes(o.id))}
              multiple
              fullWidth
              options={options}
              onChange={onSelectionChange}
              disableCloseOnSelect
              getOptionLabel={(option: ChipInterface) => option.name}
              filterOptions={(options: ChipInterface[], state): ChipInterface[] => {
                const filtered: ChipInterface[] = filter(options, state)
                // If no option match, add a fake option that would trigger addButton to be displayed
                if (addOptionFunc !== undefined && filtered.length === 0) {
                  return [{ id: '', name: state.inputValue }]
                }
                return filtered
              }}
              renderOption={(_props, option: ChipInterface, _state) => {
                // If it's a known option, render checkbox
                return option.id ? (
                  <li key={`tagOption-${option.id}`}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={getValues().includes(option.id)}
                      onClick={(_e) => {
                        if (getValues().includes(option.id)) {
                          setValue(getValues().filter((o) => o !== option.id))
                        } else {
                          setValue(getValues().concat([option.id]))
                        }
                      }}
                    />
                    {option.name}
                  </li>
                ) : (
                  // Add button only if addOptionFunc is provided
                  addOptionFunc !== undefined && (
                    <Button
                      key={`addButton-newOption`}
                      onClick={(e: any) => {
                        e.stopPropagation()
                        // Init form with option name
                        newOptionSetValue('name', option.name)
                        openConfirmDialog({
                          title: 'Ajouter une nouvelle option à la liste',
                          content: <NewOptionForm control={newOptionControl} setValue={newOptionSetValue} />,
                          onConfirm: newOptionHandleSubmit(handleAddOption),
                          onCancel: () => Promise.resolve(newOptionSetValue('name', '')),
                        })
                      }}
                      variant="contained"
                      color="primary"
                    >
                      {`Ajouter ${option.name}`}
                    </Button>
                  )
                )
              }}
              renderInput={(params) => (
                <TextField {...params} label={inputLabel} variant="outlined" placeholder={placeholder} />
              )}
            />
          )
        }}
      />
    </>
  )
}

export default ChipsInput
