import React, { useContext, useEffect } from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import { Typography } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos'
import DataGrid, { ColProps } from '../../../components/DataGrid/DataGrid'
import { useAppDispatch } from '../../../store'
import { useSelector } from 'react-redux'
import { getAllItems } from '../../../actions/itemsActions'
import { getAllItemTypes } from '../../../actions/itemTypesActions'
import { getAllTags } from '../../../actions/tagsActions'
import { getAllRentals } from '../../../actions/rentalsActions'
import { ICellRendererParams } from 'ag-grid-community'
import ChildrenCellRenderer from '../../../components/DataGrid/ChildrenCellRenderer'
import ItemTypeCellRenderer from '../../../components/DataGrid/ItemTypeCellRenderer'

import { ItemEditButton, ItemDeleteButton, ItemCloneButton } from '../ItemEditPage'

// Selectors
import { allItemsSelector, itemsLoadingSelector } from '../../../selectors/items'
import { allAgenciesSelector } from '../../../selectors/agencies'
import { allItemTypesSelector } from '../../../selectors/itemTypes'

import { allRentalsSelector } from '../../../selectors/rentals'

// Context
import { GlobalContext } from '../../../context/Global'

// Utils
import { availabilityStatus } from '../../../utils'

// Types
import { Item } from '../../../types/entities'

// css
import '../styles/CreaPersons.scss'

const CreaLocAdminItems = (_props: RouteComponentProps) => {
  const dispatch = useAppDispatch()
  const itemsLoading = useSelector(itemsLoadingSelector)
  const items = useSelector(allItemsSelector)
  const agencies = useSelector(allAgenciesSelector)
  const itemTypes = useSelector(allItemTypesSelector)
  const rentals = useSelector(allRentalsSelector)
  const { holidaysDays } = useContext(GlobalContext)

  useEffect(() => {
    dispatch(getAllItems())
    dispatch(getAllItemTypes())
    dispatch(getAllTags())
    dispatch(getAllRentals())
  }, [dispatch])

  const cols: ColProps[] = [
    {
      flex: 1,
      minWidth: 180,
      headerName: ' ',
      field: 'itemType',
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      cellRendererFramework: (params: ICellRendererParams) => {
        const item = params.data as unknown as Item
        const value = itemTypes.find((itemType) => itemType.id === item.itemType)?.name || 'default'
        return <ItemTypeCellRenderer value={value} />
      },
    },
    {
      flex: 1,
      field: 'name',
      headerName: 'Nom',
      width: 150,
      tooltipField: 'name',
    },
    {
      flex: 1,
      field: 'rentPrice',
      headerName: 'Prix',
      width: 50,
      filter: 'agNumberColumnFilter',
      cellRendererFramework: (params: ICellRendererParams) => (
        <Typography fontSize="0.875rem" className="grid content-center">
          {params.data.rentPrice || '    '}
        </Typography>
      ),
    },
    {
      flex: 1,
      field: 'depositAmount',
      headerName: 'Caution',
      width: 50,
      filter: 'agNumberColumnFilter',
      cellRendererFramework: (params: ICellRendererParams) => (
        <Typography fontSize="0.875rem" className="grid content-center">
          {params.data.depositAmount || '    '}
        </Typography>
      ),
    },
    {
      flex: 1,
      field: 'itemType',
      headerName: 'Categorie',
      width: 100,
      filterParams: {
        filterOptions: ['contains'],
        textCustomComparator: (filter: string, value: string, filterText: string) =>
          itemTypes
            .find((itemType) => itemType.id === value)
            ?.name.toLowerCase()
            .includes(filterText.toLowerCase()),
      },
      cellRendererFramework: (params: ICellRendererParams) => (
        <Typography>{itemTypes.find((itemType) => itemType.id === params.data.itemType)?.name}</Typography>
      ),
    },
    {
      flex: 1,
      field: 'agency',
      headerName: 'Agence',
      width: 70,
      filterParams: {
        filterOptions: ['contains'],
        textCustomComparator: (filter: string, value: string, filterText: string) =>
          agencies
            .find((agency) => agency.id === value)
            ?.name.toLowerCase()
            .includes(filterText.toLowerCase()),
      },
      cellRendererFramework: (params: ICellRendererParams) => (
        <Typography className="grid content-center w-full">
          {agencies.find((agency) => agency.id === params.data.agency)?.name}
        </Typography>
      ),
    },
    {
      flex: 1,
      field: 'rentals',
      headerName: 'Statut',
      width: 200,
      cellRendererFramework: (params: ICellRendererParams) => {
        const itemRentals = rentals.filter((r) => params.data.rentals.includes(r.id))
        return (
          <div className="flex flex-row items-center justify-center w-full h-full overflow-hidden overflow-ellipsis">
            <Typography
              variant="body1"
              className="grid content-center w-full line-clamp-2 max-h-12 overflow-ellipsis whitespace-normal"
            >
              {availabilityStatus(params.data, itemRentals, holidaysDays)}
            </Typography>
          </div>
        )
      },
    },
    {
      headerName: 'Action',
      minWidth: 150,
      field: 'actions',
      cellRendererFramework: (params: ICellRendererParams) => {
        const itemRentals = rentals.filter((r) => params.data.rentals.includes(r.id))
        return (
          <div className="flex flex-row items-center justify-around w-full">
            <ItemEditButton item={params.data} status={availabilityStatus(params.data, itemRentals, holidaysDays)} />
            <ItemDeleteButton item={params.data} status={availabilityStatus(params.data, itemRentals, holidaysDays)} />
            <ItemCloneButton item={params.data} />
          </div>
        )
      },
    },
  ]

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
          Articles{' '}
        </Typography>
      </div>
      <div className="flex flex-grow items-center justify-center overflow-hidden mb-8">
        <DataGrid
          data={items}
          cols={cols}
          rowClass="flex flex-row items-center  flex-wrap"
          rowHeight={50}
          headerHeight={20}
          frameworkComponents={{
            ItemTypeCellRenderer: ItemTypeCellRenderer,
            childrenCellRenderer: ChildrenCellRenderer,
          }}
          suppressRowClickSelection={true}
          rowSelection={'multiple'}
          loading={itemsLoading}
          defaultColDef={{
            resizable: true,
            filter: false,
            floatingFilter: false,
            suppressMenu: false,
            sortable: true,
          }}
        />
      </div>
    </section>
  )
}

export default CreaLocAdminItems
