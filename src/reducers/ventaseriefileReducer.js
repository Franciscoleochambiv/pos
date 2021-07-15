import {
    GET_CARTVENTASERIE,
    VENTASERIEFILE_LOADING,
    CLEAR_CURRENT_VENTASERIEFILE,

  } from "../actions/types.js";
  
  const initialState = {
    ventaseriefile: {},  
    ventaseriefiles: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {

    
      case VENTASERIEFILE_LOADING:
        return {
          ...state,
          loading: true
        };

        
  
      case GET_CARTVENTASERIE:
        return {
          ...state,
          ventaseriefiles: action.payload,
          loading: false
        };
  
      
      case CLEAR_CURRENT_VENTASERIEFILE:
        return {
          ...state,
          ventaseriefile: null
        };        
        
      default:
        return state;
    }
  }
  