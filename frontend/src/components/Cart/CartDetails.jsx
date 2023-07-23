import { Menu, MenuItem, Typography } from "@mui/material";

const CartDetails = ({ products, anchorEl, handleCloseCartDetail }) => {
  return (
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleCloseCartDetail}
    >
      {products.map(({ product: { title }, quantity }) => (
        <MenuItem key={title} >
          <Typography textAlign="center">{`${title} - ${quantity}`}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default CartDetails;