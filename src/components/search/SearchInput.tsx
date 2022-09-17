import React from 'react'

import { useDispatch } from 'react-redux'
import { handleSearch } from '../../redux/slices/countriesSlice'
import './SearchInput.css'

const SearchInput = () => {
  const dispatch = useDispatch()

  const SubmitHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    console.log('target:', target.value)

    dispatch(handleSearch(target.value))
  }

  return (
    <form>
      <input
        type="text"
        placeholder="Search a country"
        onChange={SubmitHandler}
      />
    </form>
  )
}

export default SearchInput
