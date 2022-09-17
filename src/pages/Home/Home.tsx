import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCountriesThunk,
  handleSort,
} from '../../redux/slices/countriesSlice'
import { AppDispatch, RootState } from '../../redux/store'
import './Home.css'
import { Button } from '@mui/material'
import { addToCart } from '../../redux/slices/CartAdd/CartAddSlice'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const [sortBy, setSortBy] = useState({
    name: 'asc',
    population: 'asc',
  })
  const { countries, cart } = useSelector((state: RootState) => state)

  useEffect(() => {
    dispatch(fetchCountriesThunk())
  }, [dispatch])

  const handleSortByName = () => {
    if (sortBy.name === 'asc') {
      dispatch(handleSort({ key: 'name', order: 'asc' }))
      setSortBy((prevState) => ({
        ...prevState,
        name: 'desc',
      }))
    } else {
      dispatch(handleSort({ key: 'name', order: 'desc' }))
      setSortBy((prevState) => ({
        ...prevState,
        name: 'asc',
      }))
    }
  }
  const handleSortByPopulation = () => {
    if (sortBy.population === 'asc') {
      dispatch(handleSort({ key: 'population', order: 'asc' }))
      setSortBy((prevState) => ({
        ...prevState,
        population: 'desc',
      }))
    } else {
      dispatch(handleSort({ key: 'population', order: 'desc' }))
      setSortBy((prevState) => ({
        ...prevState,
        population: 'asc',
      }))
    }
  }

  return (
    <div className="Home_container">
      <h3>{countries.isLoading && '...'}</h3>

      <div className="Table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className="Title__header">
                <TableCell>
                  <h3>Flag</h3>
                </TableCell>
                <TableCell>
                  <h3>
                    Country
                    <>
                      <SortByAlphaIcon
                        className="sort"
                        onClick={handleSortByName}
                      />
                    </>
                  </h3>
                </TableCell>
                <TableCell>
                  <h3>
                    Population
                    <>
                      <ArrowCircleDownIcon
                        className="sortPop"
                        onClick={handleSortByPopulation}
                      />
                    </>
                  </h3>
                </TableCell>
                <TableCell>
                  <h3>Region</h3>
                </TableCell>
                <TableCell>
                  <h3>Language</h3>
                </TableCell>
                <TableCell>
                  <h3>Cart</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {countries.items.map((country) => {
                const isInCart = cart.items.some(
                  (item) => item.name === country.name
                )
                return (
                  <TableRow key={country.name}>
                    <TableCell>
                      <img src={country.flags.png} alt="flag" />
                    </TableCell>
                    <TableCell>
                      <Link to={country.name}>{country.name}</Link>
                    </TableCell>

                    <TableCell>{country.population}</TableCell>
                    <TableCell>{country.region}</TableCell>
                    <TableCell>
                      {Object.values(country.languages).map((lang) => (
                        <li>{lang}</li>
                      ))}
                    </TableCell>
                    <TableCell className="cart__button">
                      <Button
                        variant="contained"
                        onClick={() => dispatch(addToCart(country))}
                        disabled={isInCart}
                      >
                        ADD
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
