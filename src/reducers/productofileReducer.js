import {
    GET_PRODUCTOFILE,
    GET_PRODUCTOFILES,
    PRODUCTOFILE_LOADING,
    UPDATE_PRODUCTO,
    DELETE_PRODUCTO,
    ADD_PRODUCTOFILE,    
    CLEAR_CURRENT_PRODUCTOFILE,
    BUSCA_PRO,
  } from "../actions/types.js";
  
  const initialState = {
    productofile: {},  
    productofiles: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {

      case ADD_PRODUCTOFILE:
      return {
        ...state,                
        productofiles: [action.payload, ...state.productofiles]        
      };
      case PRODUCTOFILE_LOADING:
        return {
          ...state,
          loading: true
        };
  
      case GET_PRODUCTOFILE:
        return {
          ...state,
          productofile: action.payload,
          loading: false
        };
  
      case GET_PRODUCTOFILES:
        return {
          ...state,
          productofiles: action.payload,
          loading: false
        };
  
      case CLEAR_CURRENT_PRODUCTOFILE:
        return {
          ...state,
          productofile: null
        };

        case DELETE_PRODUCTO:
          return {
            ...state,
            productofiles: state.productofiles.filter(productofile => productofile._id !== action.payload),
            loading: false 

          };
        case UPDATE_PRODUCTO:
            var temp = state.productofiles.map(function(item){return (item._id === action.payload._id)? action.payload: item})
            return {...state,
                 productofiles: temp
            }

        case BUSCA_PRO:
           
              let data2 = action.payload.data.filter(item => {                     
                
                //if (action.payload.term && console.log(item.descripcion.toLowerCase()+item.codigo.toLowerCase()).includes(action.payload.term.toLowerCase()))
                if (action.payload.term && !(item.descripcion.toLowerCase()+item.codigo.toLowerCase()).includes(action.payload.term.toLowerCase()))
                  return false;
      
                return true;
              })
             return {...state,
                productofiles: data2
                    }

     

      default:
        return state;
    }
  }



  