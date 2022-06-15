import {format} from 'date-fns'

export function toReadableDate(date: string) {
  return format(new Date(date), "hh:mm:ss")
}
