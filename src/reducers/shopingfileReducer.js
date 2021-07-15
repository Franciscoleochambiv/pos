import {
    GET_SHOPINGFILE,
    GET_SHOPINGFILES,
    SHOPINGFILE_LOADING,
    UPDATE_SHOPING,
    DELETE_SHOPING,
    ADD_SHOPINGFILE,
    BUSCA_SHOPING,
    CLEAR_CURRENT_SHOPINGFILE
  } from "../actions/types.js";
  

  const initialState = {
    
    shopingfile: {},
    buscafile: [],
    shopingfiles: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {


     

      case ADD_SHOPINGFILE:
      return {
        ...state,
        //tiposfile: state.tiposfile,
        shopingfiles: [action.payload, ...state.shopingfiles]
        //loading:false

        //state.tiposfile.filter(tiposfile => tiposfile._id !== action.payload),
      };
      case SHOPINGFILE_LOADING:
        return {
          ...state,
          loading: true
        };
  
      case GET_SHOPINGFILE:
        return {
          ...state,
          shopingfile: action.payload,
          loading: false
        };
  
      case GET_SHOPINGFILES:
        return {
          ...state,
          shopingfiles: action.payload,
          loading: false
        };
  
      case CLEAR_CURRENT_SHOPINGFILE:
        return {
          ...state,
          shopingfile: null
        };

        case DELETE_SHOPING:
          return {
            ...state,
        //    posts: state.posts.filter(post => post._id !== action.payload)
            //tiposfile: state.tiposfiles.filter(tiposfile => tiposfile._id !== action.payload),
         //tiposfile: action.payload,

         //tiposfile:tiposfile._id !== action.payload,
         //posts: state.posts.filter(post => post._id !== action.payload)
       

         shopíngfiles: state.shopingfiles.filter(shopingfile => shopingfile._id !== action.payload),

         
       //tiposfiles: action.payload,
       // tiposfile:action.payload,
        loading: false 

          };

         
          
        



          case UPDATE_SHOPING:

          /*
              var temp =  state.data.map(function(item){return (item.id == action.payload.id)? action.payload: item})
              return {...state,
              data: temp
        }      
          */
            var temp = state.shopingfiles.map(function(item){return (item._id === action.payload._id)? action.payload: item})
            return {...state,
                 shopingfiles: temp
            }

          /*
          return {



            
            ...state,
          //tiposfile: [action.payload, ...state.tiposfile],
         //tiposfile: action.payload,
         //tiposfile: [action.payload, ...state.buscafile],
         //tiposfile: state.tiposfile.filter(tiposfile => tiposfile._id == action.payload),
         //tiposfile:state.tiposfile.push([action.payload, ...state.buscafile]), 
          //tiposfile:push(state.buscafile),
         
         
          categoriafiles: [action.payload,...state.categoriafiles.filter(categoriafile => categoriafile._id !==action.payload)],
          //categoriafiles: state.categoriafiles.filter(categoriafile => categoriafile._id !== action.payload),      

          //categoriafiles: [action.payload,...state.categoriafiles],

         //state.tiposfile.filter(tiposfile => tiposfile._id !== action.payload),p
         //buscafile: action.payload,
        // buscafile: [action.payload, ...state.buscafile],
         //buscafile: action.payload,
         //tiposfile: null,
       // loading: false 


       
        //tiposfile: action.payload,
        loading: false

          };

          */


          case BUSCA_SHOPING:

              return {

                ...state,
                shopingfile: action.payload,
                loading: false

                /*
                ...state,
               // buscafile: state.buscafile.filter(buscafile => buscafile._id !== action.payload),
                buscafile: action.payload,
                loading: false
                */
              };  

         // return {
              //object.assing(),state,{buscafile:action.payload}
         //     ...state,
              
         //     buscafile: [action.payload, ...state.buscafile],
            /*
              ...state,
              //tiposfile: state.tiposfile,
             buscafile: [action.payload, ...state.tiposfile]
          
              /*

            ...state,
         //tiposfile: action.payload,
         
         //state.tiposfile.filter(tiposfile => tiposfile._id !== action.payload),
*/
         //tiposfile: [action.payload, ...state.tiposfile],
        // buscafile:[ state.buscafile.filter(buscafile => buscafile._id !== action.payload)],
       // loading: false 

      

       //   };
  
      default:
        return state;
    }
  }
  