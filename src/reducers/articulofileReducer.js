import {
    GET_ARTICULOFILE,
    GET_ARTICULOFILES,
    ARTICULOFILE_LOADING,
    UPDATE_ARTICULO,
    DELETE_ARTICULO,
    ADD_ARTICULOFILE,    
    CLEAR_CURRENT_ARTICULOFILE
  } from "../actions/types.js";
  
  const initialState = {
    articulofile: {},  
    articulofiles: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {

      case ADD_ARTICULOFILE:
      return {
        ...state,                
        articulofiles: [action.payload, ...state.articulofiles]        
      };
      case ARTICULOFILE_LOADING:
        return {
          ...state,
          loading: true
        };
  
      case GET_ARTICULOFILE:
        return {
          ...state,
          articulofile: action.payload,
          loading: false
        };
  
      case GET_ARTICULOFILES:
        return {
          ...state,
          articulofiles: action.payload,
          loading: false
        };
  
      case CLEAR_CURRENT_ARTICULOFILE:
        return {
          ...state,
          articulofile: null
        };

        case DELETE_ARTICULO:
          return {
            ...state,
            articulofiles: state.articulofiles.filter(articulofile => articulofile.codigo !== action.payload),
            loading: false 

          };
        case UPDATE_ARTICULO:
            var temp = state.articulofiles.map(function(item){return (item.codigo === action.payload.codigo)? action.payload: item})
            return {...state,
                 articulofiles: temp
            }

      default:
        return state;
    }
  }
  