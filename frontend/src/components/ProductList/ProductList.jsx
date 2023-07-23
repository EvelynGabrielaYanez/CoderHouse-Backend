import { Grid } from "@mui/material";
import Product from "../Product/Product.jsx";

const ProductsList = ({ products, addToCart, deleteFromCart }) => {
  return (
    <Grid container spacing={4}>
    {products.map((product) => (
      <Product key={JSON.stringify(product)}
        deleteFromCart={deleteFromCart}
        addToCart={addToCart}
        product={product}
      />
    ))}
  </Grid>
  );
}

export default ProductsList;