import Button from "../Button/Button";

const styles = {
  product: {
    border: 'solid 1px #eee',
    boxShadow: '0 5px 5px rgb(0,0,0, 0.1)',
    width: '30%',
    padding: '10px 15px',
    borderRadius: '5px'
  },
  img: {
    width: '100%'
  }
}

const Product = ({ product, addToCart }) => {
  return (<div style={styles.product}>
    <img style={styles.img} alt={product.name} src={product.img}></img>
    <h3>{product.name}</h3>
    <p>{product.price}</p>
    <Button onClick={() => addToCart(product)}>
      Agregar al carro
    </Button>
  </div>);
}

export default Product;