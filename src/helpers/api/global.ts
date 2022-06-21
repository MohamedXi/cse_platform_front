import axios from 'axios'
import { formatDate } from '../../utils'

//Get all holidays days in France
export const getHolidaysDays = (): Promise<Date[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://calendrier.api.gouv.fr/jours-feries/metropole.json`)
      .then((response) => {
        resolve(
          Object.keys(response.data).map((date) => {
            return formatDate(new Date(date))
          }),
        )
      })
      .catch((error) => {
        reject(error)
      })
  })
}
