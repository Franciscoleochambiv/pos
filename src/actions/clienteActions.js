import axios from "axios";
import {
  //GET_TIPOFILE,
  GET_CLIENTEFILES,  
  ADD_CLIENTEFILE,
  CLIENTEFILE_LOADING,
  CLEAR_CURRENT_CLIENTEFILE,
  GET_ERRORS,
  UPDATE_CLIENTE,
  DELETE_CLIENTE
} from "./types.js";
//import { GET_CATEGORIAFILES } from "../../../../../curso_react/menu3/client/src/actions/types.js";

import { unidad } from "../variables";

//let unidad="https://localhost";
//let unidad="https://adryan2.sytes.net:5000";
//let unidad="https://apisfsystem.herokuapp.com";
//let unidad="https://adryan2.sytes.net:7001";







export const addClientesql = (eduData, history) => dispatch => {
  axios
    .post(unidad+"/api/clientes/addclientesql", eduData)
    .then(res => 
      dispatch({
        type: ADD_CLIENTEFILE,
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


export const getCurrentClientesql = () => dispatch => {
  dispatch(setClientefileLoading());
  axios
    .get(unidad+"/api/clientes/viewsql/")
    .then(res =>
      dispatch({
        type: GET_CLIENTEFILES,
        payload: res.data
        
      })
      
    )
    .catch(err =>
      dispatch({
        type: GET_CLIENTEFILES,
        payload: {}
      })
    );
    
};

export const deleteCurrentClientesql = (id) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Eliminar El Registro")) {
 // dispatch(setTiposfileLoading());
  axios
      .delete(unidad+`/api/clientes/viewsql/${id}`)
      
      //.then(res => history.push("/view-tipos"))

      .then(res =>
        dispatch({
          type: DELETE_CLIENTE,
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


export const updateCurrentClientesql = (id,tipoData) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Actualizar El Registro")) {
    
   // console.log("reibiendo datos de Ipodata")
    //
  //  console.log(tipoData)
 // dispatch(setTiposfileLoading());
  axios
      .put(unidad+`/api/clientes/viewsql/${id}`,{

         codigo:tipoData.codigo,
         descripcion:tipoData.descripcion,
         tipodoc:tipoData.tipodoc,
         titular:tipoData.titular,
         direccion:tipoData.direccion,
         direccion2:tipoData.direccion2,
         direccion3:tipoData.direccion3,
         DI_Id:tipoData.DI_Id,
         nidentidad:tipoData.nidentidad,
         email:tipoData.email,
         telefono:tipoData.telefono,
         fechaingreso:tipoData.fechaingreso,

      })
      
      
      
      
      .then(res =>{ 
       
        //console.log("actualizando con PUT devolviendo datos en actios   ")
        //console.log(tipoData)
       // console.log(res.tipoData)
       // dispatch(setTiposfileLoading());
       dispatch({
         type: UPDATE_CLIENTE,
         payload: {

          
               id:id,               
               codigo:tipoData.codigo,
               descripcion:tipoData.descripcion,
               PVCL_Tipo:tipoData.tipodoc,
               PVCL_Titular:tipoData.titular,               
               PVCL_Direccion:tipoData.direccion,
               PVCL_DIreccion2:tipoData.direccion2,
               PVCL_Direccion3:tipoData.direccion3,
               DI_Id:tipoData.DI_Id,
               PVCL_NroDocIdentidad:tipoData.nidentidad,
               PVCL_Email:tipoData.email,
               PVCL_Telefono:tipoData.telefono,
               PVCL_FecIngreso:tipoData.fechaingreso



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








export const setClientefileLoading = () => {
  return {
    type: CLIENTEFILE_LOADING
  };
};

export const clearCurrentClientefile = () => {
  return {
    type: CLEAR_CURRENT_CLIENTEFILE
  };
};
