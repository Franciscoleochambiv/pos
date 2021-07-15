import {
    GET_CLIENTEFILE,
    GET_CLIENTEFILES,
    CLIENTEFILE_LOADING,
    UPDATE_CLIENTE,
    DELETE_CLIENTE,
    ADD_CLIENTEFILE,    
    CLEAR_CURRENT_CLIENTEFILE
  } from "../actions/types.js";
  
  const initialState = {
    clientefile: {},  
    clientefiles: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {

      case ADD_CLIENTEFILE:
      return {
        ...state,                
        clientefiles: [action.payload, ...state.clientefiles]        
      };
      case CLIENTEFILE_LOADING:
        return {
          ...state,
          loading: true
        };
  
      case GET_CLIENTEFILE:
        return {
          ...state,
          clientefile: action.payload,
          loading: false
        };
  
      case GET_CLIENTEFILES:
        return {
          ...state,
          clientefiles: action.payload,
          loading: false
        };
  
      case CLEAR_CURRENT_CLIENTEFILE:
        return {
          ...state,
          clientefile: null
        };

        case DELETE_CLIENTE:
          return {
            ...state,
            clientefiles: state.clientefiles.filter(clientefile => clientefile.codigo !== action.payload),
            loading: false 

          };
        case UPDATE_CLIENTE:
            var temp = state.clientefiles.map(function(item){return (item.codigo === action.payload.codigo)? action.payload: item})
            return {...state,
                 clientefiles: temp
            }

      default:
        return state;
    }
  }
  