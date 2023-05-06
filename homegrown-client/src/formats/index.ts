export const currencyUSD = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"})
export const currencySEK = new Intl.NumberFormat("sv-SE", {style: "currency", currency: "SEK"})

export const formatCurrency = (sum: number, currency: string = "USD") => {
    let value:string
    if (currency === "SEK") value = currencySEK.format(sum * 10.55)
    else value = currencyUSD.format(sum)
    return value
}