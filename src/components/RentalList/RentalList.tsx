import React, { useState, useEffect } from 'react'
import { CompoundedRental, Person } from '../../types/entities'
import { ColDef } from 'ag-grid-community'
import { format, isPast } from 'date-fns'
import DataGrid from '../DataGrid/DataGrid'
import BaseTextCellRenderer from '../DataGrid/BaseTextCellRenderer'
import ItemTypeCellRenderer from '../DataGrid/ItemTypeCellRenderer'
import ChildrenCellRenderer from '../DataGrid/ChildrenCellRenderer'
import { BuildActionsCell, buildStatusCell } from '../../helpers/statuses'

export interface RentalListProps {
  rentals: CompoundedRental[]
}

function RentalList({ rentals }: RentalListProps) {
  const getFullNameFromPerson = (person: Person | null) =>
    person?.firstName ? `${person.firstName} ${person.lastName}` : 'Inconnu'
  const getNexDate = (r: CompoundedRental) =>r.endDate ? format(r.endDate, 'dd/MM/Y')  : (isPast(r.startDate) && r.giveBy != null) ? format(r.dueDate, 'dd/MM/Y') : format(r.startDate, 'dd/MM/Y')
  const getNextAction = (r: CompoundedRental) => r.restitutionBy ? 'Restitution' :  !r.giveBy ? 'Retrait' : 'Restitution'
  const [gridData, setGridData]= useState(
                  rentals.map((r: CompoundedRental) => ({
                    itemType: r.item.itemType.name.toUpperCase(),
                    nextActionDate: getNexDate(r), // TODO get real nextActionDate
                    nextAction:getNextAction(r),
                    itemName: r.item.name.toUpperCase(),
                    username: getFullNameFromPerson(r.user).toUpperCase(),
                    storeKeeperName: getFullNameFromPerson(r.giveBy), // TODO Get actor linked to real action
                    status: buildStatusCell(r),
                    actions: BuildActionsCell(r),}))
  )

  useEffect( () => {
      const suscribeber=setGridData(
        rentals.map((r: CompoundedRental) => ({
          itemType: r.item.itemType.name.toUpperCase(),
          nextActionDate: getNexDate(r), // TODO get real nextActionDate
          nextAction:getNextAction(r),
          itemName: r.item.name.toUpperCase(),
          username: getFullNameFromPerson(r.user).toUpperCase(),
          storeKeeperName: getFullNameFromPerson(r.giveBy), // TODO Get actor linked to real action
          status: buildStatusCell(r),
          actions: BuildActionsCell(r),}))
      )
      return suscribeber
  }, [rentals])

  const cols: ColDef[] = [
    {
      flex: 0,
      width: 70,
      minWidth: 70,
      maxWidth: 70,
      headerName: '',
      field: 'itemType',
      cellRenderer: 'itemTypeCellRenderer',
    },
    {
      width: 100,
      minWidth: 100,
      maxWidth: 100,
      headerName: 'DATE',
      field: 'nextActionDate',
    },
    {
      headerName: 'ACTION',
      minWidth: 100,
      flex: 1,
      field: 'nextAction',
      cellRenderer: 'baseTextCellRender',
    },
    {
      headerName: 'OBJET',
      minWidth: 70,
      flex: 1,
      field: 'itemName',
      cellRenderer: 'baseTextCellRender',
    },
    {
      headerName: 'COLLABORATEUR',
      minWidth: 100,
      flex: 1,
      field: 'username',
      cellRenderer: 'baseTextCellRender',
    },
    {
      headerName: 'MAGASINIER',
      minWidth: 100,
      flex: 1,
      field: 'storeKeeperName',
      cellRenderer: 'baseTextCellRender',
    },
    {
      headerName: 'STATUT',
      minWidth: 150,
      field: 'status',
      cellRenderer: 'childrenCellRenderer',
    },
    {
      headerName: '    ',
      resizable: false,
      minWidth: 320,
      field: 'actions',
      cellRenderer: 'childrenCellRenderer',
    },
  ]
  const defaultColDef: ColDef = {
    cellClass: (_params) => {
      return 'color-body flex items-center overflow-ellipsis overflow-hidden'
    },
    cellRenderer: 'baseTextCellRender',
  }

  return (
    <DataGrid
      data={gridData}
      cols={cols}
      rowClass="h-14 flex flex-row items-center agrow-margin-10 rental-list-row"
      rowHeight={80}
      headerHeight={20}
      frameworkComponents={{
        baseTextCellRender: BaseTextCellRenderer,
        itemTypeCellRenderer: ItemTypeCellRenderer,
        childrenCellRenderer: ChildrenCellRenderer,
      }}
      defaultColDef={{
        resizable:true,
        filter: false,
        floatingFilter: false,
        suppressMenu: false,
        sortable: true,
        ...defaultColDef,
      }}
    />
  )
}

export default RentalList
