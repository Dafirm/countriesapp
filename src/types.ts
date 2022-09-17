export type Country = {
  name: string

  capital: string[]
  flags: {
    png: string
  }
  flag: any
  official: string
  population: number
  region: string
  continents: string
  currencies: {
    [key: string]: {
      name: string
    }
  }

  languages: {
    [key: string]: string
  }
}

export type Sort<T> = {
  a: Country
  b: Country
  key: T
  sortBy: 'asc' | 'desc'
}

export type Cart = Pick<Country, 'name' | 'flags'>
export type CountryName = Pick<Country, 'name'>

export type AddToCartAction = {
  type: string
  payload: Cart
}
export type RemoveFromCartAction = {
  type: string
  payload: CountryName
}
