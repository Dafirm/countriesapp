import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../redux/store'
import { fetchCountryThunk } from '../../redux/slices/countriesSlice'
import './CountryDetails.css'
import { Button, CardActions, Grid, Typography } from '@mui/material'
import { addToCart } from '../../redux/slices/CartAdd/CartAddSlice'

const CountryDetails = () => {
  const history = useHistory()
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: string }>()
  console.log('id:', id)

  const {
    countries: { items, error },
    cart,
  } = useSelector((state: RootState) => state)
  console.log('items:', items)

  const country = items.find((country) => country.name === id)

  useEffect(() => {
    if (!country) {
      dispatch(fetchCountryThunk(id))
    }
  }, [country, dispatch, id])

  if (!country || error) {
    return (
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item>
          <Typography variant="h1">
            {!country && 'FETCHING A COUNTRY!'}
            {error && error}
          </Typography>
        </Grid>
      </Grid>
    )
  }

  const handleAddToCart = () => {
    dispatch(addToCart(country))
  }

  const handleGoBack = () => {
    history.goBack()
  }

  const isInCart = cart.items.some((item) => item.name === country.name)

  return (
    <div className="CountryDetails__container">
      <h1>You want to know more about {country.name} ?</h1>
      <div className="CountryDetails__Info">
        <img src={country.flags.png} alt="flag" />
        <div>
          <h4>
            The Capital of {country.name} is : {country.capital}
          </h4>
          <h4>The Region can located in: {country.region}</h4>

          <h4>
            Their official Currencies is :
            {Object.values(country.currencies).map((cur) => cur.name)}
          </h4>
          <h4>
            {country.name} speaks :
            {Object.values(country.languages).map((lang) => (
              <li>{lang}</li>
            ))}
          </h4>

          <CardActions>
            <Button onClick={handleAddToCart} disabled={isInCart} size="small">
              ADD TO CART
            </Button>
            <Button onClick={handleGoBack} size="small">
              Home
            </Button>
          </CardActions>
        </div>
      </div>
    </div>
  )
}

export default CountryDetails
