import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardMedia from '@material-ui/core/CardMedia';
import CardFooter from "../../components/Card/CardFooter.js";
import  { useDispatch,useSelector } from 'react-redux'
import { getCurrentArticulosql } from '../../actions/articuloActions'
import { getCurrentProducto} from "../../actions/productoActions";

import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import NumberFormat from "react-number-format";
import axios from "axios";


//import Api from "../../Api";


import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Table from '@material-ui/core/Table';

import queryString from "query-string";


import Detallefinal from "./PosItem"


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  root: {
    maxWidth: 445,
  },
  media: {
    height: 100,
    marginTop: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);









const Pos = () => {
  const classes = useStyles();
  const ruta="http://adryan2.sytes.net:7002/upload/";


  let unidad="https://adryan2.sytes.net:7001";
  
  
       const dispatch = useDispatch()
       //const tip = useSelector (store => store.articulofile.articulofiles)   
       const datos = useSelector (store => store.productofile.productofiles)   
       useEffect(() => {
        
         dispatch(getCurrentProducto())
          },[dispatch,items])



const  searchItems = ({
  category = "popular",
  term = "",
  sortValue = "lh",
  itemsPerPage = 1000,
  usePriceFilter = "false",
  minPrice = 0,
  maxPrice = 1000,
  page = 1
 }) =>   
  {
    
    // Turn this into a boolean
    usePriceFilter = usePriceFilter === "true" && true;
    
    return new Promise((resolve, reject) => {

     setTimeout( () => {

        let informacion=  datos;
       // console.log("datos de la consulta de la api")
       // console.log(informacion);

        //let data = sampleProducts.filter(item => {


          let data = informacion.filter(item => { 
          if (
            usePriceFilter &&
            (item.precio < minPrice || item.precio > maxPrice)
          ) {
            return false;
          }

          if (category === "popular") {
            return item.popular;
          }

          if (category !== "AALL CATEGORIAS" && category !== item.categoria)
            return false;

          if (term && !(item.descripcion.toLowerCase()+item.codigo.toLowerCase()).includes(term.toLowerCase()))
            return false;

          return true;
        });

        let totalLength = data.length;

       // data = this.sortByPrice(data, sortValue);

        data = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

        resolve({ data, totalLength });
      }, 100);
    });
  }

 

     const [ items,setItems ]= useState([]);

     const [prove, setProve] = useState({
      codigo:1, 
      descripcion: "Varios"

     });

     

       
         const   handleInputChange= async (e)=>{
        
          
          //{category: "AALL CATEGORIAS", term: "tw"} 
          //let categoryFilterValue="A"

         let categoryFilterValue="AALL CATEGORIAS";
          console.log(e.target.value)
          let qsAsObject =queryString.parse("category=" +categoryFilterValue +"&term=" +e.target.value);
          console.log(qsAsObject)
          let bus=""
         
             
             bus =  await searchItems(qsAsObject);
             console.log(bus)
             
             //matchSorter(data,event.target.value,{keys: ['codigo', 'descripcion']})
         
          //matchSorter(objList, 'g', {keys: ['name', 'color']})
          setItems(bus)
          //console.log(bus)
    
      }
    
       

  
  
  
 

     
  
  return (
    <div>
        
    
      <GridContainer>
        <GridItem  xs={12} sm={12} md={12}>
        
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Articulos</h4>
              <p className={classes.cardCategoryWhite}>Complete la Información</p>
            </CardHeader>


        <TextField
                type="text"
                id="descripcion"
                label="Descripción del Articulo"
                required
                name="descripcion"
                onChange={handleInputChange}
             
                style={{ margin: 8,width:"95%"}}
                placeholder="Descripcion"
                
                fullWidth
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />

              <Detallefinal items={items} />
    
            
          </Card>

        </GridItem>
      
      
      </GridContainer>



    </div>
  );
}
export default Pos

