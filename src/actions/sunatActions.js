//ENDPOINT1+'/api/shoping1/cliente/'+data)
//GET_CARTSUNAT

import axios from "axios";
import {  
 
    GET_CARTSUNAT,
    SUNATFILE_LOADING,
    CLEAR_CURRENT_SUNATFILE,
} from "./types.js";

//let unidad="https://adryan2.sytes.net:7001";

import { unidaddocker } from "../variables";



export const fetch_sunatsql =  (id) => async dispatch => {
    dispatch(setSunatfileLoading());
    try {
    const lolo =  await axios
      .get(unidaddocker+`/api/consulta/viewmsql/${id}`
      )
      .then(res => res.data)
         dispatch({
          type: GET_CARTSUNAT,
          payload: lolo,
          
          })
        
      
    }
      catch(err) {
         dispatch({
          type: GET_CARTSUNAT,
          payload: {}
        })
      }
  }   




  



export const setSunatfileLoading = () => {
    return {
      type: SUNATFILE_LOADING
    };
  };
  
  export const clearCurrentSunatfile = () => {
    return {
      type: CLEAR_CURRENT_SUNATFILE
    };
  };
  
  
