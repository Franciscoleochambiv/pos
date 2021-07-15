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

import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import NumberFormat from "react-number-format";
import axios from "axios";


import glamorous, {Div} from 'glamorous'
import {css} from 'glamor'
import matchSorter from 'match-sorter'
//import starWarsNames from 'starwars-names'
import Downshift from 'downshift'


import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Table from '@material-ui/core/Table';



let results = await Api.searchItems(qsAsObject);







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
     const data = useSelector (store => store.articulofile.articulofiles)   


     const [ items,setItems ]= useState(data);

     const [prove, setProve] = useState({
      codigo:1, 
      descripcion: "Varios"

     });
    

      useEffect(() => {
       // setCount(ndata)
       // dispatch(getCurrentArticulosql())
         },[dispatch])


         const   handleInputChange=(event)=>{
          //setsearchTerm1(event.target.value)
          //const key = event.keyCode;
        //console.log("Presionada: " + key);

          
          console.log(data)
          console.log(event.target.value)
          let bus=""
          if (event.target.value.length>2){
             bus = matchSorter(data,event.target.value,{keys: ['codigo', 'descripcion']})
          }
          else{
            bus=prove

          }
          //matchSorter(objList, 'g', {keys: ['name', 'color']})
          setItems(bus)
          console.log(bus)
    
      }
      
      const   handleTest=(event)=>{
        //setsearchTerm1(event.target.value)
        if(event.key === 'BackSpace'){
          console.log('enter press here! ')
        }
        const key = event.key;
        console.log("Presionada: " + key);

        
    }   
       


    const handleStateChange = (changes, downshiftState) => {
      if (changes.hasOwnProperty('inputValue')) {
           if (changes.inputValue.length>3){
               setItems(getItems(changes.inputValue))
           }
           else{

           // setItems(getItems(changes.inputValue))
           }
          
      }
      // handle stuff here if you need to
      // this is especially useful if you need
      // to controll some of the internal state yourself
    }
    const handleChange = (selectedItem, downshiftState) => {
      this.setItems(data)
      // handle the new selectedItem here
    }
    const getItems = value => {
      return value
        ? matchSorter(data, value, {
            keys: ['descripcion'],
          })
        : data
    }

    const  itemToString = (i) => {
      return i ? i.descripcion : ''
    }

     let dashbo=""
     let dashbo1=""
      
      if (items.length > 0){
        dashbo=(
          
          
          items.map(l1 => (
            <div style={{  position: 'relative',
            cursor: 'pointer',
            display: 'block',
            border: 'none',
            height: 'auto',
            textAlign: 'left',
            borderTop: 'none',
            lineHeight: '1em',
            color: 'rgba(0,0,0,.87)',
            fontSize: '1rem',
            textTransform: 'none',
            fontWeight: '400',
            boxShadow: 'none',
            padding: '.8rem 1.1rem',
            whiteSpace: 'normal',
            wordWrap: 'normal'}}>
            <ul>
                <li key={l1.codigo} >{l1.codigo }"-"{l1.descripcion} </li>



            </ul>
            
            </div>  



            ))



        )

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
          
          <Table className={classes.table} aria-label="customized table">    

          <TableHead >
              <TableRow className={classes.tableHeadRow}>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Codigo</TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Descripcion</TableCell>
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Modificaiones</TableCell>        
            </TableRow>                   
          </TableHead>

          <TableBody>
          {items.map(l1 => (
           
           

            
                <TableRow key={l1.id} className={classes.tableBodyRow}>
                   
                   <TableCell className={classes.tableCell}>{l1.codigo}</TableCell>        
                   <TableCell className={classes.tableCell}>{l1.descripcion}</TableCell>        
                   <TableCell className={classes.tableCell}>
                        <button type="button"   >Agregar</button>                                         
                   </TableCell>                                      
                   
               </TableRow>  
               ))}     
                  
                              </TableBody> 
                  </Table>

                  </div>            
                 

                         )             
                                     
      }
      else{
        dashbo=(

          <h1>Sin datos</h1>
 
          )
          dashbo1=(

            <h1>Sin datos</h1>
   
            )    

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
                onChange={handleInputChange1}
                //onKeyPress={handleTest}
               
                style={{ margin: 8,width:"95%"}}
                placeholder="Descripcion"
                
                fullWidth
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            
      
          


     

          

                       
                          {dashbo1}

      




            
          </Card>

        </GridItem>
      
      
      </GridContainer>



    </div>
  );
}
export default Pos

