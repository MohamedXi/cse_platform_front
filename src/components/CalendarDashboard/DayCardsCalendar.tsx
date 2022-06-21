import React from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface DayCardsCalendarProps {
  day: Date,
  isMarkedDay?:boolean
}

const DayCardsCalendar = ({ day, isMarkedDay=false }: DayCardsCalendarProps) => {
  const dayFormat = 'EEE'
  const writeDayFormat = 'dd'
  return (
    <div
      className={`card-day rounded-xl bg-white flex items-center  border-2 justify-center text-center mr-3 ${
        isMarkedDay? 'isToday text-white' : ''
      }`}
    >
      <div className="flex flex-col">
        <span className="opacity-50 capitalize">{format(day, dayFormat, { locale: fr })}</span>
        <span className="text-sm mt-2"> {format(day, writeDayFormat, { locale: fr })}</span>
      </div>
    </div>
  )
}

export default DayCardsCalendar
