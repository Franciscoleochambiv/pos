import {
    GET_CATEGORIAFILE,
    GET_CATEGORIAFILES,
    CATEGORIAFILE_LOADING,
    UPDATE_CATEGORIA,
    DELETE_CATEGORIA,
    ADD_CATEGORIAFILE,    
    CLEAR_CURRENT_CATEGORIAFILE
  } from "../actions/types.js";
  
  const initialState = {
    categoriafile: {},  
    categoriafiles: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {

      case ADD_CATEGORIAFILE:
      return {
        ...state,                
        categoriafiles: [action.payload, ...state.categoriafiles]        
      };
      case CATEGORIAFILE_LOADING:
        return {
          ...state,
          loading: true
        };
  
      case GET_CATEGORIAFILE:
        return {
          ...state,
          categoriafile: action.payload,
          loading: false
        };
  
      case GET_CATEGORIAFILES:
        return {
          ...state,
          categoriafiles: action.payload,
          loading: false
        };
  
      case CLEAR_CURRENT_CATEGORIAFILE:
        return {
          ...state,
          categoriafile: null
        };

        case DELETE_CATEGORIA:
          return {
            ...state,
            categoriafiles: state.categoriafiles.filter(categoriafile => categoriafile.codigo !== action.payload),
            loading: false 

          };
        case UPDATE_CATEGORIA:
            var temp = state.categoriafiles.map(function(item){return (item.codigo === action.payload.codigo)? action.payload: item})
            return {...state,
                 categoriafiles: temp
            }

      default:
        return state;
    }
  }
  