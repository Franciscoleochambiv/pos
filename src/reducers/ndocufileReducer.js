import {
    GET_CARTNDOCU,
    NDOCUFILE_LOADING,    
    CLEAR_CURRENT_NDOCUFILE,  
  } from "../actions/types.js";
  
  const initialState = {
    ndocufile: {},  
    ndocufiles: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {

    
      case NDOCUFILE_LOADING:
        return {
          ...state,
          loading: true
        };
      
  
      case GET_CARTNDOCU:
        return {
          ...state,
          ndocufiles: action.payload,
          loading: false
        };
  
      
      case CLEAR_CURRENT_NDOCUFILE:
        return {
          ...state,
          ndocufile: null
        };        
        
      default:
        return state;
    }
  }
  