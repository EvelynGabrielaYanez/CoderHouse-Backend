import { useSelector } from "react-redux";
import CartDetails from "./CartDetails.jsx";
import { Badge, Box, IconButton, Tooltip } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styled from "@emotion/styled";
import { useState } from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Cart = () => {
  const cartState = useSelector(state => state.cart);
  const [anchorElCart, setAnchorElCart] = useState(null);
  const { productList } = cartState;

  const handleOpenCartDetail = (event) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleCloseCartDetail = () => {
    setAnchorElCart(null);
  };

  const qty = productList.reduce((accum, product) => accum + product.quantity, 0);
  return (
    <Box sx={{ my: 2, color: 'white', display: 'block' }}>
      <Tooltip title="Detalle Carro">
        <IconButton onClick={handleOpenCartDetail} sx={{ p: 0, marginRight: 3 }}>
          <StyledBadge badgeContent={qty} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </Tooltip>
      <CartDetails
        products={productList}
        anchorEl={anchorElCart}
        handleCloseCartDetail={handleCloseCartDetail}
      />
    </Box>
  );
}

export default Cart;