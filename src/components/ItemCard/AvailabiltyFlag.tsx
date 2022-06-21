import React from 'react'
import { Typography } from '@material-ui/core'
import { format } from 'date-fns'
import clsx from 'clsx'

export interface AvailabiltyFlagProps {
  availability: true | false | Date
  roundedType?: 'top' | 'all'
  inModal?: boolean
}

function AvailabiltyFlag({ availability, roundedType = 'top', inModal }: AvailabiltyFlagProps) {
  const availabilityText =
    availability === true
      ? 'DISPONIBLE'
      : availability === false
      ? 'INDISPONIBLE'
      : `DISPONIBLE LE ${format(availability, 'dd/LL')}`

  const getRoundedClass = (): string => {
    switch (roundedType) {
      case 'top':
        return 'rounded-t-lg'
      case 'all':
        return 'rounded-lg'
      default:
        return ''
    }
  }

  return (
    <div
      className={`availabilty-flag__container flex flex-row items-center ${
        inModal ? 'relative' : 'absolute top-0 right-9 h-5'
      }  ${getRoundedClass()} px-3 text-white ${clsx(
        { 'bg-error': availability === false },
        { 'bg-success': availability === true },
        { 'bg-warning': availability !== false && availability !== true },
      )}`}
    >
      <Typography className="whitespace-nowrap" sx={{ fontSize: '11px', lineHeight: 1 }}>
        {availabilityText}
      </Typography>
    </div>
  )
}

export default AvailabiltyFlag
