import * as React from 'react'

import { RootState } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import './Cart.css'
import { removeFromCart } from '../../redux/slices/CartAdd/CartAddSlice'
import {
  Box,
  Button,
  Typography,
  Modal,
  styled,
  Badge,
  BadgeProps,
  IconButton,
} from '@mui/material'
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))

function Cart() {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const { items } = useSelector((state: RootState) => state.cart)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const isEmpty = items.length === 0

  return (
    <div>
      <IconButton aria-label="cart" onClick={handleOpen}>
        <StyledBadge badgeContent={items.length} color="primary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="countries-cart"
        aria-describedby="display-selected-countries"
      >
        <Box sx={style}>
          <h2>Your Favourite Countries</h2>
          {isEmpty && (
            <Typography id="countries-cart" variant="h6" component="h2">
              Your cart is empty!
            </Typography>
          )}
          {items.map((item) => {
            return (
              <div className="cart__Button">
                <Typography id="countries-cart" variant="h6" component="h2">
                  <div className="country_added">
                    <img src={item.flags.png} alt="flag" />
                    {item.name}
                  </div>
                </Typography>
                <Button
                  onClick={() => dispatch(removeFromCart({ name: item.name }))}
                >
                  <DeleteForeverIcon />
                </Button>
              </div>
            )
          })}
        </Box>
      </Modal>
    </div>
  )
}

export default Cart
