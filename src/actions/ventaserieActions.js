import axios from "axios";
import {  
 
    GET_CARTVENTASERIE,
    VENTASERIEFILE_LOADING,
    CLEAR_CURRENT_VENTASERIEFILE,
} from "./types.js";


import { unidad } from "../variables";



export const fetch_ventaseriesql =  (id) => async dispatch => {
    dispatch(setVentaseriefileLoading());
    //${id}
    try {
    const lolo =  await axios
      .get(unidad+`/api/shoping1/ventaserie/${id}`)
      .then(res => res.data)
         dispatch({
          type: GET_CARTVENTASERIE,
          payload: lolo,
          
          })
        
      
    }
      catch(err) {
         dispatch({
          type: GET_CARTVENTASERIE,
          payload: {}
        })
      }
  }   


  export const setVentaseriefileLoading = () => {
    return {
      type: VENTASERIEFILE_LOADING
    };
  };
  
  export const clearCurrentVentaseriefile = () => {
    return {
      type: CLEAR_CURRENT_VENTASERIEFILE
    };
  };
  
  