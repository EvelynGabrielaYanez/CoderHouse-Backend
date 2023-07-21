import Logo from "../Logo/Logo";
import Cart from "../Cart/Cart.jsx";

const styles = {
  navbar: {
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100px',
    justifyContent: 'space-between',
    position: 'relative',
    padding: '0 50px',
    boxShadow: '0 2px 3px rgb(0,0,0,0.1)'
  }
}

const Navbar = ({ cart, cartVisible, showCart }) => {
  return (
    <nav style={styles.navbar}>
      <Logo/>
      <Cart
        cart={cart}
        cartVisible={cartVisible}
        showCart={showCart}
      />
    </nav>
  );
}

export default Navbar;