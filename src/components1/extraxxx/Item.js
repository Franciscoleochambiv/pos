import React, { Component } from 'react';
import {withGetScreen} from 'react-getscreen';

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";



class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ima:"https://materializecss.com/images/sample-1.jpg",
         
          disabled: false,
          codigo: ""
         };
    
      }

      componentDidMount() {

        console.log("Inicalizando variables")
        console.log(JSON.stringify(this.props.data))
       
         
        
        
      }





  render() {
      let data=this.props.data;
      let envio;
    if (this.props.isMobile()) return <div>Mobile</div>;
    if (this.props.isTablet()) return <div>Tablet</div>;

    envio = (                    
        data.map(l1 => (
           
            <Card
                style={{ width: 350, height: 190, margin: 10, display: "inline-block" }}>
                     <CardActionArea
                        onClick={() => {
                            this.props.history.push("/details/" + this.props.item.id);
                        }}
                        >

                     
                      <div style={{ display: "flex" }}>
                            <CardMedia
                                    style={{ height: 140 ,width: 100}}
                                    image={this.state.ima}                             
                             />
                              <div
                                style={{
                                flex: 1,
                                marginLeft: 50,
                                display: "flex",
                                flexDirection: "column"
                                }}
                               >
                               <div >
                               <CardContent style={{ height: 45 }}>
                                    <div
                                    style={{
                                        marginLeft: 5,
                        
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}
                                    >
                                    
                                    </div>
                                    <div style={{ margin: 5 }}>Precio S/.  </div>
                                    
                                    <div style={{ color: "#1a9349", fontWeight: "bold", margin: 5 }}>
                                    
                                    </div>
                                    
                                </CardContent>

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
                                          //  addItemInCart({ ...this.props.item, quantity: 1 })
                                            );
                                        }}
                                        color="primary"
                                        aria-label="Add to shopping cart"
                                        >
                                        <AddShoppingCartIcon size="small" />
                                        </IconButton>
                                    </Tooltip>

                                    
                              </CardActions>








                               </div>
                            </div>   


                      </div>  
                </CardActionArea>  

                <div style={{
                marginLeft: 5,
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
                }}
               >
                {l1.descripcion}
              </div>  

            </Card>
                
            
            ))     
        );    



    return (

        <div style={{ flex: 1 }}>
         {envio}
        </div>
     
        
       
        );
  }
}

export default withGetScreen(Item);

//or you may set your own breakpoints by providing an options object

//const options = {mobileLimit: 500, tabletLimit: 800}
//export default withGetScreen(Item, options);