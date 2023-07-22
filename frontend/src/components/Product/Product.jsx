import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { addCartProduct, updateCartProductQty } from "../Cart/cart";
import { URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeOneProduct, setProductList } from "../../redux/cart/cartSlice";

const Product = ({ product:{ _id: pid, title: name, price, thumbnail } }) => {
  const cart = useSelector(state => state.cart);
  const { cartId: cid, productList } = cart;
  const dispatch = useDispatch();
  const removeCartProduct = async() => {
    try {
      const productInCart = productList.find(({product}) => product._id === pid);
      if(!productInCart) throw new Error('El producto no esta en el carro');
      await updateCartProductQty({ pid, cid, qty: productInCart.quantity - 1 });
      dispatch(removeOneProduct({ pid }));
    } catch (error) {
      console.error(error);
    }
  }
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
          image={thumbnail ?? `${URL}/products/no-default.png`}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography>
            {price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={removeCartProduct} size="small">-</Button>
          <Button onClick={addProductToCart} size="small">+</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Product;