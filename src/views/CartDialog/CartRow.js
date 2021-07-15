import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {
  showCartDlg,
  deleteCartItem,
  updateCartItemQnt,
  uppItemInCartDescri,
  updateCartItemPri,
  updateCartItemTotal
} from "../../actions/ventasActions";
import TextField from "@material-ui/core/TextField";

import Input from "@material-ui/core/Input";

import  NumberFormatCustom from  "../../Funci"

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";



const CartRow = props => {

  let { item } = props;

  console.log(item)

 let estado=false;
 if (item.codigo==="777") {
     estado=true;
 }



  return (
    <TableRow>




   {estado &&

      <TableCell>
        <TextField
         id="descripciont" 
         defaultValue={item.descripcion}           
         inputProps={{ 'aria-label': 'quantity' }}                   


          style={{ width: 350 }}
          onChange={e => {
            let  descripcion = e.target.value;
            props.dispatch(
              uppItemInCartDescri({
                id: item.id,
                 descripcion 
              })
            );

            
          }}
          
        />
				
      </TableCell>





		||
      
      <TableCell>
        <Link to={`/details/${item.id}`}>
          <div
            onClick={() => {
              props.dispatch(showCartDlg(false));
            }}
          >
            {item.descripcion}
          </div>
        </Link>
      </TableCell>


		} 


      <TableCell>


    


      <TextField
          id="preciot" 
          defaultValue={item.precio.toFixed(2)}           
          inputProps={{ 'aria-label': 'precio' }} 
          style={{ width: 50 }}
          InputProps={{
            inputComponent: NumberFormatCustom
          }}
          onChange={e => {
            let precio = parseFloat(e.target.value);
            if (precio < 0) return;
            props.dispatch(
              updateCartItemPri({
                id: item.id,
                precio
              })
            );
          }}

          />       
        
        </TableCell>



      <TableCell>
        <TextField
         id="cantidadt" 
         defaultValue={item.quantity.toFixed(2)}           
         inputProps={{ 'aria-label': 'quantity' }} 
        
          style={{ width: 40 }}
         // value={item.quantity}
         InputProps={{
          inputComponent: NumberFormatCustom
        }}
          
          onChange={e => {
            let quantity = parseFloat(e.target.value);
            if (quantity < 0) return;
            props.dispatch(
              updateCartItemQnt({
                id: item.id,
                quantity
              })
            );

            
          }}

          
          
          
        />
      </TableCell>


      
        


      <TableCell>
        <Button
          color="secondary"
          onClick={() => {
            props.dispatch(deleteCartItem(item.id));
          }}
        >
          Borrar
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartRow;
