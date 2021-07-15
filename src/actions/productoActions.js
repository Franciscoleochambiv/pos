import axios from "axios";
import {
  GET_PRODUCTOFILE,
  GET_PRODUCTOFILES,  
  ADD_PRODUCTOFILE,
  PRODUCTOFILE_LOADING,
  CLEAR_CURRENT_PRODUCTOFILE,
  GET_ERRORS,
  UPDATE_PRODUCTO,
  DELETE_PRODUCTO,
  BUSCA_PRO,  
} from "./types.js";






//let unidad="https://adryan2.sytes.net:3001";
//let unidad="https://apisfsystem.herokuapp.com";

//let unidad="https://adryan2.sytes.net:7001";

import { unidad } from "../variables";



export const addProducto = (eduData, history) => dispatch => {
  axios
    .post(unidad+"/api/categoria", eduData)
    .then(res => 
      dispatch({
        type: ADD_PRODUCTOFILE,
        payload: res.data
      })
    )   
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteCurrentProducto = (id) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Eliminar El Registro")) {
 // dispatch(setTiposfileLoading());
  axios
      .delete(unidad+`/api/categoria/view/${id}`)
      
      //.then(res => history.push("/view-tipos"))

      .then(res =>
        dispatch({
          type: DELETE_PRODUCTO,
          payload: id
        })
        
      )
      
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: {}
        })
      );
      //console.log(res)
};
}


export const updateCurrentProducto = (id,tipoData) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Actualizar El Registro")) {
    
    console.log("reibiendo datos de Ipodata")
    //
    console.log(tipoData)
 // dispatch(setTiposfileLoading());
  axios
      .put(unidad+`/api/categoria/view/${id}`,{
         codigo:tipoData.codigo,
         descripcion:tipoData.descripcion
      })
      
      
      
      
      .then(res =>{ 
        console.log(tipoData)
        console.log("actualizando con PUT devolviendo datos   ")
       // console.log(res.tipoData)
       // dispatch(setTiposfileLoading());
       dispatch({
         type: UPDATE_PRODUCTO,
         payload: {
               _id:id,
               codigo:tipoData.codigo,
               descripcion:tipoData.descripcion   
         }
       })
      }
        
      )
     
       

      //.then(res=> history.push("/view-tipos"))
      
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: {}
        })
      );
      //console.log(res)
};
}



export const getProdcutoByHandle = handle => dispatch => {
  dispatch(setProductofileLoading());
  axios
    .get(unidad+`/api/categoria/viewcat/${handle}`)
    //.get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type:GET_PRODUCTOFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRODUCTOFILE,
        payload: null
      })
    );
};



export const getCurrentProducto = () => dispatch => {
  dispatch(setProductofileLoading());
  axios  
    .get(unidad+"/api/shoping1/productos")
    .then(res =>
      dispatch({
        type: GET_PRODUCTOFILES,
        payload: res.data
        
      })
      
    )
    .catch(err =>
      dispatch({
        type: GET_PRODUCTOFILES,
        payload: {}
      })
    );
    
};




export const getCurrentBusca = (term) => dispatch => {
  dispatch(setProductofileLoading());
  axios  
    .get(unidad+"/api/shoping1/productos")
    .then(res =>
      dispatch({
        type: BUSCA_PRO,

        payload: {
          term:term,
          data:res.data
          
       }
     //   payload: res.data
        
      })
      
    )
    .catch(err =>
      dispatch({
        type: BUSCA_PRO,
        payload: {
          term:"",
          data:{}
        }
      })
    );
    
};





export const setProductofileLoading = () => {
  return {
    type: PRODUCTOFILE_LOADING
  };
};

export const clearCurrentProdcutofile = () => {
  return {
    type: CLEAR_CURRENT_PRODUCTOFILE
  };
};
