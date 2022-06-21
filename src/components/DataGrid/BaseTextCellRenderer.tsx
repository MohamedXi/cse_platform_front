import React from 'react'
import { ICellRendererParams } from 'ag-grid-community'
import { Typography } from '@material-ui/core'

const BaseTextCellRenderer = ({ value }: ICellRendererParams) => {
  return (
    <div className="flex flex-row items-center justify-center w-full h-full overflow-hidden overflow-ellipsis">
      <Typography
        variant="body1"
        className="line-clamp-2 max-h-12 overflow-ellipsis whitespace-normal"
        sx={{ fontSize: '0.875rem', lineHeight: 1.2 }}
      >
        {value.toUpperCase()}
      </Typography>
    </div>
  )
}

export default BaseTextCellRenderer
