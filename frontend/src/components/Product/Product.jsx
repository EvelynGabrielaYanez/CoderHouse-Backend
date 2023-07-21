import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { addCartProduct, deleteCartProduct } from "../Cart/cart";

const Product = ({ product:{ _id: pid, title: name, price } }) => {

  const removeCartProduct = (e) => {
    console.log(e)
  }
  const addProductToCart = (e) => {
    console.log(e)
  }
  return (
    <Grid item key={pid} xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="div"
          sx={{
            pt: '56.25%',
          }}
          image="https://source.unsplash.com/random?wallpapers"
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