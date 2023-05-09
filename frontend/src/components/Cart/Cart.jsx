import BubbleAlert from "../BubbleAlert/BubbleAlert.jsx";
import CartDetails from "./CartDetails.jsx";

const styles = {
  cart: {
    backgroundColor: '#359A2C',
    color: '#fff',
    border: 'none',
    padding: '15px',
    borderRadius: '15px',
    cursor: 'pointer'
  },
  bubble: {
    position: 'relative',
    left: '12px',
    top: '20px'
  }
}
const Cart = ({ cart = [], cartVisible, showCart }) => {
  const qty = cart.reduce((accum, product) => accum + product.qty, 0);
  return (
    <div>
      <span style={styles.bubble}>
        {qty ? <BubbleAlert value={qty}/> : null}
      </span>
      <button style={styles.cart}
        onClick={showCart}>
        Carro
      </button>
      {cartVisible ? <CartDetails cart={cart}/> : null}
    </div>
  );
}

export default Cart;