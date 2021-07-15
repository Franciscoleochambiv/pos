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
import { fetch_sunatsql } from '../../actions/sunatActions'
import { fetch_dnisql } from '../../actions/dniActions'
//import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField';
//import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import Spinner from "../../components/common/Spinner";


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
//  let unidad="https://adryan2.sytes.net:7001";
  const classes = useStyles();

     const dispatch = useDispatch()
     const tip = useSelector (store => store.clientefile.clientefiles)   
     const sunat = useSelector (store => store.sunatfile.sunatfiles)  
     const sunatloading = useSelector (store => store.sunatfile.loading)  

     const dnitodo = useSelector (store => store.dnifile.dnifiles)  
     const dniloading = useSelector (store => store.dnifile.loading)  
     
     const [selector, setSelector] = useState(0); 


     const [buscador, setBuscador] = useState(0); 

     const [loading, setLoading] = useState(false); 
     const [mostrar, setMostrar] = useState(false); 

     const [descripcion, setdescripcion] = useState(""); 
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
        ndoc1:'',
        telefono:'',
        email:'',
        fecha:'',
 
      })

      useEffect(() => {
        //   inputRef.current.focus();
        setCount(ndata)
     //   dispatch(fetch_sunatsql(buscador))
       // dispatch(getCurrentUmedidasql())
        //setDatos({codigo:ndata})
         },[ndata])
       

  
  
  
    const   handleInputChange=(event)=>{
      // console.log('data')
       setDatos({
         ...datos,
         [event.target.name]:event.target.value
       })

     }

     const buscar =  () =>{
       console.log(datos.ndoc1)
       let dndoc=datos.ndoc1
        
        if (dndoc.length==11){
          dispatch(fetch_sunatsql(datos.ndoc1))
          setSelector(1)
          setLoading(true)
          
        } 
        else if (dndoc.length==8){
          dispatch(fetch_dnisql(datos.ndoc1))
          setSelector(3)
          setLoading(true)
          

        }
        else{
          alert("Debe Digitar un Dni o Un Ruc")
          setDatos({
            codigo:ndata,
            descripcion:'',
            titular:'',
            direccion:'',
            direccion2:'',
            direccion3:'',
            tipo:'C',
            tipodoc:'1',
            ndoc:'',
            ndoc1:'',
            telefono:'',
            email:'',
            fecha:'',
          })
          return
        }  
          
     }

     const enviarDatos=(event) =>{
            event.preventDefault(); 
            
            console.log(datos)
            console.log(count)
            let data2={codigo:count}
            console.log(data2)
            
      
            Object.assign(datos,data2);
            console.log(datos);

            console.log(tip)
          
      /*
            let filteredContacts = tip.filter(
              (task) =>{
                let poetName = task.PVCL_NroDocIdentidad;
                return  poetName.find===datos.ndoc;    

                //return poetName.indexOf(poetName) !== -1 ; 
              })
            console.log(filteredContacts) 
          */  
            
            let filteredContacts = tip.filter(numero => numero.PVCL_NroDocIdentidad ===datos.ndoc );
            

/*

            let  filteredContacts = tip.find( numero => numero.PVCL_NroDocIdentidad === datos.ndoc)
            alert(JSON.stringify(filteredContacts))
            alert(JSON.stringify(filteredContacts.length))
            console.log(filteredContacts)  

            */

            if (filteredContacts.length>0){
              alert("El CLiente / Proveedor Ya  se encuentra Registrado ")

            }
            else{
               if (datos.tipodoc=='2'){
                      if (datos.ndoc.length==11){
                        dispatch(addClientesql(datos))
                      }
                      else{
                        alert("El ruc debe tener 11 Numeros")
                      }
                 }      
               else{
                    dispatch(addClientesql(datos))

               }  
              //dispatch(getCurrentClientesql())   
               
              }
	    // alert("Procedemos a Actualizar los Datos");
            

           // let poetName=tip.PVCL_NroDocIdentidad
           // let busca = poetName.indexOf(poetName) !== -1 ; 
           // console.log(busca)
          
            


           






            event.target.reset();

            setDatos({
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
              ndoc1:'',
            })
         //podriamos llamar a la funcion de actualizar clientes 

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

let dashbo= ""
let mostra=""

if (loading){
        if (sunatloading){
          dashbo=(
            <Spinner />
          )        
        }
        else if(dniloading){
            dashbo=(
              <Spinner />
            )        
        }
        else{
          //setdescripcion()
         if (selector==1){

		console.log(sunat);
		let arraysunat=  Object.entries(sunat);
		console.log(arraysunat) 
		console.log(Object.keys(sunat).length);
		console.log(sunat.c0); 
                console.log("longitud de la cadena ");
                if (Object.keys(sunat).length>0){
                    console.log(sunat)

                  //  console.log(sunat[0].c2)
                    
                   // setdescripcion(sunat[0].c2)
	           let dire = sunat.c6;		 
		   if (sunat.c5!='-'){
                      dire=  sunat.c5+" "+dire;    
		     }	
		   if (sunat.c9!='-'){
			  if (sunat.c9!='S/N'){ 
                              dire=  dire+" Nro. "+sunat.c9;
			  }
			   else{
                              dire=dire+ " "+sunat.c9;      
			   }
		     }	
		   if (sunat.c10!='-'){
                      dire=  dire+"Int. "+sunat.c10;    
		     }	
		   if (sunat.c11!='-'){
                      dire=  dire+" LOTE "+sunat.c11;    
		     }	
		   if (sunat.c12!='-'){
                      dire=  dire+" DPTO. "+sunat.c12;    
		     }	
		   if (sunat.c13!='-'){
                      dire=  dire+" Mzna. "+sunat.c13;    
		     }	
		   if (sunat.c14!='-'){
                      dire=  dire+" KM. "+sunat.c14;    
		     }	


                    setdescripcion(sunat.c1)
	           // if (sunat.c5)		

                    setDatos({
                      codigo:ndata,
                     // descripcion:sunat[0].c2,
                      descripcion:sunat.c1,
                     // titular:sunat[0].c2,
                      titular:sunat.c1,
                     // direccion:sunat[0].c6+" "+sunat[0].c7+" "+sunat[0].c10+ " "+sunat[0].departamento+" "+sunat[0].nombre,
                      direccion:dire,
                      direccion2:dire,
                      direccion3:dire,
                     // direccion2:
	              //  sunat[0].c6+" "+sunat[0].c7+" "+sunat[0].c10+ " "+sunat[0].departamento+" "+sunat[0].nombre,
                     // direccion3:
		      //   sunat[0].c6+" "+sunat[0].c7+" "+sunat[0].c10+ " "+sunat[0].departamento+" "+sunat[0].nombre,
                      tipo:'C',
                      tipodoc:'2',
                      ndoc:sunat.c0,
                    
                      telefono:'111111',
                      email:'grupo90pr@gmail.com',
                      fecha:'',
              
                    })
                  } 

         }  

          
            //alert(dnitodo.nombres);
            //alert
         if  (selector == 3){
                if (dnitodo.nombres!=undefined){
                  //console.log(dnitodo)
                  //console.log(dnitodo.nombres)
                  
                  //setdescripcion(sunat[0].c2)
              
                  setDatos({
                    codigo:ndata,
                    descripcion:dnitodo.apellidoPaterno+" "+dnitodo.apellidoMaterno+" "+dnitodo.nombres,
                    titular:dnitodo.apellidoPaterno+" "+dnitodo.apellidoMaterno+" "+dnitodo.nombres,
                    direccion:'',
                    direccion2:'',
                    direccion3:'',
                    tipo:'C',
                    tipodoc:'1',
                    ndoc:dnitodo.dni,               
                    telefono:'111111',
                    email:'grupo90pr@gmail.com',
                    fecha:'',
            
                  })

                  
                } 
         }   

           


         
          setLoading(false)
         // setMostrar(false)
       
          


        }

}


  mostra=(
        <div>
  
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
                  
                
                  
                  onChange={handleInputChange}
                  onFocus={() => setCount(ndata)}
                                   
                  
                  
                  />
                
              <TextField
                id="descripcion"
                label="Razón Social"
                required
                value={datos.descripcion}
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
                value={datos.titular}
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
                value={datos.direccion}
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
                value={datos.direccion2}
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
                value={datos.direccion3}
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
                value={datos.ndoc}           
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
                  value={datos.telefono}             
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
                  value={datos.email}
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
                  value={datos.fecha}            
                  className={classes.textField}
                  helperText="Fecha"
                  margin="dense"
                  variant="outlined"
                  name="fecha"
                  required
                  onChange={handleInputChange}
                />  
           </div>
         
  
  )











    
  
  return (
    <div>
    
    
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
           
            <form onSubmit={enviarDatos}>              
              <h5>{dashbo}</h5>

            <TextField
                  label="N.Documento Identidad"
                  id="ndoc1"                  
                  className={classes.textField}
                  helperText="Numero de Documento"
                  margin="dense"
                  variant="outlined"
                 
                  name="ndoc1"
                  onChange={handleInputChange}
                    
                  inputProps={{ autoFocus: true }}
                />     
                   <Button 
                       color="info" 
                       type="button"
                       onClick={()=>buscar()}  
                       >
                       Buscar
                   </Button>


                 {mostra}  


           
            <CardFooter>
              <Button color="info" type="submit" >Grabar</Button>
            </CardFooter>
           </form> 
          </Card>

           


        </GridItem>
     
      </GridContainer>
    </div>
  );
}
export default Cliente

/*
 console.log(sunat)


       if (sunat.length>0){
        setDatos1({          
          codigo:ndata,
          descripcion:sunat.c2,
          titular:sunat.c2,
          direccion:sunat.c6+" "+sunat.c7+" "+sunat.c10+" "+sunat.departamento+" "+sunat.nombre,
          direccion2:sunat.c6+" "+sunat.c7+" "+sunat.c10+" "+sunat.departamento+" "+sunat.nombre,
          direccion3:sunat.c6+" "+sunat.c7+" "+sunat.c10+" "+sunat.departamento+" "+sunat.nombre,
          tipo:'C',
          tipodoc:'2',
          ndoc:sunat.c1,
          telefono:'',
          email:'',
          fecha:'',
        })


       }
       else{

       }

*/
