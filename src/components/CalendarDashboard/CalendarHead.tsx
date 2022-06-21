import React, { ReactNode, useEffect, useState } from 'react'
import { addMonths, endOfWeek, format, startOfWeek, subDays, subMonths } from 'date-fns'

interface CalendarHeadProps {
  currentMonth: Date
}

const CalendarHead = ({ currentMonth }: CalendarHeadProps) => {
  const [currentMonthValue, setCurrentMonth] = useState<Date>(new Date())
  const dateFormat = 'dd'
  const monthFormat = 'MMMM'

  //Init Current Month
  useEffect(() => {
    setCurrentMonth(currentMonth)
  }, [currentMonth])

  //Change Month
  /**
   * TODO Need change two weeks per to weeks
   */
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonthValue, 1))
  }
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonthValue, 1))
  }

  //   Return the first day of this week
  const firstDayWeek = (date: Date) => {
    return startOfWeek(date, { weekStartsOn: 1 })
  }
  //Return the last day of the week
  const lastDayWeek = (date: Date) => {
    const lastDay = subDays(date, 3)
    return endOfWeek(lastDay)
  }

  return (
    <div className="header row flex-middle">
      {/* <div className="col col-start">
        <div className="icon" onClick={prevMonth}>
          chevron_left
        </div>
      </div>
      <div className="col col-center">
        <span>
          Semaine du {format(firstDayWeek(currentMonthValue), dateFormat)} au{" "}
          {format(lastDayWeek(currentMonthValue), dateFormat)}
          {format(currentMonthValue, monthFormat)}
        </span>
      </div>
      <div className="col col-end" onClick={nextMonth}>
        <div className="icon">chevron_right</div>
      </div> */}
    </div>
  )
}

export default CalendarHead
