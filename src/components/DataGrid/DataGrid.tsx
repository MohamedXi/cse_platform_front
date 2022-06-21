import React, { useEffect, useState } from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import { ColDef, GridApi, GridReadyEvent, ICellRendererParams } from 'ag-grid-community'
import './ag-theme-reset.scss'
import './ag-theme-overrides.scss'
import { Typography } from '@material-ui/core'
import AG_GRID_LOCALE_FR from './locale'
import { AgGridReactProps } from 'ag-grid-react/lib/agGridReact'

export interface ColProps {
  field: string
  headerName?: string
  sortable?: boolean
  filter?: 'agTextColumnFilter' | 'agNumberColumnFilter' | 'agDateColumnFilter' | boolean
  suppressMenu?: boolean
  floatingFilter?: boolean
  cellRenderer?: any
  cellRendererFramework?: any
  width?: number
  minWidth?: number
  autoHeight?: boolean
  cellStyle?: object
  wrapText?: boolean
  tooltipField?: string
  tooltipComponentParams?: object
  flex?: number
  filterParams?: any,
  headerCheckboxSelection?: boolean,
  headerCheckboxSelectionFilteredOnly?: boolean,
  checkboxSelection?: boolean
}

export interface DataGridProps extends AgGridReactProps {
  data: { [key: string]: any }[]
  cols: ColDef[]
  loading?: boolean
  pagination?: boolean
  paginationAutoPageSize?: boolean
}

/**
 * Wrapper around React Ag-Grid https://www.ag-grid.com/react-grid/getting-started/
 * Grid API: https://www.ag-grid.com/react-grid/grid-interface/
 * Column API: https://www.ag-grid.com/react-grid/column-interface/
 *
 * @param data
 * @param cols
 * @param loading
 * @param pagination
 * @param paginationAutoPageSize
 * @param AgGridReactProps other native DataGridProps
 * @constructor
 */
const DataGrid = ({
  data,
  cols,
  loading,
  pagination = true,
  paginationAutoPageSize = true,
  ...AgGridReactProps
}: DataGridProps) => {
  const [gridApi, setGridApi] = useState<null | GridApi>(null)
  const [onResize, setOnResize] = useState<() => any>()

  useEffect(() => {
    if (!!gridApi) {
      loading ? gridApi.showLoadingOverlay() : gridApi.hideOverlay()
    }
    return () => {
      window.removeEventListener('resize', () => {})
      setGridApi(null)
    }
  }, [loading, gridApi])

  useEffect(() => {
    onResize && window.addEventListener('resize', onResize)
    return () => {
      onResize && window.removeEventListener('resize', onResize)
    }
  }, [onResize])

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api)
    setOnResize(
      () => () =>
        setTimeout(function () {
          params.api.sizeColumnsToFit()
        }),
    )
    params.api.sizeColumnsToFit()
  }

  const makeColumns = (colsProps: ColDef[]) => {
    return colsProps.map((c: ColDef) => <AgGridColumn key={`${c.field}`} {...c} />)
  }

  const defaultColumnDef: ColDef = {
    sortable: true,
    suppressMenu: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
    cellRendererFramework: (params: ICellRendererParams) => <Typography>{params.value}</Typography>,
  }

  return (
    <div className="w-full h-full ag-theme-alpine">
      <AgGridReact
        defaultColDef={defaultColumnDef}
        onGridReady={onGridReady}
        rowData={data}
        paginationAutoPageSize={paginationAutoPageSize}
        pagination={pagination}
        localeText={AG_GRID_LOCALE_FR}
        enableBrowserTooltips={true}
        {...AgGridReactProps}
      >
        {makeColumns(cols)}
      </AgGridReact>
    </div>
  )
}

export default DataGrid
