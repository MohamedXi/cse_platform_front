import { useEffect, useState } from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import { Autocomplete, Divider, InputAdornment, TextField, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos'
import ClearIcon from '@material-ui/icons/Clear'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { agenciesAlreadyLoadedSelector, agenciesLoadingSelector, AgencyByNameSelector } from '../../selectors/agencies'
import { itemsLoadingSelector } from '../../selectors/items'
import { allItemTypesSelector, itemTypesLoadingSelector } from '../../selectors/itemTypes'
import { allTagsSelector, tagsLoadingSelector } from '../../selectors/tags'
import { getAllTags } from '../../actions/tagsActions'
import { getAllItemTypes } from '../../actions/itemTypesActions'
import { getAllPersons } from '../../actions/personsActions'
import { getOnGoingRentalsByAgency } from '../../actions/rentalsActions'
import { checkItemMatchCategorieFilters, checkItemMatchTagFilters } from '../../utils/items'
import { getAllItems } from '../../actions/itemsActions'
import { allItemsSelector } from '../../selectors/items'

// Components
import Items from '../../components/Items/items'
import TagFilters from '../../components/Catalogue/TagFilters'
import { Item } from '../../types/entities'

const CataloguePage = (_props: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const { user } = useSelector((state: RootState) => state.oidc)
  const itemsLoading = useSelector(itemsLoadingSelector)
  const agenciesLoading = useSelector(agenciesLoadingSelector)
  const agenciesAlreadyLoaded = useSelector(agenciesAlreadyLoadedSelector)
  const itemTypes = useSelector(allItemTypesSelector)
  const itemTypesLoading = useSelector(itemTypesLoadingSelector)
  const tags = useSelector(allTagsSelector)
  const tagsLoading = useSelector(tagsLoadingSelector)
  // FIXME userAgency should be taken from profile (at least userAgencyId)
  const userAgency = useSelector(AgencyByNameSelector(user?.profile.office))

  const allItems = useSelector(allItemsSelector)
  const [filterValue, setFilterValue] = useState<string>('')
  const [categoryFilters, setCategoryFilters] = useState<string[]>([])
  const [tagFilters, setTagFilters] = useState<string[]>([])
  const [filteredItems, setFilteredItems] = useState<Item[]>([])
  const [listIsFiltered, setListIsFiltered] = useState<boolean>(false)

  useEffect(() => {
    // Load tags, itemTypes and currentRentals when showing page
    dispatch(getAllItems())
    dispatch(getAllPersons())
    dispatch(getAllTags())
    dispatch(getAllItemTypes())
  }, [dispatch])

  useEffect(() => {
    if (!agenciesLoading && agenciesAlreadyLoaded && userAgency) {
      dispatch(getOnGoingRentalsByAgency(userAgency.id))
    }
  }, [agenciesLoading, agenciesAlreadyLoaded, userAgency, dispatch])

  useEffect(() => {
    setListIsFiltered(categoryFilters.length > 0 || filterValue !== '' || tagFilters.length > 0)

    setFilteredItems(
      allItems.filter((i) => {
        return (
          checkItemMatchTagFilters(i, tagFilters, tags) &&
          checkItemMatchCategorieFilters(i, categoryFilters, itemTypes) &&
          itemMatchSearch(i)
        )
      }),
    )
  }, [filterValue, categoryFilters, tagFilters])

  const itemMatchSearch = (i: Item) => {
    return (
      i.name.toLowerCase().match(filterValue.toLowerCase()) ||
      i.description.toLowerCase().match(filterValue.toLowerCase())
    )
  }

  const filterValueSearchHandler = (text: string) => {
    setFilterValue(text)
  }

  // const filteredItems = getFilteredItems(filterValue);
  const requiredDataLoading = itemsLoading || agenciesLoading || itemTypesLoading || tagsLoading

  return (
    <section className="h-full flex flex-col">
      <div className=" flex flex-row">
        <div className="flex flex-col justify-center cursor-pointer" onClick={() => navigate('/')}>
          <ArrowBackIcon style={{ height: '14px' }} />
        </div>
        <Typography
          variant="h1"
          style={{
            fontSize: '1.5rem',
            letterSpacing: '2.2px',
            paddingLeft: 0,
          }}
        >
          {' '}
          Nouvelle réservation{' '}
        </Typography>
      </div>
      <div className="flex flex-row justify-between items-center">
        <Autocomplete
          id="search-auto-complete"
          sx={{
            width: 254,
            '& .MuiAutocomplete-inputRoot': {
              padding: '0',
              paddingRight: '10px !important',
              paddingLeft: '5px !important',
            },
            '& label': { top: '-7px' },
            '& .MuiInputLabel-shrink': { top: '0' },
          }}
          options={filteredItems.map((v) => v.name)}
          onChange={(event, newValue) => {
            filterValueSearchHandler(newValue ?? '')
          }}
          inputValue={filterValue}
          // onInputChange={(event, newInputValue) => {
          //   filterValueSearchHandler(newInputValue ?? '')
          // }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Recherche"
              className="max-w-sm inputSearch"
              onChange={({ target: { value } }) => filterValueSearchHandler(value)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    {filterValue ? (
                      <ClearIcon onClick={() => filterValueSearchHandler('')} className="cursor-pointer" />
                    ) : (
                      <SearchIcon />
                    )}
                  </InputAdornment>
                ),
              }}
              value={filterValue}
              disabled={requiredDataLoading}
            />
          )}
        />
        <TagFilters
          tags={tags}
          setTagFilters={setTagFilters}
          setCategoryFilters={setCategoryFilters}
          tagFilters={tagFilters}
          categoryFilters={categoryFilters}
          categories={itemTypes}
        />
        {/* {hasRoles([Roles.admin]) && (
          <SubmitButton onClick={() => navigate('/admin/items')}>Consulter le catalogue de chaque agence</SubmitButton>
        )} */}
      </div>
      <Divider sx={{ my: 2 }} />
      <div className="flex mb-8">
        {filterValue !== '' && filteredItems.length === 0 ? (
          <Typography variant="subtitle2" className="py-10">
            Aucun article ne correspond à la recherche.
          </Typography>
        ) : (
          <Items
            categories={itemTypes}
            items={listIsFiltered ? filteredItems : allItems}
            loading={requiredDataLoading}
          />
        )}
      </div>
    </section>
  )
}

export default CataloguePage
