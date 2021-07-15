//ENDPOINT1+'/api/shoping1/cliente/'+data)
//GET_CARTSUNAT

import axios from "axios";
import {  
 
    GET_CARTDNI,
    DNIFILE_LOADING,
    CLEAR_CURRENT_DNIFILE,
} from "./types.js";

//let unidad="https://adryan2.sytes.net:7001";



export const fetch_dnisql =  (id) => async dispatch => {
    dispatch(setDnifileLoading());
    try {
    const lolo =  await axios
    //const llamada2 = await fetch('')
      .get('https://dniruc.apisperu.com/api/v1/dni/'+id+'?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImdydXBvODBwckBnbWFpbC5jb20ifQ.cPdYTOafYcdlXPBGBrAUPl9FGTkHpc0dPW1FcH10Plg', { headers: {'Access-Control-Allow-Origin': '*.*'} }  )
      .then(res => res.data)
         dispatch({
          type: GET_CARTDNI,
          payload: lolo,
          
          })
        
      
    }
      catch(err) {
         dispatch({
          type: GET_CARTDNI,
          payload: {}
        })
      }
  }   




  



export const setDnifileLoading = () => {
    return {
      type: DNIFILE_LOADING
    };
  };
  
  export const clearCurrentDnifile = () => {
    return {
      type: CLEAR_CURRENT_DNIFILE
    };
  };
  
  