import React from 'react'
import { ICellRendererParams } from 'ag-grid-community'

const ChildrenCellRenderer = ({ value }: ICellRendererParams & { value: JSX.Element[] }) => {
  return (
    <div className="flex flex-row flex-grow flex-nowrap items-center justify-between">
      {value.map((child: JSX.Element) => React.cloneElement(child, { key: `${Math.random()}` }))}
    </div>
  )
}

export default ChildrenCellRenderer
