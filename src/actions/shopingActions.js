import axios from "axios";
import {
  //GET_CATEGORIAFILE,
  GET_SHOPINGFILES,
  GET_SHOPINGFILE,
  ADD_SHOPINGFILE,
  SHOPINGFILE_LOADING,
  CLEAR_CURRENT_SHOPINGFILE,
  GET_ERRORS,
  UPDATE_SHOPING,
  DELETE_SHOPING,
  BUSCA_SHOPING
} from "./types";


//let unidad="https://localhost";
//let unidad="https://adryan2.sytes.net:5000";


//let unidad="https://apisfsystem.herokuapp.com";

//let unidad="https://adryan2.sytes.net:7001";


import { unidad } from "../variables";


/*


export const addTipos = (eduData, history) => dispatch => {
  axios
    .post("https://adryan2.sytes.net:3000/api/tipos", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

*/


export const addShoping = (eduData, history) => dispatch => {

  console.log(eduData)
  axios
    .post(unidad+"/api/shoping1", eduData)
    .then(res => 
      dispatch({
        type: ADD_SHOPINGFILE,
        payload: res.data
      })
    )
    //.then(res=> history.push("/datatables"))
    //.then(res=> history.push("/view-tipos"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteCurrentShoping = (id) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Eliminar El Registro")) {
 // dispatch(setTiposfileLoading());
  axios
      .delete(unidad+`/api/shoping1/view/${id}`)
      
      //.then(res => history.push("/view-tipos"))

      .then(res =>
        dispatch({
          type: DELETE_SHOPING,
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


export const updateCurrentShoping = (id,tipoData) => dispatch => {
  if (window.confirm("Esta Ud Seguro de Actualizar El Registro")) {
    
    console.log("reibiendo datos de Ipodata")
    //
    console.log(tipoData)

    

 // dispatch(setTiposfileLoading());
  axios
      .put(unidad+`/api/shoping1/view/${id}`,{
         id:tipoData.id,
         name:tipoData.name,
         category:tipoData.category,
         price:tipoData.price,
         description:tipoData.description,
         popular:tipoData.popular,
         imageUrls:tipoData.imageUrls
      })
      
      
      
      
      .then(res =>{ 
        console.log(tipoData)
        console.log("actualizando con PUT devolviendo datos   ")
       // console.log(res.tipoData)
       // dispatch(setTiposfileLoading());
       dispatch({
         type: UPDATE_SHOPING,
         payload: {
               _id:id,
               id:tipoData.id,               
               name:tipoData.name,
               category:tipoData.category,
               price:tipoData.price,
               description:tipoData.description,
               popular:tipoData.popular,
               imageUrls:tipoData.imageUrls   
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

export const buscarCurrentShoping = (id) => dispatch => {

 // dispatch(setTiposfileLoading());
  axios
      .get(unidad+`/api/shoping1/view/${id}`)
      
      //.then(res => history.push("/view-tipos"))

      .then(res =>{
      //  console.log("entrando------------mostrando resultado  ")
      //  console.log(res.data)
        dispatch({
          type: BUSCA_SHOPING,
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










export const getCurrentShoping = () => dispatch => {
  dispatch(setShopingfileLoading());
  axios
    .get(unidad+"/api/shoping1/view/")
    .then(res =>
      dispatch({
        type: GET_SHOPINGFILES,
        payload: res.data
        
      })
      
    )
    .catch(err =>
      dispatch({
        type: GET_SHOPINGFILES,
        payload: {}
      })
    );
    
};

export const getShopingByHandle = handle => dispatch => {
  dispatch(setShopingfileLoading());
  axios
    .get(unidad+`/api/shoping1/view/${handle}`)
    //.get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_SHOPINGFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SHOPINGFILE,
        payload: null
      })
    );
};




export const getShopingByHandle1 = handle => dispatch => {
  dispatch(setShopingfileLoading());
  axios
  .get(unidad+`/api/shoping1/viewcat/${handle}`)
    //.get(unidad+"/api/shoping1/viewcat/Regional")
    .then(res =>
      dispatch({
        type: GET_SHOPINGFILES,
        payload: res.data
        
      })
      
    )
    .catch(err =>
      dispatch({
        type: GET_SHOPINGFILES,
        payload: {}
      })
    );
  
  
  
};





export const setShopingfileLoading = () => {
  return {
    type: SHOPINGFILE_LOADING
  };
};

export const clearCurrentShopingfile = () => {
  return {
    type: CLEAR_CURRENT_SHOPINGFILE
  };
};
