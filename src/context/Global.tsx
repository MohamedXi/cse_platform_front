import React, { PropsWithChildren, useEffect, useState } from 'react'
import { getHolidaysDays } from '../helpers/api/global'

export interface globalContextTypes {
  holidaysDays: Date[]
}

export const GlobalContext = React.createContext<globalContextTypes>({
  holidaysDays: [],
})

export function GlobalProvider(props: PropsWithChildren<any>) {
  const [holidaysDays, setHolidaysDays] = useState<Date[]>([])

  useEffect(() => {
    getHolidaysDays()
      .then((response) => {
        setHolidaysDays(response)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return <GlobalContext.Provider value={{ holidaysDays }}>{props.children}</GlobalContext.Provider>
}
