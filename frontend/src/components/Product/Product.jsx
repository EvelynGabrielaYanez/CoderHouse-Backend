import { Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import { addCartProduct, deleteCartProduct, updateCartProductQty } from "../Cart/cart";
import { URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeOneProduct, setProductList } from "../../redux/cart/cartSlice";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const Product = ({ product:{ _id: pid, title: name, price, description, category, thumbnail } }) => {
  const cart = useSelector(state => state.cart);
  const { cartId: cid, productList, userRole } = cart;
  const dispatch = useDispatch();
  const removeCartProduct = async() => {
    try {
      const productInCart = productList.find(({product}) => product._id === pid);
      if(!productInCart) throw new Error('El producto no esta en el carro');
      const qty = productInCart.quantity - 1;
      if (qty) await updateCartProductQty({ pid, cid, qty: qty });
      else await deleteCartProduct({ cid, pid});
      dispatch(removeOneProduct({ pid }));
    } catch (error) {
      console.error(error.message);
    }
  }
  const productIsInCart = () => productList.some((({ product }) => product._id === pid));
  const addProductToCart = async() => {
    let { products } = await addCartProduct({ pid, cid });
    dispatch(setProductList({ products }));
  }
  return (
    <Grid item key={pid} xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="div"
          sx={{
            pt: '56.25%',
          }}
          image={thumbnail.length ? `${URL}/products/${thumbnail[0]}` : `${URL}/products/no-default.png`}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {`${name} - ${category.charAt(0).toUpperCase()}${category?.slice(1)?.toLowerCase()}`}
          </Typography>
          <Typography>
            {`${description}`}
          </Typography>
          <Typography>
          {`$${price}`}
          </Typography>
        </CardContent>
        {
          userRole !== 'Admin' ?
          <CardActions sx={{ justifyContent: "right" }}>
            {productIsInCart() ? <IconButton onClick={removeCartProduct} size="small"><RemoveCircleIcon/></IconButton> : null }
            <IconButton onClick={addProductToCart} size="small"><AddCircleIcon/></IconButton>
          </CardActions>
          : null
        }
      </Card>
    </Grid>
  );
}

export default Product;