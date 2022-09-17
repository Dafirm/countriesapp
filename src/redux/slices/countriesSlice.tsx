import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CountriesService from '../../utilities/countries'

import { Country } from '../../types'
import { Sort } from '../../types'

export interface countriesState {
  items: Country[]
  itemsRef: Country[]
  isLoading: boolean
  error: string
}

const initialState: countriesState = {
  items: [],
  itemsRef: [],
  isLoading: false,
  error: '',
}

export const fetchCountriesThunk = createAsyncThunk(
  'countries/fetch',
  async () => {
    const { data, status } = await CountriesService.getAll()

    return {
      data,
      status,
    }
  }
)

export const fetchCountryThunk = createAsyncThunk(
  'country/fetch',
  async (name: string) => {
    const { data, status } = await CountriesService.getOne(name)

    return {
      data,
      status,
    }
  }
)

function sort<T extends keyof Country>({ a, b, key, sortBy }: Sort<T>) {
  if (key === 'name') {
    if (sortBy === 'asc') {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    }
    if (a.name > b.name) return -1
    if (a.name < b.name) return 1
    return 0
  }
  if (a[key] < b[key]) return -1
  if (a[key] > b[key]) return 1
  return 0
}

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    handleSort: (state, action) => {
      const { key, order } = action.payload
      console.log('{ key, order }:', { key, order })
      const sortedItems = state.items.sort((a, b) => {
        return sort({ a, b, key: key, sortBy: order })
      })

      state.items = sortedItems
    },
    handleSearch: (state, action) => {
      const searchBy = action.payload.toLowerCase()
      const searchedCountries = state.itemsRef.filter((item) => {
        const name = item.name.toLowerCase()
        if (name.startsWith(searchBy)) {
          return item
        }
        return false
      })

      state.items = searchedCountries
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountriesThunk.pending, (state) => {
      state.isLoading = true
      state.error = ''
    })
    builder.addCase(fetchCountriesThunk.rejected, (state) => {
      state.isLoading = true
      state.error = 'something went wrong'
    })
    builder.addCase(fetchCountriesThunk.fulfilled, (state, action) => {
      state.items = action.payload.data
      state.itemsRef = action.payload.data
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(fetchCountryThunk.pending, (state) => {
      state.isLoading = true
      state.error = ''
    })
    builder.addCase(fetchCountryThunk.rejected, (state) => {
      state.isLoading = false
      state.error = 'something went wrong'
    })
    builder.addCase(fetchCountryThunk.fulfilled, (state, action) => {
      state.items = action.payload.data
      state.itemsRef = action.payload.data
      state.isLoading = false
      state.error = ''
    })
  },
})

export const { handleSearch, handleSort } = countriesSlice.actions
export default countriesSlice.reducer
