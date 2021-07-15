import axios from "axios";
import {
  //GET_TIPOFILE,
  GET_TIPOFILES,  
  ADD_TIPOFILE,
  TIPOFILE_LOADING,
  CLEAR_CURRENT_TIPOFILE,
  GET_ERRORS,
  UPDATE_TIPO,
  DELETE_TIPO
} from "./types.js";
//import { GET_CATEGORIAFILES } from "../../../../../curso_react/menu3/client/src/actions/types.js";



//let unidad="https://localhost";
//let unidad="https://adryan2.sytes.net:5000";
//let unidad="https://apisfsystem.herokuapp.com";
//let unidad="https://adryan2.sytes.net:7001";

import { unidad } from "../variables";







export const addTiposql = (eduData, history) => dispatch => {
  axios
    .post(unidad+"/api/tipo/addtiposql", eduData)
    .then(res => 
      dispatch({
        type: ADD_TIPOFILE,
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


export const getCurrentTiposql = () => dispatch => {
  dispatch(setTipofileLoading());
  axios
    .get(unidad+"/api/tipo/viewsql/")
    .then(res =>
      dispatch({
        type: GET_TIPOFILES,
        payload: res.data
        
      })
      
    )
    .catch(err =>
      dispatch({
        type: GET_TIPOFILES,
        payload: {}
      })
    );
    
};

export const deleteCurrentTiposql = (id) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Eliminar El Registro")) {
 // dispatch(setTiposfileLoading());
  axios
      .delete(unidad+`/api/tipo/viewsql/${id}`)
      
      //.then(res => history.push("/view-tipos"))

      .then(res =>
        dispatch({
          type: DELETE_TIPO,
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


export const updateCurrentTiposql = (id,tipoData) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Actualizar El Registro")) {
    
    console.log("reibiendo datos de Ipodata")
    //
    console.log(tipoData)
 // dispatch(setTiposfileLoading());
  axios
      .put(unidad+`/api/tipo/viewsql/${id}`,{
         codigo:tipoData.codigo,
         descripcion:tipoData.descripcion
      })
      
      
      
      
      .then(res =>{ 
        console.log(tipoData)
        console.log("actualizando con PUT devolviendo datos   ")
       // console.log(res.tipoData)
       // dispatch(setTiposfileLoading());
       dispatch({
         type: UPDATE_TIPO,
         payload: {
               id:id,
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








export const setTipofileLoading = () => {
  return {
    type: TIPOFILE_LOADING
  };
};

export const clearCurrentTipofile = () => {
  return {
    type: CLEAR_CURRENT_TIPOFILE
  };
};
