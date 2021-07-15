//import React from "react";
// react plugin for creating charts
import React, { useState } from 'react'
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";


import Accessibility from "@material-ui/icons/Accessibility";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";

import CardFooter from "components/Card/CardFooter.js";

import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";





import Tipofile from "../Tipos/Tipofile";
import Categoriafile from "../Categorias/Categoriafile";


import Seriefile from "../Series/Seriefile";
import Umedidafile from "../Umedida/Umedidafile";
import Lineafile from "../Linea/Lineafile";

import Almacenfile from "../Almacen/Almacenfile";

import Clientefile from "../Cliente/Clientefile";

import Articulofile from "../Articulos/Articulofile";


const useStyles = makeStyles(styles);



export default function Menu() {
  const classes = useStyles();
  const [Opcion, setOpcion] = useState(0)
  let dashboardContent;

  

  

   if (Opcion===1){
         dashboardContent = (  
          <GridContainer>
              <Articulofile /> 
          </GridContainer>    
          );


   }
   else if(Opcion===2){
      dashboardContent = (  
        <GridContainer>
            <Categoriafile /> 
        </GridContainer>    
        );

   }
   else if(Opcion===3){
    dashboardContent = (  
      <GridContainer>
          <Lineafile /> 
      </GridContainer>    
      );

 }

 else if(Opcion===4){
  dashboardContent = (  
    <GridContainer>
        <Clientefile /> 
    </GridContainer>    
    );

}
else if(Opcion===5){
  dashboardContent = (  
    <GridContainer>
        <Tipofile /> 
    </GridContainer>    
    );

}

 else if(Opcion===6){
  dashboardContent = (  
    <GridContainer>
        <Almacenfile /> 
    </GridContainer>    
    );

}
   else if(Opcion===7){
    dashboardContent = (  
      <GridContainer>
          <Umedidafile /> 
      </GridContainer>    
      );

 }
   else if(Opcion===8){
    dashboardContent = (  
      <GridContainer>
          <Seriefile /> 
      </GridContainer>    
      );

 }
   else{

    dashboardContent = (  
      <GridContainer>
            <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="primary">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Mantenimineto</p>
            
              <h3 className={classes.cardTitle}>
                   
                    <Button color="primary" onClick={() => setOpcion(1)} >Articulos</Button>                 
              </h3>
              

            </CardHeader>
            <CardFooter stats>
              
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Mantenimiento</p>
              <h3 className={classes.cardTitle}>
               <Button color="success" onClick={() => setOpcion(2)} >Categoraias</Button>                 
              
                </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Mantenimiento</p>
              <h3 className={classes.cardTitle}>
                  <Button color="danger" onClick={() => setOpcion(3)} >Marcas</Button>                               
               </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Mantenimiento</p>
              <h3 className={classes.cardTitle}>                   
                   <Button color="info" onClick={() => setOpcion(4)} >Cli/Prov</Button>                                                  
               </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>


        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Mantenimineto</p>
              <h3 className={classes.cardTitle}>
                 <Button color="warning" onClick={() => setOpcion(5)} >Tip Doc</Button>                 
                
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="info">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Mantenimiento</p>
              <h3 className={classes.cardTitle}>
                    <Button color="info" onClick={() => setOpcion(6)} >Almacen</Button>                 
               </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="primary">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Mantenimiento</p>
              <h3 className={classes.cardTitle}>
                  <Button color="primary" onClick={() => setOpcion(7)} >U Medida</Button>                 
                
               </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="success">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Mantenimiento</p>
              <h3 className={classes.cardTitle}>

                <Button color="success" onClick={() => setOpcion(8)} >Series</Button>                 
                
                
                </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        </GridContainer>
    );


    

   }

  
  
  return (
    <div>
           <Button color="primary" onClick={() => setOpcion(0)} >Regresar al Menu Mantenimiento</Button>   
           { dashboardContent }
           

     </div>
  );
}
