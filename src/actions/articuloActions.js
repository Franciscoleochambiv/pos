import axios from "axios";
import {
  //GET_TIPOFILE,
  GET_ARTICULOFILES,  
  ADD_ARTICULOFILE,
  ARTICULOFILE_LOADING,
  CLEAR_CURRENT_ARTICULOFILE,
  GET_ERRORS,
  UPDATE_ARTICULO,
  DELETE_ARTICULO,
  
} from "./types.js";
//import { GET_CATEGORIAFILES } from "../../../../../curso_react/menu3/client/src/actions/types.js";



//let unidad="https://localhost";
//let unidad="https://adryan2.sytes.net:5000";
//let unidad="https://apisfsystem.herokuapp.com";
//let unidad="https://adryan2.sytes.net:7001";

import { unidad } from "../variables";







export const addArticulosql = (tipoData,prove,line,cate,nimagen,uni) => dispatch => {

  //datos,prove,line,cate
//      eduData
let cod=tipoData.codigo.toUpperCase();

  axios 
    .post(unidad+"/api/articulos/addarticulosql", {
         id:tipoData.id,   
         codigo:cod.trim(),
         descripcion:tipoData.descripcion.toUpperCase(),
         costo:tipoData.costo,
         precio:tipoData.precio,         
         imagen:nimagen,
         codigostock:tipoData.codigostock,
         fecha_cad:tipoData.fecha_cad,
         precio1:tipoData.precio1,
         precio2:tipoData.precio2,
         stockm:tipoData.stockm,
         UM_ID:uni.codigo,
         detalle:tipoData.detalle.toUpperCase(),
         proveedor:prove.codigo,
         linea:line.codigo,
         grupo:cate.codigo,
    
    })
    .then(res => 
      dispatch({
        type: ADD_ARTICULOFILE,
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


export const getCurrentArticulosql = () => dispatch => {
  dispatch(setArticulofileLoading());
  axios
    .get(unidad+"/api/articulos/viewsql/")
    .then(res =>
      dispatch({
        type: GET_ARTICULOFILES,
        payload: res.data
        
      })
      
    )
    .catch(err =>
      dispatch({
        type: GET_ARTICULOFILES,
        payload: {}
      })
    );
    
};

export const deleteCurrentArticulosql = (id) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Eliminar El Registro")) {
 // dispatch(setTiposfileLoading());
  axios
      .delete(unidad+`/api/articulos/viewsql/${id}`)
      
      //.then(res => history.push("/view-tipos"))

      .then(res =>
        dispatch({
          type: DELETE_ARTICULO,
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


export const updateCurrentArticulosql = (id,datos,prove,line,cate,nimagen,uni) => dispatch => {

  //dispatch(updateCurrentArticulosql(datos,prove,line,cate,nimagen,uni))
  if (window.confirm("Esta Ud Seguro de Actualizar El Registro")) {
    
   // console.log("reibiendo datos de Ipodata")
    //
  //  console.log(tipoData)
 // dispatch(setTiposfileLoading());
  axios
      .put(unidad+`/api/articulos/viewsql/${id}`,{
         //id:tipoData.id,   
         codigo:datos.codigo,
         descripcion:datos.descripcion,
         costo:datos.costo,
         precio:datos.precio,
         detalle:datos.detalle,                  
         codigostock:datos.codigostock,
         fecha_cad:datos.fecha_cad,

         precio1:datos.precio1,
         precio2:datos.precio2,
         stockm:datos.stockm,

         proveedor:prove.codigo,
         linea:line.codigo,
         grupo:cate.codigo,
         UM_ID:uni.codigo,
         imagen:nimagen,
         

      })
      
      
      
      
      .then(res =>{ 
       
        //console.log("actualizando con PUT devolviendo datos en actios   ")
        //console.log(tipoData)
       // console.log(res.tipoData)
       // dispatch(setTiposfileLoading());
       dispatch({
         type: UPDATE_ARTICULO,
         payload: {

          codigo: datos.codigo,
          descripcion:datos.descripcion,
          costo:datos.costo,
          precio:datos.precio,
          detalle:datos.detalle,                  
          codigostock:datos.codigostock,
          fecha_cad:datos.fecha_cad,

          precio1:datos.precio1,
          precio2:datos.precio2,
          stockm:datos.stockm,

          proveedor:prove.codigo,
          linea:line.codigo,
          grupo:cate.codigo,
          UM_ID:uni.codigo,
          imagen:nimagen,
            
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





export const setArticulofileLoading = () => {
  return {
    type: ARTICULOFILE_LOADING
  };
};

export const clearCurrentArticulofile = () => {
  return {
    type: CLEAR_CURRENT_ARTICULOFILE
  };
};
