import {
    GET_TIPOFILE,
    GET_TIPOFILES,
    TIPOFILE_LOADING,
    UPDATE_TIPO,
    DELETE_TIPO,
    ADD_TIPOFILE,    
    CLEAR_CURRENT_TIPOFILE
  } from "../actions/types.js";
  
  const initialState = {
    tipofile: {},  
    tipofiles: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {

      case ADD_TIPOFILE:
      return {
        ...state,                
        tipofiles: [action.payload, ...state.tipofiles]        
      };
      case TIPOFILE_LOADING:
        return {
          ...state,
          loading: true
        };
  
      case GET_TIPOFILE:
        return {
          ...state,
          tipofile: action.payload,
          loading: false
        };
  
      case GET_TIPOFILES:
        return {
          ...state,
          tipofiles: action.payload,
          loading: false
        };
  
      case CLEAR_CURRENT_TIPOFILE:
        return {
          ...state,
          tipofile: null
        };

        case DELETE_TIPO:
          return {
            ...state,
            tipofiles: state.tipofiles.filter(tipofile => tipofile.codigo !== action.payload),
            loading: false 

          };
        case UPDATE_TIPO:
            var temp = state.tipofiles.map(function(item){return (item.codigo === action.payload.codigo)? action.payload: item})
            return {...state,
                 tipofiles: temp
            }

      default:
        return state;
    }
  }
  