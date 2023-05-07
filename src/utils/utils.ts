import axios, { AxiosError, HttpStatusCode } from 'axios'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateProductNameIdInURL = (name: string, id: string) => {
  return removeSpecialCharacter(name).replace(/\s+/g, '-') + '-i-' + id
}

export const getProductIdFromURL = (nameId: string) => {
  return nameId.split('-i-')[nameId.split('-i-').length - 1]
}

export const getAvatarURL = (name?: string) => {
  return name
    ? `${import.meta.env.VITE_API_URL}/images/${name}`
    : 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'
}
