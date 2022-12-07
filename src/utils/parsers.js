
// Based on most accepted answer in stackoverflow 
// https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
export const priceParser = (price) => {
    if(!price) return '0'
    const roundedPrice = parseFloat(price).toFixed(2)
    const parsePrice = (p => {
        return  p.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    })
    return roundedPrice > 0 ? parsePrice(roundedPrice) : parsePrice(parseFloat(price).toFixed(10))
}

export const percentageParser = (percentage) => {
    
    return !percentage ? 0 : parseFloat(percentage).toFixed(2)
}

export const largeCurrencyParser = (ammount, abbreviated = true) => {

    if(!ammount) return '0 USD'

    return Math.abs(+ammount) >= 1.0e+9

    ? (Math.abs(+ammount) / 1.0e+9).toFixed(2) + (abbreviated ? ' B' : ' Billions')

    : Math.abs(+ammount) >= 1.0e+6

    ? (Math.abs(+ammount) / 1.0e+6).toFixed(2) + (abbreviated ? ' M' : ' Millions')

    : Math.abs(+ammount) >= 1.0e+3

    ? (Math.abs(+ammount) / 1.0e+3).toFixed(2) + (abbreviated ? ' K' : ' Thousands')

    : Math.abs(+ammount).toFixed(8) + ' USD'

}