export const currencyFormat=(value)=>{
    return new Intl.NumberFormat("vi-VN").format(value)
}
export const currencyFormatUSD = (value) => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2
    }).format(value)
}
