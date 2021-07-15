import {
    GET_LINEAFILE,
    GET_LINEAFILES,
    LINEAFILE_LOADING,
    UPDATE_LINEA,
    DELETE_LINEA,
    ADD_LINEAFILE,    
    CLEAR_CURRENT_LINEAFILE
  } from "../actions/types.js";
  
  const initialState = {
    lineafile: {},  
    lineafiles: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {

      case ADD_LINEAFILE:
      return {
        ...state,                
        lineafiles: [action.payload, ...state.lineafiles]        
      };
      case LINEAFILE_LOADING:
        return {
          ...state,
          loading: true
        };
  
      case GET_LINEAFILE:
        return {
          ...state,
          lineafile: action.payload,
          loading: false
        };
  
      case GET_LINEAFILES:
        return {
          ...state,
          lineafiles: action.payload,
          loading: false
        };
  
      case CLEAR_CURRENT_LINEAFILE:
        return {
          ...state,
          lineafile: null
        };

        case DELETE_LINEA:
          return {
            ...state,
            lineafiles: state.lineafiles.filter(lineafile => lineafile.codigo !== action.payload),
            loading: false 

          };
        case UPDATE_LINEA:
            var temp = state.lineafiles.map(function(item){return (item.codigo === action.payload.codigo)? action.payload: item})
            return {...state,
                 lineafiles: temp
            }

      default:
        return state;
    }
  }
  