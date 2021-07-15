//import React, { Component } from "react";
import React, { useState, useEffect } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./Header.css";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";
//import Button from "@material-ui/core/Button";
import Button from "../../components/CustomButtons/Button.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  showCartDlg,
  toggleMenu,
  logout
} from "../../actions/ventasActions";
import cartImage from "../../Images/logo2.png";
//import Auth from "../../Auth";



//import { categories } from "../../Data";



import Api from "../../Api";

//import {fetch_datacate} from "../../Api";

import Person from "@material-ui/icons/PersonOutline";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Menu3 from "../Menu/Menu3";

import { makeStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";

import { useHistory } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';


import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";

import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardMedia from '@material-ui/core/CardMedia';
import CardFooter from "../../components/Card/CardFooter.js";


import  { useDispatch,useSelector } from 'react-redux'

import { getCurrentCategoriasql }  from "../../actions/categoriaActions";
import {
  getCurrentArticulosql
} from "../../actions/articuloActions";

import { getCurrentProducto }  from "../../actions/productoActions";

import { Autocomplete } from '@material-ui/lab';

import { createFilterOptions } from '@material-ui/lab/Autocomplete';

//import { getCurrentBusca } from "../../actions/productoActions";


//import IconButton from "@material-ui/core/IconButton";
//import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";

import Typography from "@material-ui/core/Typography";

import matchSorter from 'match-sorter';


//import Menu3 from "../Menu/Menu3";


// Option items for product categories

//auth: 


/*

async fetchData() {

  this.setState({ loading: true });

  // Parse the query string
  let qsAsObject = queryString.parse(this.props.location.search);
  //console.log("este es el resultado de la barra")

  //console.log(qsAsObject)
  



  let results = await Api.searchItems(qsAsObject);

  this.setState({
    items: results.data,
    loading: false,
    totalItemsCount: results.totalLength
  });
}

*/





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
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12
  },
  
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  inputRoot: {
    color: "purple",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "green"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "red"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "purple"
    }
  },
  '@global': {
    '.MuiAutocomplete-option[data-focus="true"]': {
        background: '#26c6da'
    }
}
};



const useStyles = makeStyles(styles);

const Header = ()  => {
  const classes = useStyles();
  let  history = useHistory();
  
  const dispatch = useDispatch()

  //nrOfItemsInCard: state.cartItem.cartItems.length,
  //loggedInUser: state.loggedInUser
  //const login = useSelector (store => store.cartItem.cartItems)   

  const ItemsInCard = useSelector (store => store.cartItem.cartItems)   
  const loggedInUser = useSelector (store => store.auth.isAuthenticated) 
  const loggedInName = useSelector (store => store.auth.user)     


  const [searchTerm,setsearchTerm] = useState("")
  const [searchTerm1,setsearchTerm1] = useState("")


  const categoria = useSelector (store => store.categoriafile.categoriafiles)  
  const categorialoading = useSelector (store => store.categoriafile.loading)  
  //const data = useSelector (store => store.articulofile.articulofiles) 

  const data = useSelector (store => store.productofile.productofiles) 
  const [items ,setItems ]= useState(data) 


  let categoryFilterValue="AALL CATEGORIAS";
  const [prove, setProve] = useState({
    codigo:1, 
    descripcion: "Varios",    
   });


   const filterOptions = createFilterOptions({
    //matchFrom: 'tart',
    limit:500
    //stringify: option => option.title,
   
  });

  //const filterOptions = (data, { inputValue }) => matchSorter(data, inputValue);

  const   handleInputChange=(event)=>{
      //setsearchTerm1(event.target.value)
      console.log(data)
      console.log(event.target.value)
      let bus = matchSorter(data,event.target.value,{keys: ['codigo', 'descripcion']})
      //matchSorter(objList, 'g', {keys: ['name', 'color']})
      setItems(bus)
      console.log(bus)

  }



  /*
  if (categoria.length>0){
     categoryFilterValue=categoria[0].descripcion
  }
*/

  let nrOfItemsInCard = ItemsInCard.length;


  console.log(data)
  //console.log(loggedInUser)

  useEffect(() => {
     dispatch(getCurrentCategoriasql())    
     //dispatch(getCurrentArticulosql())
     dispatch(getCurrentProducto())
      },[dispatch])

  let dashbo=""

  if (loggedInUser){

       dashbo=(

          <AppBar className="botones " 
          
          style={{ backgroundColor: "#FAFAFB"}}>    
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
                            label="Buscar Productos "
                            value={searchTerm}

                            className={classes.textField}
                            onChange={e => {
                              setsearchTerm(e.target.value)     
                              //dispatch(getCurrentBusca(e.target.value))             

                              history.push(
                                "/pos/?category=" +
                                categoryFilterValue +
                                "&term=" +
                              e.target.value
                              );
              
                            }}                  
                            
                          />  

                      
                          <Menu3  />

                          {console.log(items)}

                      

                        

                           


                              <Button color="primary" type="button"  onClick={() => {

                            //   dispatch(showCartDlg(false));
                                history.push(
                                  "/admin"
                                );



                              }}>Dashboard </Button>

                            <Button color="primary" type="button"  onClick={() => {

                            //   dispatch(showCartDlg(false));
                                history.push(
                                  "/pos"
                                );



                              }}>Inicio</Button>

                          <section className={classes.rightToolbar}>
                          <Typography variant="title" color="primary" style={{fontSize: "25px"}}>
                          Bienvenido :  {loggedInName.name.toUpperCase()} - Serie : {loggedInName.serie}
                          </Typography>


                            
                             
                           </section>

                             
                              

                              

                </Toolbar>  
         </AppBar>     
    
       )

  }


  return(
    <div>    
          {dashbo}
     </div> 
    
  )
}
export default Header 

