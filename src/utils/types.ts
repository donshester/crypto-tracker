export type CurrencyType = {
    id: string
    name: string
    boughtPrice: number
    quantity: number
}

export type PortfolioType = {
    balance: number
    portfolioPrice: number
    currencies: CurrencyType[]
}
