export * from './logger'

export function isDesc(str: string, isDesc: boolean) {
    return isDesc ? `${str}_DESC` : str
}

export function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}