import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardMedia from '@material-ui/core/CardMedia';
import CardFooter from "../../components/Card/CardFooter.js";
import AppBar from "@material-ui/core/AppBar";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import cartImage from "../../Images/logo2.png";



import  { useDispatch,useSelector } from 'react-redux'
import { addArticulosql} from '../../actions/articuloActions'
import { getCurrentClientesql } from "../../actions/clienteActions";
import {
  getCurrentLineasql
} from "../../actions/lineaActions";

import {
  getCurrentCategoriasql
} from "../../actions/categoriaActions";

import {
  getCurrentUmedidasql
} from "../../actions/umedidaActions";

import {
  //fetch_datasql
  showCartDlg,
  
  logout
} from "../../actions/ventasActions";

import { useHistory } from 'react-router-dom';



import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import NumberFormat from "react-number-format";
import axios from "axios";


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



const Header = (props) => {
  const classes = useStyles();
  const ruta="http://adryan2.sytes.net:7002/upload/";
  const history = useHistory();





//let unidad="https://localhost";
//let unidad="https://adryan2.sytes.net:5000";
//let unidad="https://apisfsystem.herokuapp.com";
let unidad="https://adryan2.sytes.net:7001";


     const dispatch = useDispatch()
     const tip = useSelector (store => store.articulofile.articulofiles)   
     const cliente = useSelector (store => store.clientefile.clientefiles)   
     const linea = useSelector (store => store.lineafile.lineafiles)   
     const categoria = useSelector (store => store.categoriafile.categoriafiles)   
     const umedida = useSelector (store => store.umedidafile.umedidafiles) 
     const venta = useSelector (store => store.cartItem.cartItems)     
     

    
     const [search, setsearch] = useState("")
     const [searchTerm,setsearchTerm ]= useState("");

     const [datos,setDatos]=useState({
      codigo:ndata,
      descripcion:'',
      costo:0,
      precio:0,
      proveedor:'',
      linea:'',
      grupo:'',
      imagen:'',
      codigostock:'',
      precio1:0,
      precio2:0,
      stockm:0,
      UM_ID:"1",
      detalle:'',
      fecha_cad:'',

    })

    let caracol ="";
    let nrOfItemsInCard= venta.length;

    if (categoria.length!==0){
      caracol = categoria.map(x => (
        <MenuItem key={x.descripcion} value={x.descripcion}>
         {x.descripcion}         
       </MenuItem>
         )
      )
       
    }

    const searchHandler= (event) => {
      const lolo = event.target.value.toUpperCase();
      setsearchTerm(lolo)

  }

   
    const handleChange = event => {
      //setValues(parseFloat(event.target.value));
      setDatos({
        ...datos,
        [event.target.name]:parseFloat(event.target.value)
      })
    };
    


 

   
     const nlen=tip.length;
      let ndata=0;

      if (nlen>0){      
        ndata=parseInt(tip[0].codigo)+1      

      }
    
      

      useEffect(() => {
       // setCount(ndata)
        dispatch(getCurrentClientesql())
        dispatch(getCurrentLineasql())
        dispatch(getCurrentCategoriasql())
        dispatch(getCurrentUmedidasql())
        dispatch(showCartDlg())
        
         },[dispatch])
       
  
    const   handleInputChange=(event)=>{
       setDatos({
         ...datos,
         [event.target.name]:event.target.value
       })

      


     }

     
   // console.log(venta)  
  
  return (
    <div>
    <AppBar className="botones"
       position="static"  
      style={{ backgroundColor: "#FAFAFB"}}
    >
         <button type="button" className="btn btn-primary " onClick={() => {
                props.history.push(
                  "/"
                );
              }}>Inicio</button>

          <Toolbar>
                    
                    <IconButton
                      aria-label="Cart"
                      onClick={() => {
                        dispatch(showCartDlg(true));
                      }}
                    >
                      <Badge badgeContent={nrOfItemsInCard} color="primary">
                        <ShoppingCartIcon />
                      </Badge>
                    </IconButton>

                    <img
                    src={cartImage}
                    alt={"Logo"}
                    style={{ marginLeft: 10 }}
                    />
                      <TextField
                        label="Buscar Productos"
                        value={searchTerm}
                        onChange={searchHandler}
                      />
                    
                      <button type="button" className="btn btn-primary bajaboton" onClick={() => {
                          history.push(
                            "/?category=" +
                            categoria +
                            "&term=" +
                            searchTerm
                          );
                        }}>Buscar</button>

           </Toolbar>         

    </AppBar>
    </div>  
    
  );
}
export default Header
