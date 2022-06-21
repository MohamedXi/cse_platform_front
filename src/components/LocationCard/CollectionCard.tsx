import { makeStyles, Typography } from '@material-ui/core'

// Redux
import { RootState, store } from '../../store'
import { itemTypesAdapter, tagsAdapter } from '../../adapters'

// Types
import { CompoundedRental } from '../../types/entities'
import { Control, UseFormGetValues, UseFormSetValue, useFormState } from 'react-hook-form'
import CollectionForm, { CollectionFormValues } from '../Forms/CollectionForm'
// Components
import ItemCardHeader from '../ItemCard/ItemCardHeader'
//utilis
import { format } from 'date-fns'

// Enums

// css 
import './location.scss'

const imgBaseUri = window['runConfig'].REACT_APP_IMAGE_BASE_URI


export interface CollectionCardProps {
  rental: CompoundedRental
  onError?: Function
  control: Control<CollectionFormValues>
  setValue: UseFormSetValue<CollectionFormValues>
  getValues: UseFormGetValues<CollectionFormValues>
}

const useCardlStyles = makeStyles((_theme) => ({
  root: {
    display:"flex",
    flexDirection:"column",
    width: 510,
    height: 450,
    justifyContent:"space-around"
  },
  firstBlock:{
    display:"flex",
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-between",
    height: 200,

  },
  firstBlockLeft:{
    display:"flex",
    flexDirection:"column",
    maxidth:190,
    justifyContent:"space-between"
  },
  firstBlockRight:{
    display:"flex",
    maxWidth:200,
    flexDirection:"column",
    height: 300
  },
  secondBlock:{
    flexDirection:"column",
  }
}))


export default function CollectionCard({
  rental,
  onError,
  control,
  setValue,
  getValues,
}: CollectionCardProps) {
const classes=useCardlStyles()
const itemTypesSelector = itemTypesAdapter.getSelectors<RootState>((state) => state.itemTypes)
const tagsSelector = tagsAdapter.getSelectors<RootState>((state) => state.tags)
const {item, user, startDate, dueDate}= rental 
const { errors, isSubmitting } = useFormState({ control })


return <div  className={classes.root}>
    <div className={classes.firstBlock}>
      <div className={classes.firstBlockLeft}>
        <ItemCardHeader
            itemName={item!.name}
            inModal={false}
            itemTypeName={itemTypesSelector.selectById(store.getState(), item!.itemType.id)?.name ?? ''}
            tagsNames={item!.tags
              .map((t) => tagsSelector.selectById(store.getState(), t.id)?.name ?? '')
              .filter((t) => t !== '')}
              availability={true}
        />
        <div className="flex flex-row justify-between w-48">
            <Typography
              lineHeight="1rem"
              fontSize="0.75rem"
              component="label"
              className="text-lg font-semibold text-body opacity-50 text-s leading-none"
            >
              Collaborateur:
            </Typography>
            <Typography
              lineHeight="1.2rem"
              fontSize="0.875rem"
              component="span"
              className="text-lg font-semibold text-body text-s line-clamp-2"
            >
            {`${user.firstName} ${user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase()}`}
          </Typography>
        </div>
        <div className="flex flex-col">
            <Typography
              lineHeight="1rem"
              fontSize="0.75rem"
              component="label"
              className="text-lg font-bold text-body opacity-50 text-s leading-none"
            >
              Date de retrait:
            </Typography>
            <div className='date-box'>
                <Typography
                  lineHeight="1.2rem"
                  fontSize="0.875rem"
                  component="span"
                  className="text-lg font-black text-body text-s line-clamp-2"
                >
                {format(startDate, 'dd/MM/yyyy')}
              </Typography>
            </div>
        </div>
        <div className="flex flex-row justify-between w-48">
            <Typography
              lineHeight="1rem"
              fontSize="0.75rem"
              component="label"
              className="text-lg font-bold text-body opacity-50 text-s leading-none"
            >
              Date de restituion:
            </Typography>
            <Typography
              lineHeight="1.2rem"
              fontSize="0.875rem"
              component="span"
              className="text-lg font-black text-body text-s line-clamp-2"
            >
            {format(dueDate, 'dd/MM/yyyy')}
          </Typography>
        </div>
      </div>
      <div className={classes.firstBlockRight}>
        <img      src={item!.images[0]
                    ? `${imgBaseUri}/${item!.images[0]}`
                    : `${imgBaseUri}/creative-logo-design-icon-colorful-600w-658173808-jpg-140_140.png`
                  }
                  alt={rental.id}
                  style={{maxWidth: 200, maxHeight: 250}}
        />
      </div>
    </div>
    <div className={classes.secondBlock}>
      <CollectionForm control={control} setValue={setValue} isSubmitting={isSubmitting} errors={errors}/>
    </div>
  </div>
}