/*
position="static"
                         <Autocomplete
                              id="prove"
                              options={data}
                              name="prove"
                              classes={classes}
                              freeSolo      
                              value={prove}
                              onChange={(e, newValue) => {
                                if (newValue!=null){
                              // setProve(newValue);
                                history.push(
                                  "/?category=" +
                                  categoryFilterValue +
                                  "&term=" +
                                newValue.descripcion
                                );
                              } 
                              else{
                                history.push(
                                  "/?category=" +
                                  categoryFilterValue )

                              }

                              }}      
                              //getOptionSelected={(option, value) => option.descripcion === value.descripcion}      
                              getOptionLabel={(option) => option.descripcion}
                              //getOptionLabel={option => option.descripcion?option.descripcion:option}
                              style={{ width:"95%" }}
                              renderInput={(params) => <TextField {...params}    className={classes.textField} margin="dense" label="Lista de Productos" variant="outlined" />}
                              />



                                 <IconButton color="primary" aria-label="Edit">
                                  <EditIcon />
                                </IconButton>
                                <IconButton color="primary" aria-label="Save">
                                  <SaveIcon />
                                </IconButton>
                                <IconButton color="primary" aria-label="More Options">
                                  <MoreVertIcon />
                                </IconButton>






                                <Autocomplete
                              id="prove"
                              options={data}
                              name="prove"
                              classes={classes}
                              freeSolo      
                              value={prove}
                              onChange={(e, newValue) => {
                                if (newValue!=null){
                              // setProve(newValue);
                                history.push(
                                  "/?category=" +
                                  categoryFilterValue +
                                  "&term=" +
                                newValue.descripcion
                                );
                              } 
                              else{
                                history.push(
                                  "/?category=" +
                                  categoryFilterValue )

                              }

                              }}      
                              //getOptionSelected={(option, value) => option.descripcion === value.descripcion}      
                              getOptionLabel={(option) => option.descripcion}
                              //getOptionLabel={option => option.descripcion?option.descripcion:option}
                              style={{ width:"95%" }}
                              renderInput={(params) => <TextField {...params}    className={classes.textField} margin="dense" label="Lista de Productos" variant="outlined" />}
                              />


                                <Autocomplete
                              id="prove"
                              options={data}
                              name="prove"
                              classes={classes}
                              freeSolo      
                              value={prove}
                              autocomplete={false}
                              onChange={(e, newValue) => {
                               

                              }}      
                              //getOptionSelected={(option, value) => option.descripcion === value.descripcion}      
                              getOptionLabel={(option) => option.descripcion}
                              //getOptionLabel={option => option.descripcion?option.descripcion:option}
                              style={{ width:"95%" }}
                              renderInput={(params) => <TextField {...params}   onChange={e => {
                                setsearchTerm(e.target.value)  
                                
                                //alert(e.target.value)
                                dispatch(getCurrentBusca(e.target.value))             
                              }
                            }

                                className={classes.textField} margin="dense" label="Lista de Productos" variant="outlined" />}
                              />

                                  <Autocomplete
                              id="prove"
                              options={items}
                              name="prove"
                              autoComplete="off"
                              classes={classes}
                              freeSolo      
                              value={prove}
                              filterOptions={filterOptions}
                              onChange={(e, newValue) => {
                                

                              }}      
                              //getOptionSelected={(option, value) => option.descripcion === value.descripcion}      
                              getOptionLabel={(option) => option.descripcion}
                              //getOptionLabel={option => option.descripcion?option.descripcion:option}
                              style={{ width:"95%" }}
                              renderInput={(params) => <TextField {...params}    onChange={handleInputChange}
                               className={classes.textField} margin="dense" label="Lista de Productos" variant="outlined" />}
                              />



*/