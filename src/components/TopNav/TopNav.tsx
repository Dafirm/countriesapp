import React from 'react'

// import { RootState } from '../../redux/store'

import { MenuItem } from '@mui/material'
import { ThemeContext } from '../../App'

import './TopNav.css'
import Cart from '../Cart/Cart'
import DropDown from '../DropdownTheme'
import map1 from '../../image/map1.png'
import SearchInput from '../search/SearchInput'

const TopNav = ({ withSearch = true }: { withSearch?: boolean }) => {
  const { setTheme } = React.useContext(ThemeContext)

  const menuItems = [
    { label: 'Dark', action: () => setTheme('dark') },
    { label: 'Light', action: () => setTheme('light') },
    { label: 'Blue', action: () => setTheme('blue') },
  ]
  // const cart = useSelector((state: RootState) => state.cart.items)
  return (
    <div className="nav">
      <div className="content">
        <DropDown>
          <h4>Select your favourite theme</h4>
          {menuItems.map((item) => (
            <MenuItem
              className="Dropdown"
              key={item.label}
              onClick={item.action}
            >
              {item.label}
            </MenuItem>
          ))}
        </DropDown>
        <h1 className="brand">
          <a href="/"> COUNTRIES</a>
        </h1>
        <img className="map__png" src={map1} alt="" />
      </div>
      <div className="nav__items">
        <div className="sidebar__searchContainer">
          <SearchInput />
        </div>
        <div className="nav__items__cart">
          <Cart />
        </div>
      </div>

      <div className="dropdown" id="dropdown"></div>
    </div>
  )
}

export default TopNav
