import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { connect } from "react-redux";

import { addItemInCart } from "../../actions/ventasActions";


import { withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

import p5 from "../../Images/shoping.jpg"


class ConnectedItem extends Component {



  render() {

    
    

    return (
      
      <Card className="col-md-9 mx-auto"
        style={{ width: 350, height: 290, margin: 10, display: "inline-block" }}
      >
         <CardActionArea
          onClick={() => {
            this.props.history.push("/details/" + this.props.item.id);
           }}
        >
        <div >
            {this.props.item.imagen.length>0 &&
                    <CardMedia className=" mx-auto"
                    style={{ height: 150 ,width: 190}}
                    
                    image={this.props.item.imagen}
                  />

            ||
            <CardMedia className=" mx-auto"
            style={{ height: 150 ,width: 190}}

            image={p5}
            />
            }
            <div
                style={{
                  flex: 1,
                  marginLeft: 50,
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                 <div >                       
                    <CardContent  className="mx-auto"style={{ height: 45 }}>
                          <div
                            style={{
                              marginLeft: 5,
                
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis"
                            }}
                          >                      
                          
                          </div>
                          <div style={{ margin:2 }}>Codigo.  {this.props.item.codigo} </div>                      
                          <div style={{ margin:2 }}>Precio S/.  {this.props.item.precio} </div>                      
                          <div style={{ color: "#1a9349", fontWeight: "bold", margin: 5 }}>
                                {this.props.item.popular && "Popular"}
                          </div>                      
                    </CardContent>  
             </div>       
             </div>       
             </div>           
              </CardActionArea>

                    <CardActions
                            style={{ display: "flex", alignItems: "center", height: 45 }}
                     >  
                          <Button 
                              variant="contained" 
                              color="primary"
                              size="small"
                              style={{ marginRight: 60 }}
                              onClick={() => {
                                this.props.history.push("/details/" + this.props.item.id);
                              }}
                            >                            
                            {" "}
                            Detalle
                          </Button>
                          <Tooltip title="Añadir al carrito">
                                <IconButton
                                  size="small"
                                  onClick={e => {
                                    e.stopPropagation();
                                    this.props.dispatch(
                                      addItemInCart({ ...this.props.item, quantity: 1 })
                                    );
                                  }}
                                  color="primary"
                                  aria-label="Add to shopping cart"
                                >
                                 <AddShoppingCartIcon size="small" />
                                </IconButton>
                          </Tooltip>

                          {this.props.item.descripcion}                           
                    </CardActions>
            
          
                
       
           <div style={{
                marginLeft: 5,
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
                {this.props.item.descripcion}    

          </div>
       
     </Card>
    );
  }
}

export default withRouter(connect()(ConnectedItem));
