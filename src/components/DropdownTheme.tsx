import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'

type DropdownProps = {
  children: React.ReactNode
}
const DropDown = ({ children }: DropdownProps) => {
  const [dropDown, setDropDown] = React.useState<null | HTMLElement>(null)
  const open = !!dropDown
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDropDown(event.currentTarget)
  }
  const handleClose = () => {
    setDropDown(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={dropDown}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {children}
      </Menu>
    </div>
  )
}

export default DropDown
