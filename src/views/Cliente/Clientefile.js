//import React, { useState } from 'react'
import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
//import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import  { useDispatch,useSelector } from 'react-redux'
import { addClientesql } from '../../actions/clienteActions'
//import { useForm } from 'react-hook-form'
import ViewCliente from './ViewCliente';
import TextField from '@material-ui/core/TextField';
//import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';


//iimport TextField from '@material-ui/core/TextField';mport { Link } from 'react-router-dom';


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
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

const Cliente = () => {
  const classes = useStyles();

     const dispatch = useDispatch()
     const tip = useSelector (store => store.clientefile.clientefiles)   
     //const inputRef = useRef(null);  
     //const [Entradas, setEntradas] = useState([])
     const [count, setCount] = useState(0);
     //const {register, errors, handleSubmit} = useForm();
    // const inputRef = useRef();

 



   

     
     const nlen=tip.length;
      let ndata=0;


      if (nlen>0){      
        ndata=parseInt(tip[0].codigo)+1      
        

      }
      const [datos,setDatos]=useState({
        codigo:ndata,
        descripcion:'',
        titular:'',
        direccion:'',
        direccion2:'',
        direccion3:'',
        tipo:'C',
        tipodoc:'1',
        ndoc:'',
        telefono:'',
        email:'',
        fecha:'',
 
      })

      useEffect(() => {
        //   inputRef.current.focus();
        setCount(ndata)
        //setDatos({codigo:ndata})
         },[ndata])
       

 

     

  
  
    const   handleInputChange=(event)=>{
      // console.log('data')
       setDatos({
         ...datos,
         [event.target.name]:event.target.value
       })

     }

     const enviarDatos=(event) =>{
            event.preventDefault(); 
            
            console.log(datos)
            console.log(count)
            let data2={codigo:count}
            console.log(data2)
            
      
            Object.assign(datos,data2);
            console.log(datos);


            let solucion = tip.filter(numero => numero.PVCL_NroDocIdentidad ===datos.ndoc );
            //tip.filter(task => (task.codigo.toString()).toUpperCase() === incodigo ); 
            
             
            if (solucion.length > 0){
              alert("El Nro de Documento Ya existe ")
              return
            
            }
            else{
              dispatch(addClientesql(datos))

            }

            event.target.reset();


     }
     
     const tiposc = [
      {
        value: 'C',
        label: 'Clientes',
      },
      {
        value: 'P',
        label: 'Proveedores',
      },
   
    ];
    const tipodoc = [
      {
        value: '1',
        label: 'DNI',
      },
      {
        value: '2',
        label: 'RUC',
      },
      {
        value: '3',
        label: 'OTROS',
      },
   
   
    ];

    
    

    
  
  return (
    <div>
    
    
      <GridContainer>
        <GridItem xs={6} sm={6} md={6}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Clientes Proveedores</h4>
              <p className={classes.cardCategoryWhite}>Complete la Información</p>
            </CardHeader>
            <form onSubmit={enviarDatos}>
               
                <TextField
                  label="Codigo"
                  id="codigo"
                  value={ndata}                                    
                  className={classes.textField}
                  helperText="Codigo del Cliente o Proveedor"
                  margin="dense"
                  variant="outlined"
                  name="codigo"                  
                  required
                  
                  
                  inputProps={{ autoFocus: true }}
                  
                  onChange={handleInputChange}
                  onFocus={() => setCount(ndata)}
                                   
                  
                  
                  />
                
              <TextField
                id="descripcion"
                label="Razón Social"
                required
                name="descripcion"
                onChange={handleInputChange}
                style={{ margin: 8,width:"95%"}}
                placeholder="Razon Social"
                helperText="Nombre de la Empresa"
                fullWidth
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              <TextField
                id="titular"
                label="Titular"
                name="titular"
                required
                onChange={handleInputChange}
                style={{ margin: 8,width:"95%"}}
                placeholder="Titular"
                helperText="Nombre"
                fullWidth
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
             
                 <TextField
                id="direccion"
                label="Direccion"
                name="direccion"
                onChange={handleInputChange}
                style={{ margin: 8,width:"95%"}}
                placeholder="Direccion Principal"
                helperText="direccion"
                fullWidth
                margin="dense"
                required
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
               <TextField
                id="direccion2"
                label="Direccion2"
                name="direccion2"
                onChange={handleInputChange}
                style={{ margin: 8,width:"95%"}}
                placeholder="Direccion2"
                helperText="Direccion 2"
                required
                fullWidth
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
               <TextField
                id="direccion3"
                label="Direccion"
                name="direccion3"
                onChange={handleInputChange}
                style={{ margin: 8,width:"95%"}}
                placeholder="Direccion 3"
                helperText="Direccion 3"
                fullWidth
                required
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />

              <TextField
                  id="tipo"
                  select
                  label="Select"
                  value={datos.tipo}
                  name="tipo"
                  onChange={handleInputChange}
                  helperText="Seleccione un tipo de Cliente"
                  variant="outlined"
                  margin="dense"
                >
                  {tiposc.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="tipodoc"
                  select
                  label="Select"
                  value={datos.tipodoc}
                  name="tipodoc"
                  onChange={handleInputChange}
                  helperText="Seleccione un tipo de Documentgo"
                  variant="outlined"
                  margin="dense"
                >
                  {tipodoc.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="N.Documento Identidad"
                  id="ndoc"                  
                  className={classes.textField}
                  helperText="Numero de Documento"
                  margin="dense"
                  variant="outlined"
                  required
                  name="ndoc"
                  onChange={handleInputChange}
                />     
                 <TextField
                  label="Telefono"
                  id="telefono"                  
                  className={classes.textField}
                  helperText="Numero de Telefono"
                  margin="dense"
                  variant="outlined"
                  name="telefono"
                  required
                  onChange={handleInputChange}
                />     
                <TextField
                  label="Email"
                  type="email"
                  id="email"                  
                  className={classes.textField}
                  helperText="Email"
                  margin="dense"
                  variant="outlined"
                  name="email"
                  required
                  onChange={handleInputChange}
                />   
                 <TextField
                
                  type="date"
                  id="fecha"                  
                  className={classes.textField}
                  helperText="Fecha"
                  margin="dense"
                  variant="outlined"
                  name="fecha"
                  required
                  onChange={handleInputChange}
                />     
  


                 

           
            <CardFooter>
              <Button color="info" type="submit" >Grabar</Button>
            </CardFooter>
           </form> 
          </Card>

           


        </GridItem>

        <GridItem xs={12} sm={6} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Clientes Proveedores Edición /Eliminación</h4>
              <p className={classes.cardCategoryWhite}>Listado Edición /Eliminación</p>
            </CardHeader>

          
            
            
              <ViewCliente />
            
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
export default Cliente

