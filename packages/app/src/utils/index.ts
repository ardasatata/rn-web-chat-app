export * from './logger'

export function isDesc(str: string, isDesc: boolean) {
    return isDesc ? `${str}_DESC` : str
}
