import { endOfDay } from 'date-fns'

export const formatDate = (date: Date): Date => {
  return new Date(endOfDay(date))
}
