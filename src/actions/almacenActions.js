import axios from "axios";
import {
  //GET_TIPOFILE,
  GET_ALMACENFILES,  
  ADD_ALMACENFILE,
  ALMACENFILE_LOADING,
  CLEAR_CURRENT_ALMACENFILE,
  GET_ERRORS,
  UPDATE_ALMACEN,
  DELETE_ALMACEN
} from "./types.js";
//import { GET_CATEGORIAFILES } from "../../../../../curso_react/menu3/client/src/actions/types.js";

import { unidad } from "../variables";



//let unidad="https://localhost";
//let unidad="https://adryan2.sytes.net:5000";
//let unidad="https://apisfsystem.herokuapp.com";
//let unidad="https://adryan2.sytes.net:7001";







export const addAlmacensql = (eduData, history) => dispatch => {
  axios
    .post(unidad+"/api/almacen/addalmacensql", eduData)
    .then(res => 
      dispatch({
        type: ADD_ALMACENFILE,
        payload: res.data
      })
    )
   // .then(res=> history.push("/view-categoria"))
    //.then(res=> history.push("/view-tipos"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const getCurrentAlmacensql = () => dispatch => {
  dispatch(setAlmacenfileLoading());
  axios
    .get(unidad+"/api/almacen/viewsql/")
    .then(res =>
      dispatch({
        type: GET_ALMACENFILES,
        payload: res.data
        
      })
      
    )
    .catch(err =>
      dispatch({
        type: GET_ALMACENFILES,
        payload: {}
      })
    );
    
};

export const deleteCurrentAlmacensql = (id) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Eliminar El Registro")) {
 // dispatch(setTiposfileLoading());
  axios
      .delete(unidad+`/api/almacen/viewsql/${id}`)
      
      //.then(res => history.push("/view-tipos"))

      .then(res =>
        dispatch({
          type: DELETE_ALMACEN,
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


export const updateCurrentAlmacensql = (id,tipoData) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Actualizar El Registro")) {
    
    console.log("reibiendo datos de Ipodata")
    //
    console.log(tipoData)
 // dispatch(setTiposfileLoading());
  axios
      .put(unidad+`/api/almacen/viewsql/${id}`,{
         codigo:tipoData.codigo,
         descripcion:tipoData.descripcion,
         direccion:tipoData.direccion,
         provincia:tipoData.provincia,
         ciudad:tipoData.ciudad,
         distrito:tipoData.distrito,
         almacen:tipoData.almacen,
         empresa:tipoData.empresa,
         tel:tipoData.tel
      })
      
      
      
      
      .then(res =>{ 
        console.log(tipoData)
        console.log("actualizando con PUT devolviendo datos   ")
       // console.log(res.tipoData)
       // dispatch(setTiposfileLoading());
       dispatch({
         type: UPDATE_ALMACEN,
         payload: {
               id:id,
               codigo:tipoData.codigo,
               descripcion:tipoData.descripcion,
               direccion:tipoData.direccion,
               provincia:tipoData.provincia,
               ciudad:tipoData.ciudad,
               distrito:tipoData.distrito,
               almacen:tipoData.almacen,
               empresa:tipoData.empresa,
               tel:tipoData.tel
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








export const setAlmacenfileLoading = () => {
  return {
    type: ALMACENFILE_LOADING
  };
};

export const clearCurrentAlmacenfile = () => {
  return {
    type: CLEAR_CURRENT_ALMACENFILE
  };
};
