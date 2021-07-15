import React from 'react'
import  { useDispatch,useSelector } from 'react-redux'
import { getCurrentProducto } from '../actions/productoActions'

const Productos = () => {
     const dispatch = useDispatch()
     const productos = useSelector (store => store.productofile.productofiles)

     //const { categoriafiles, loading } = 

     console.log(productos)

     

//const indexado = productos.reduce((acc,el)=>({...acc,[el.codigo]:el,}),{})
//console.log(indexado);
//console.log(indexado["TW1"])


    
        return (
            <div>
                lista de categoriaActions fff
                <button  onClick={()=> dispatch(getCurrentProducto())}>Pulsa </button>
                <ul>
                    {productos.map(item => (
                        <li key = {item.id} >{item.descripcion}

                        </li>
                    ))
                    }
                </ul>
                
            </div>
        )
    
}

export default Productos 

