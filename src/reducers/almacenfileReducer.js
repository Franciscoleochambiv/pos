import {
    GET_ALMACENFILE,
    GET_ALMACENFILES,
    ALMACENFILE_LOADING,
    UPDATE_ALMACEN,
    DELETE_ALMACEN,
    ADD_ALMACENFILE,    
    CLEAR_CURRENT_ALMACENFILE
  } from "../actions/types.js";
  
  const initialState = {
    almacenfile: {},  
    almacenfiles: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {

      case ADD_ALMACENFILE:
      return {
        ...state,                
        almacenfiles: [action.payload, ...state.almacenfiles]        
      };
      case ALMACENFILE_LOADING:
        return {
          ...state,
          loading: true
        };
  
      case GET_ALMACENFILE:
        return {
          ...state,
          almacenfile: action.payload,
          loading: false
        };
  
      case GET_ALMACENFILES:
        return {
          ...state,
          almacenfiles: action.payload,
          loading: false
        };
  
      case CLEAR_CURRENT_ALMACENFILE:
        return {
          ...state,
          almacenfile: null
        };

        case DELETE_ALMACEN:
          return {
            ...state,
            almacenfiles: state.almacenfiles.filter(almacenfile => almacenfile.codigo !== action.payload),
            loading: false 

          };
        case UPDATE_ALMACEN:
            var temp = state.almacenfiles.map(function(item){return (item.codigo === action.payload.codigo)? action.payload: item})
            return {...state,
                 almacenfiles: temp
            }

      default:
        return state;
    }
  }
  