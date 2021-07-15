       import {
        GET_CARTDNI,
        DNIFILE_LOADING,
        CLEAR_CURRENT_DNIFILE,        
      } from "../actions/types.js";
      
      const initialState = {
        dnifile: {},  
        dnifiles: [],
        loading: false
      };
      
      export default function(state = initialState, action) {
        switch (action.type) {
    
        
          case DNIFILE_LOADING:
            return {
              ...state,
              loading: true
            };
    
            
      
          case GET_CARTDNI:
            return {
              ...state,
              dnifiles: action.payload,
              loading: false
            };
      
          
          case CLEAR_CURRENT_DNIFILE:
            return {
              ...state,
              dnifile: null
            };        
            
          default:
            return state;
        }
      }
          