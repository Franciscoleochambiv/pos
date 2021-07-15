import {
    GET_UMEDIDAFILE,
    GET_UMEDIDAFILES,
    UMEDIDAFILE_LOADING,
    UPDATE_UMEDIDA,
    DELETE_UMEDIDA,
    ADD_UMEDIDAFILE,    
    CLEAR_CURRENT_UMEDIDAFILE
  } from "../actions/types.js";
  
  const initialState = {
    umedidafile: {},  
    umedidafiles: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {

      case ADD_UMEDIDAFILE:
      return {
        ...state,                
        umedidafiles: [action.payload, ...state.umedidafiles]        
      };
      case UMEDIDAFILE_LOADING:
        return {
          ...state,
          loading: true
        };
  
      case GET_UMEDIDAFILE:
        return {
          ...state,
          umedidafile: action.payload,
          loading: false
        };
  
      case GET_UMEDIDAFILES:
        return {
          ...state,
          umedidafiles: action.payload,
          loading: false
        };
  
      case CLEAR_CURRENT_UMEDIDAFILE:
        return {
          ...state,
          umedidafile: null
        };

        case DELETE_UMEDIDA:
          return {
            ...state,
            umedidafiles: state.umedidafiles.filter(umedidafile => umedidafile.codigo !== action.payload),
            loading: false 

          };
        case UPDATE_UMEDIDA:
            var temp = state.umedidafiles.map(function(item){return (item.codigo === action.payload.codigo)? action.payload: item})
            return {...state,
                 umedidafiles: temp
            }

      default:
        return state;
    }
  }
  