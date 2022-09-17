import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import CountryDetails from './pages/countryDetails/CountryDetails'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/:id" component={CountryDetails} />
  </Switch>
)

export default Routes
