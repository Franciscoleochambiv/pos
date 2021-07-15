import {
    GET_CARTSUNAT,
    SUNATFILE_LOADING,
    CLEAR_CURRENT_SUNATFILE,

  } from "../actions/types.js";
  
  const initialState = {
    sunatfile: {},  
    sunatfiles: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {

    
      case SUNATFILE_LOADING:
        return {
          ...state,
          loading: true
        };

        
  
      case GET_CARTSUNAT:
        return {
          ...state,
          sunatfiles: action.payload,
          loading: false
        };
  
      
      case CLEAR_CURRENT_SUNATFILE:
        return {
          ...state,
          sunatfile: null
        };        
        
      default:
        return state;
    }
  }
  