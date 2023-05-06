export const useDebounce = (callback: Function, delay:number) => {
    let timeout:number
    return (...args: any[]) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            callback(...args)
        }, delay);
    }
}

export const objectToQueryString = (obj:any) => '?' + Object.keys(obj).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])).join('&')
