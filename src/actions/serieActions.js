import axios from "axios";
import {
  //GET_TIPOFILE,
  GET_SERIEFILES,  
  ADD_SERIEFILE,
  SERIEFILE_LOADING,
  CLEAR_CURRENT_SERIEFILE,
  GET_ERRORS,
  UPDATE_SERIE,
  DELETE_SERIE
} from "./types.js";
//import { GET_CATEGORIAFILES } from "../../../../../curso_react/menu3/client/src/actions/types.js";



//let unidad="https://localhost";
//let unidad="https://adryan2.sytes.net:5000";
//let unidad="https://apisfsystem.herokuapp.com";
//let unidad="https://adryan2.sytes.net:7001";

import { unidad } from "../variables";






export const addSeriesql = (eduData, history) => dispatch => {
  axios
    .post(unidad+"/api/serie/addseriesql", eduData)
    .then(res => 
      dispatch({
        type: ADD_SERIEFILE,
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


export const getCurrentSeriesql = () => dispatch => {
  dispatch(setSeriefileLoading());
  axios
    .get(unidad+"/api/serie/viewsql/")
    .then(res =>
      dispatch({
        type: GET_SERIEFILES,
        payload: res.data
        
      })
      
    )
    .catch(err =>
      dispatch({
        type: GET_SERIEFILES,
        payload: {}
      })
    );
    
};

export const deleteCurrentSeriesql = (id) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Eliminar El Registro")) {
 // dispatch(setTiposfileLoading());
  axios
      .delete(unidad+`/api/serie/viewsql/${id}`)
      
      //.then(res => history.push("/view-tipos"))

      .then(res =>
        dispatch({
          type: DELETE_SERIE,
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


export const updateCurrentSeriesql = (id,tipoData) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Actualizar El Registro")) {
    
    console.log("reibiendo datos de Ipodata")
    //
    console.log(tipoData)
 // dispatch(setTiposfileLoading());
  axios
      .put(unidad+`/api/serie/viewsql/${id}`,{
         codigo:tipoData.codigo,
         descripcion:tipoData.descripcion
      })
      
      
      
      
      .then(res =>{ 
        console.log(tipoData)
        console.log("actualizando con PUT devolviendo datos   ")
       // console.log(res.tipoData)
       // dispatch(setTiposfileLoading());
       dispatch({
         type: UPDATE_SERIE,
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








export const setSeriefileLoading = () => {
  return {
    type: SERIEFILE_LOADING
  };
};

export const clearCurrentSeriefile = () => {
  return {
    type: CLEAR_CURRENT_SERIEFILE
  };
};
