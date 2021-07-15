import axios from "axios";
import {
  GET_CATEGORIAFILE,
  GET_CATEGORIAFILES,  
  ADD_CATEGORIAFILE,
  CATEGORIAFILE_LOADING,
  CLEAR_CURRENT_CATEGORIAFILE,
  GET_ERRORS,
  UPDATE_CATEGORIA,
  DELETE_CATEGORIA,
  BUSCA_CATEGORIA
} from "./types.js";
//import { GET_CATEGORIAFILES } from "../../../../../curso_react/menu3/client/src/actions/types.js";

import { unidad } from "../variables";


//let unidad="https://localhost";
//let unidad="https://adryan2.sytes.net:5000";
//let unidad="https://apisfsystem.herokuapp.com";
//let unidad="https://adryan2.sytes.net:7001";
//



/*


export const addTipos = (eduData, history) => dispatch => {
  axios
    .post("http://adryan2.sytes.net:3000/api/tipos", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

*/


export const addCategoria = (eduData, history) => dispatch => {


  //console.log(eduData)


  axios
    .post(unidad+"/api/categoria", eduData)
    .then(res => 
      dispatch({
        type: ADD_CATEGORIAFILE,
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

export const deleteCurrentCategoria = (id) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Eliminar El Registro")) {
 // dispatch(setTiposfileLoading());
  axios
      .delete(unidad+`/api/categoria/view/${id}`)
      
      //.then(res => history.push("/view-tipos"))

      .then(res =>
        dispatch({
          type: DELETE_CATEGORIA,
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


export const updateCurrentCategoria = (id,tipoData) => dispatch => {
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
         type: UPDATE_CATEGORIA,
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

export const buscarCurrentCategoria = (id) => dispatch => {

 // dispatch(setTiposfileLoading());
  axios
      .get(unidad+`/api/categoria/view/${id}`)
      
      //.then(res => history.push("/view-tipos"))

      .then(res =>{
        console.log("entrando------------mostrando resultado  ")
        console.log(res.data)
        dispatch({
          type: BUSCA_CATEGORIA,
          payload: res.data
        })
      }
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: {}
        })
      );

      //res.json(res);
      
      //console.log(json(res.data))

}


export const getCategoriaByHandle = handle => dispatch => {
  dispatch(setCategoriafileLoading());
  axios
    .get(unidad+`/api/categoria/viewcat/${handle}`)
    //.get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type:GET_CATEGORIAFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CATEGORIAFILE,
        payload: null
      })
    );
};





//https://adryan2.sytes.net:5000/api/categoria/viewcat







export const getCurrentCategoria = () => dispatch => {
  dispatch(setCategoriafileLoading());
  axios
    .get(unidad+"/api/categoria/view/")
    .then(res =>
      dispatch({
        type: GET_CATEGORIAFILES,
        payload: res.data
        
      })
      
    )
    .catch(err =>
      dispatch({
        type: GET_CATEGORIAFILES,
        payload: {}
      })
    );
    
};



export const addCategoriasql = (eduData, history) => dispatch => {


  //console.log(eduData)


  axios
    .post(unidad+"/api/categoria/addcatesql", eduData)
    .then(res => 
      dispatch({
        type: ADD_CATEGORIAFILE,
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


export const getCurrentCategoriasql = () => dispatch => {
  dispatch(setCategoriafileLoading());
  axios
    .get(unidad+"/api/categoria/viewsql/")
    .then(res =>
      dispatch({
        type: GET_CATEGORIAFILES,
        payload: res.data
        
      })
      
    )
    .catch(err =>
      dispatch({
        type: GET_CATEGORIAFILES,
        payload: {}
      })
    );
    
};

export const deleteCurrentCategoriasql = (id) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Eliminar El Registro")) {
 // dispatch(setTiposfileLoading());
  axios
      .delete(unidad+`/api/categoria/viewsql/${id}`)
      
      //.then(res => history.push("/view-tipos"))

      .then(res =>
        dispatch({
          type: DELETE_CATEGORIA,
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


export const updateCurrentCategoriasql = (id,tipoData) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Actualizar El Registro")) {
    
    console.log("reibiendo datos de Ipodata")
    //
    console.log(tipoData)
 // dispatch(setTiposfileLoading());
  axios
      .put(unidad+`/api/categoria/viewsql/${id}`,{
         codigo:tipoData.codigo,
         descripcion:tipoData.descripcion
      })
      
      
      
      
      .then(res =>{ 
        console.log(tipoData)
        console.log("actualizando con PUT devolviendo datos   ")
       // console.log(res.tipoData)
       // dispatch(setTiposfileLoading());
       dispatch({
         type: UPDATE_CATEGORIA,
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








export const setCategoriafileLoading = () => {
  return {
    type: CATEGORIAFILE_LOADING
  };
};

export const clearCurrentCategoriafile = () => {
  return {
    type: CLEAR_CURRENT_CATEGORIAFILE
  };
};
