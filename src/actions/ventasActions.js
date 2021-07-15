//import * as CONSTANTS from "./Constants";


import axios from "axios";
import {  
  GET_CARTPRO,
  GET_CARTCATE,
  ADD_ITEM_IN_CART,

  SHOW_CART_DLG,  
  DELETE_CART_ITEM,
  DELETE_CART,
  TOGGLE_MENU,
  UPDATE_CART_ITEM_QUANTITY,

  UPDATE_CART_ITEM_DESCRIPCION,
  SET_CHECKEDOUT_ITEMS,
  SET_LOGGED_IN_USER,
  LOGOUT,
  VENTAFILE_LOADING,
  CLEAR_CURRENT_VENTAFILE,
  UPDATE_CART_ITEM_PRICE, 
  UPDATE_CART_ITEM_TOTAL,

  
} from "./types.js";


import { unidad } from "../variables";


//let unidad="https://adryan2.sytes.net:7001";



export const fetch_datasql = () => dispatch => {
  dispatch(setVentafileLoading());
  axios
    .get(unidad+"/api/shoping1/productos")
    .then(res =>
      dispatch({
        type: GET_CARTPRO,
        payload: res.data
        
      })
      
    )
    .catch(err =>
      dispatch({
        type: GET_CARTPRO,
        payload: {}
      })
    );
    
};




export const fetch_datacatesql = () => dispatch => {
  dispatch(setVentafileLoading());
  axios
    .get(unidad+"/api/shoping1/categorias")
    .then(res =>
      dispatch({
        type:GET_CARTCATE ,
        payload: res.data
        
      })
      
    )
    .catch(err =>
      dispatch({
        type: GET_CARTCATE,
        payload: {}
      })
    );
    
};




export const fetch_data = async () =>{
    const llamada = await fetch(unidad+'/api/shoping1/productos')
    const data = await llamada.json()        
    return data;
};


export  const   fetch_datacate = async () =>{
    const llamada2 = await fetch(unidad+'/api/shoping1/categorias')
    const data2 = await llamada2.json()
    return data2;
  };


export const addItemInCart = item => ({
  type: ADD_ITEM_IN_CART,
  payload: item
});




export const uppItemInCartDescri = obj => ({
  type: UPDATE_CART_ITEM_DESCRIPCION,
  payload: obj
});

export const showCartDlg = status => ({
  type: SHOW_CART_DLG,
  payload: status
});
export const deleteCartItem = id => ({
  type: DELETE_CART_ITEM,
  payload: id
});


export const deleteCart = status => ({
  type: DELETE_CART,
  payload: status
});


export const toggleMenu = () => ({
  type: TOGGLE_MENU,
  payload: null
});
export const updateCartItemQnt = obj => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: obj
});
export const setCheckedOutItems = items => ({
  type: SET_CHECKEDOUT_ITEMS,
  payload: items
});
export const setLoggedInUser = user => ({
  type: SET_LOGGED_IN_USER,
  payload: user
});
export const logout = () => ({
  type: LOGOUT,
});

export const updateCartItemPri = obj => ({
  type: UPDATE_CART_ITEM_PRICE,
  payload: obj
});


export const updateCartItemTotal = obj => ({
  type: UPDATE_CART_ITEM_TOTAL,
  payload: obj
});



export const setVentafileLoading = () => {
  return {
    type: VENTAFILE_LOADING
  };
};

export const clearCurrentVentafile = () => {
  return {
    type: CLEAR_CURRENT_VENTAFILE
  };
};





