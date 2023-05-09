import Product from "../Product/Product";

const styles = {
  products: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}

const ProductsList = (props) => {
  const { products, addToCart } = props
  return (
    <div style={styles.products}>
      {products.map(product =>
        <Product
          addToCart={addToCart}
          key={product.name}
          product={product}
          />
        )
      }
    </div>
  );
}

export default ProductsList;