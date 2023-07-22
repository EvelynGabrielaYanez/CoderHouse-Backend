import { useDispatch, useSelector } from "react-redux"
import { getCookie } from "../../utils/cookies";
import { findCurrentUser } from "../../utils/user";
import { useEffect, useState } from "react";
import { setCartInfo } from "../../redux/cart/cartSlice";
import Cookies from "js-cookie";
import { getCartProducts } from "../Cart/cart";

export const useUserLogged = () => {
  const [state, setState] = useState({ logged: false});
  const { logged } = state;
  //const cart  = useSelector(state => state.cart);
//  const dispatch = useDispatch();
  const token = Cookies.get('jwt');
  const { cartId, userId } =  {};
  useEffect(() => {
    const validateLogin = async () => {
      try {
        if (!token?.length) {
          Cookies.remove('jwt');
          setState(state => ({...state, logged: false }))
        };

        if(!cartId || !userId) {
          const currentUserData = await findCurrentUser();
          const { products } = await getCartProducts({ cid: currentUserData._id });
      //    dispatch(setCartInfo({ uid: currentUserData._id, cid: currentUserData.cart , products }));
        }
       // setState(state => ({...state , logged: true }));
      } catch (error) {
        Cookies.remove('jwt');
        //dispatch(setCartInfo({ uid: null, cid: null, products:[] }));
        console.error(error);
       // setState(state => ({...state, logged: false }));
      }
    }
    validateLogin();
  }, [setState, token, cartId, userId]);
  return logged;
}