import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import { showCartDlg, setCheckedOutItems } from "../../actions/ventasActions";
import { withRouter } from "react-router-dom";
import CartRow from "./CartRow";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import TableContainer from '@material-ui/core/TableContainer';

import Paper from '@material-ui/core/Paper';

const mapStateToProps = state => {
  return { open: state.cartItem.showCartDialog, items: state.cartItem.cartItems };
  
};

class ConnectedCartDialog extends Component {
  constructor() {
    super();
    this.state = {      
        price:0

    };
  }
  


  render() {
    let totalPrice = this.props.items.reduce((accumulator, item) => {
      return accumulator + item.precio * item.quantity;
    }, 0);

    if (isNaN(totalPrice))
    {
      totalPrice=0
    }
    

    return (
      <div>


       
          <AppBar position="static" style={{ backgroundColor: "#3863aa" }}>
            <Toolbar  style={{ backgroundColor:"#26c6da" }}>
              <ShoppingCartIcon
                fontSize="large"
                style={{ color: "white", marginRight: 10 }}
              />
             Carrito de Compras
            </Toolbar>
          </AppBar>

          <div  
            className="dialog"
          >



                      <div className="cardnuevo cabeceracolorpri " style={{marginTop:"1px"}}>
                            
                                <Table>
                                <TableRow>
                                        <TableCell>Item Nombre</TableCell>
                                        <TableCell>Precio</TableCell>
                                        <TableCell>Cantidad</TableCell>
                                        <TableCell>Accion</TableCell>
                                </TableRow>             
                                  </Table>  
                          
                      </div>
      
                      <div  className="prod-container  cardnuevo   " style={{marginTop:"1px"}}>
                        
                      
                        <Table>              
                          <TableBody>
                            {this.props.items.map((item, index) => {
                              return <CartRow item={item} key={item.id} {...this.props} />;
                            })}
                          </TableBody>
                          
                        </Table>
                      
                      </div>
         

                        <div className="cardnuevo cabeceracolorpri">
                        <Table>
                                    <TableRow>
                                            <TableCell>
                                            <div className="colorfuente ">
                                                            <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        disabled={totalPrice === 0}
                                                        onClick={() => {
                                                          this.props.dispatch(showCartDlg(false));
                                                          this.props.dispatch(setCheckedOutItems(this.props.items));
                                                          this.props.history.push("/order");
                                                        }}
                                                      >
                                                        Pagar Operación
                                                    </Button>

                                                    
                                                    
                                                    </div> 
                                              
                                              
                                              </TableCell>
                                            <TableCell style={{fontSize:"20px",color:"#fff",backgroundColor:"#f50057"}} > Venta S/. {totalPrice}  </TableCell>
                                    </TableRow> 
                                      
                                 
                                      
                          </Table>  


                          </div>
           
            
            </div>

        
        
      </div>
    );
  }
}
const CartDialog = withRouter(connect(mapStateToProps)(ConnectedCartDialog));
export default CartDialog;
