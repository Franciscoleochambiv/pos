import axios from "axios";
import {
  //GET_TIPOFILE,
  GET_UMEDIDAFILES,  
  ADD_UMEDIDAFILE,
  UMEDIDAFILE_LOADING,
  CLEAR_CURRENT_UMEDIDAFILE,
  GET_ERRORS,
  UPDATE_UMEDIDA,
  DELETE_UMEDIDA
} from "./types.js";
//import { GET_CATEGORIAFILES } from "../../../../../curso_react/menu3/client/src/actions/types.js";



//let unidad="https://localhost";
//let unidad="https://adryan2.sytes.net:5000";
//let unidad="https://apisfsystem.herokuapp.com";
//let unidad="https://adryan2.sytes.net:7001";

import { unidad } from "../variables";







export const addUmedidasql = (eduData, history) => dispatch => {
  axios
    .post(unidad+"/api/umedida/addumedidasql", eduData)
    .then(res => 
      dispatch({
        type: ADD_UMEDIDAFILE,
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


export const getCurrentUmedidasql = () => dispatch => {
  dispatch(setUmedidafileLoading());
  axios
    .get(unidad+"/api/umedida/viewsql/")
    .then(res =>
      dispatch({
        type: GET_UMEDIDAFILES,
        payload: res.data
        
      })
      
    )
    .catch(err =>
      dispatch({
        type: GET_UMEDIDAFILES,
        payload: {}
      })
    );
    
};

export const deleteCurrentUmedidasql = (id) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Eliminar El Registro")) {
 // dispatch(setTiposfileLoading());
  axios
      .delete(unidad+`/api/umedida/viewsql/${id}`)
      
      //.then(res => history.push("/view-tipos"))

      .then(res =>
        dispatch({
          type: DELETE_UMEDIDA,
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


export const updateCurrentUmedidasql = (id,tipoData) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Actualizar El Registro")) {
    
    console.log("reibiendo datos de Ipodata")
    //
    console.log(tipoData)
 // dispatch(setTiposfileLoading());
  axios
      .put(unidad+`/api/umedida/viewsql/${id}`,{
         codigo:tipoData.codigo,
         descripcion:tipoData.descripcion
      })
      
      
      
      
      .then(res =>{ 
        console.log(tipoData)
        console.log("actualizando con PUT devolviendo datos   ")
       // console.log(res.tipoData)
       // dispatch(setTiposfileLoading());
       dispatch({
         type: UPDATE_UMEDIDA,
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








export const setUmedidafileLoading = () => {
  return {
    type: UMEDIDAFILE_LOADING
  };
};

export const clearCurrentUmedidafile = () => {
  return {
    type: CLEAR_CURRENT_UMEDIDAFILE
  };
};
