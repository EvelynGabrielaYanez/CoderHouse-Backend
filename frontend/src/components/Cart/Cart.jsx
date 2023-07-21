import { useSelector } from "react-redux";
import CartDetails from "./CartDetails.jsx";
import { Badge, Box, IconButton, Tooltip } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styled from "@emotion/styled";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Cart = ({ cartDetailsVisible, showCart, anchorElUser, handleCloseUserMenu}) => {
  const cartState = useSelector(state => state.cart);
  console.log(cartState)
  const { productList } = cartState;
  const qty = productList.reduce((accum, product) => accum + product.qty, 0);
  return (
    <Box sx={{ my: 2, color: 'white', display: 'block' }}>
      <Tooltip title="Detalle Carro">
        <IconButton sx={{ p: 0, marginRight: 3 }}>
          <StyledBadge badgeContent={qty} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </Tooltip>
      <CartDetails
        products={productList}
        anchorElUser={anchorElUser}
        handleCloseUserMenu={handleCloseUserMenu}
      />
    </Box>
  );
}

export default Cart;