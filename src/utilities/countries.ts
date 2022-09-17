import axios from 'axios'

import { Country } from '../types'

export default {
  getAll: async () => {
    const query =
      'fields=name,languages,capital,currencies,flags,population,region,flag'
    const URL = `https://restcountries.com/v3.1/all?${query}`

    const response = await axios.get(URL)
    const cleanupCountries: Country[] = response.data.map(
      (country: { name: { common: string } }) => ({
        ...country,
        name: country.name.common,
      })
    )

    return {
      data: cleanupCountries,
      status: response.status,
    }
  },
  getOne: async (name: string) => {
    const query =
      'fields=name,languages,capital,currencies,flags,population&fullText=true'
    const URL = `https://restcountries.com/v3.1/name/${name}?${query}`

    const response = await axios.get(URL)
    const cleanupCountries: Country[] = response.data.map(
      (country: { name: { common: string } }) => ({
        ...country,
        name: country.name.common,
      })
    )

    return {
      data: cleanupCountries,
      status: response.status,
    }
  },
}
