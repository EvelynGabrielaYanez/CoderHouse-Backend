const styles = {
  cartDetail: {
    backgroundColor: '#fff',
    position: 'absolute',
    marginTop: 30,
    boxShadow: '1px 5px 5px rgb(0,0,0,0.1)',
    borderRadius: '5px',
    width: '300px',
    right: 50
  },
  ul: {
    margin: 0,
    padding: 0
  },
  product: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '25px 20px',
    borderBottom: 'solid 1px #aaa'
  }
}
const CartDetails = ({ cart }) => {
  return (
    <div style={styles.cartDetail}>
      <ul style={styles.ul}>
        {cart.map(product =>
          <li key={product.name} style={styles.product}>
            <img alt={product.name} src={product.img} width='50' height='32'/>
            {product.name} <span>{product.qty}</span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default CartDetails;