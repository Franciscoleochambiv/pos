import axios from "axios";
import {
  //GET_TIPOFILE,
  GET_LINEAFILES,  
  ADD_LINEAFILE,
  LINEAFILE_LOADING,
  CLEAR_CURRENT_LINEAFILE,
  GET_ERRORS,
  UPDATE_LINEA,
  DELETE_LINEA
} from "./types.js";
//import { GET_CATEGORIAFILES } from "../../../../../curso_react/menu3/client/src/actions/types.js";



//let unidad="https://localhost";
//let unidad="https://adryan2.sytes.net:5000";
//let unidad="https://apisfsystem.herokuapp.com";
//let unidad="https://adryan2.sytes.net:7001";



import { unidad } from "../variables";



export const addLineasql = (eduData, history) => dispatch => {
  axios
    .post(unidad+"/api/linea/addlineasql", eduData)
    .then(res => 
      dispatch({
        type: ADD_LINEAFILE,
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


export const getCurrentLineasql = () => dispatch => {
  dispatch(setLineafileLoading());
  axios
    .get(unidad+"/api/linea/viewsql/")
    .then(res =>
      dispatch({
        type: GET_LINEAFILES,
        payload: res.data
        
      })
      
    )
    .catch(err =>
      dispatch({
        type: GET_LINEAFILES,
        payload: {}
      })
    );
    
};

export const deleteCurrentLineasql = (id) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Eliminar El Registro")) {
 // dispatch(setTiposfileLoading());
  axios
      .delete(unidad+`/api/linea/viewsql/${id}`)
      
      //.then(res => history.push("/view-tipos"))

      .then(res =>
        dispatch({
          type: DELETE_LINEA,
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


export const updateCurrentLineasql = (id,tipoData) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Actualizar El Registro")) {
    
    console.log("reibiendo datos de Ipodata")
    //
    console.log(tipoData)
 // dispatch(setTiposfileLoading());
  axios
      .put(unidad+`/api/linea/viewsql/${id}`,{
         codigo:tipoData.codigo,
         descripcion:tipoData.descripcion
      })
      
      
      
      
      .then(res =>{ 
        console.log(tipoData)
        console.log("actualizando con PUT devolviendo datos   ")
       // console.log(res.tipoData)
       // dispatch(setTiposfileLoading());
       dispatch({
         type: UPDATE_LINEA,
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








export const setLineafileLoading = () => {
  return {
    type: LINEAFILE_LOADING
  };
};

export const clearCurrentLineafile = () => {
  return {
    type: CLEAR_CURRENT_LINEAFILE
  };
};
