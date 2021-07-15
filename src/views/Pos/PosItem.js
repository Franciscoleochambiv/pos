
import React, { useState, useEffect } from "react";








const Detallefinal = (items) => {

  console.log("estos sonm los items")
  console.log(items)
  
  useEffect(() => {
        
    //dispatch(getCurrentProducto())
     },[items])

    
     let dashbo1=""

     console.log(items.length)
     
      
      
       
//           console.log(lolo)    

        dashbo1 = (   
          
          <div style={{  maxHeight: '20rem',
          overflowY: 'auto',
          overflowX: 'hidden',
          borderTopWidth: '0',
          outline: '0',
          borderRadius: '0 0 .28571429rem .28571429rem',
          transition: 'opacity .1s ease',
          boxShadow: '0 2px 3px 0 rgba(34,36,38,.15)',
          borderColor: '#96c8da',
          borderRightWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderStyle: 'solid',}}>
          
          <table>
             <thead>
               <tr>
                 <th>Codigo </th>
                 <th>Descripcion </th>
               </tr>
             </thead>
          
            {console.log("estamos apunto de sacar el array")}

            {console.log(items)}
           <tbody>
          {items.data.map(l1 => (
           
                <tr key={l1.id}>
                   <td>{l1.codigo} </td>
                   <td>{l1.descripcion} </td>

                </tr>  
                   
                   
               ))}     
              </tbody>     
                  
                  </table>

                  </div>            
                 

                         )             
                                     
   
  
  return (
    <div>
        {dashbo1}
        
    </div>
  )
}
export default Detallefinal 