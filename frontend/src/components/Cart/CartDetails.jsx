import { Menu, MenuItem, Typography } from "@mui/material";

const CartDetails = ({ products, anchorElUser, handleCloseUserMenu }) => {
  return (
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {products.map(({ product: { title }, qty }) => (
        <MenuItem key={title} >
          <Typography textAlign="center">{`${title} ${qty}`}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default CartDetails;