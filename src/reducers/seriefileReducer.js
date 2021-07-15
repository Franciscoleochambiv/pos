import {
    GET_SERIEFILE,
    GET_SERIEFILES,
    SERIEFILE_LOADING,
    UPDATE_SERIE,
    DELETE_SERIE,
    ADD_SERIEFILE,    
    CLEAR_CURRENT_SERIEFILE
  } from "../actions/types.js";
  
  const initialState = {
    seriefile: {},  
    seriefiles: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {

      case ADD_SERIEFILE:
      return {
        ...state,                
        seriefiles: [action.payload, ...state.seriefiles]        
      };
      case SERIEFILE_LOADING:
        return {
          ...state,
          loading: true
        };
  
      case GET_SERIEFILE:
        return {
          ...state,
          seriefile: action.payload,
          loading: false
        };
  
      case GET_SERIEFILES:
        return {
          ...state,
          seriefiles: action.payload,
          loading: false
        };
  
      case CLEAR_CURRENT_SERIEFILE:
        return {
          ...state,
          seriefile: null
        };

        case DELETE_SERIE:
          return {
            ...state,
            seriefiles: state.seriefiles.filter(seriefile => seriefile.codigo !== action.payload),
            loading: false 

          };
        case UPDATE_SERIE:
            var temp = state.seriefiles.map(function(item){return (item.codigo === action.payload.codigo)? action.payload: item})
            return {...state,
                 seriefiles: temp
            }

      default:
        return state;
    }
  }
  