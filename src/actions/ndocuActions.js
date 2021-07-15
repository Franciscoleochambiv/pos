//ENDPOINT1+'/api/shoping1/cliente/'+data)
//GET_CARTSUNAT

import axios from "axios";
import {  
 
    GET_CARTNDOCU,
    NDOCUFILE_LOADING,    
    CLEAR_CURRENT_NDOCUFILE,
} from "./types.js";

//let unidad="https://adryan2.sytes.net:7001";
import { unidad } from "../variables";



export const fetch_ndocusql =  (id,serie) => async dispatch => {
    dispatch(setNdocufileLoading());
    try {
    const lolo =  await axios
      .get(unidad+`/api/shoping1/numero/`,{
        params:{
          id:id,
          serie:serie,
        }
      
     })
      .then(res => res.data)
         dispatch({
          type: GET_CARTNDOCU,
          payload: lolo,
          
          })
        
      
    }
      catch(err) {
         dispatch({
          type: GET_CARTNDOCU,
          payload: {}
        })
      }
  }   




  



export const setNdocufileLoading = () => {
    return {
      type: NDOCUFILE_LOADING
    };
  };
  
  export const clearCurrentNdocufile = () => {
    return {
      type: CLEAR_CURRENT_NDOCUFILE
    };
  };
  
  

