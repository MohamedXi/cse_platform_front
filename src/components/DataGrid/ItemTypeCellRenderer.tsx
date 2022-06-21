import React from 'react'
import { ICellRendererParams } from 'ag-grid-community'
import ItemTypeIcon from '../ItemCard/ItemTypeIcon'

const ItemTypeCellRenderer = ({ value }: Partial<ICellRendererParams>) => {
  return (
    <div className="flex flex-row items-center justify-center w-full overflow-hidden">
      <ItemTypeIcon itemTypeName={value}/>
    </div>
  )
}

export default ItemTypeCellRenderer
