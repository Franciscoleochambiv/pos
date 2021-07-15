import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
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
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardMedia from '@material-ui/core/CardMedia';
import CardFooter from "../../components/Card/CardFooter.js";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { getCurrentClientesql } from "../../actions/clienteActions";

import { fetch_ndocusql } from "../../actions/ndocuActions";

import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from '@material-ui/core/MenuItem';
import AddCircleIcon from '@material-ui/icons/AddCircle';



import Spinner from "../../components/common/Spinner";

import { setCheckedOutItems,deleteCart } from "../../actions/ventasActions";
import  { useDispatch,useSelector } from 'react-redux'
import  Cliente from "../Cliente/ClienteFil"


//import socketIOClient from "socket.io-client";

import axios from 'axios';

import {NumerosaLetras,zfill,mathRound2} from "../../funciones1";


/*

const ENDPOINT = "https://apichat200.herokuapp.com";
const ENDPOINT1 = "https://adryan2.sytes.net:3001";
//const ENDPOINT1 = "https://apipancho.herokuapp.com";
const ENDPOINT2 = "https://adryan2.sytes.net:3500";
const ENDPOINT3 = "https://localhost:3010";
*/

import { 
  ENDPOINT,
  ENDPOINT1,
  ENDPOINT2,
  ENDPOINT3,
  RucEmpresa,
  NameEmpresa, 
  Nproveedor,
  Nprovincia,
  Nciudad,
  Ndistrito,
  Ndireccion

} from "../../variables";


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

const Order = ()  => {
  const classes = useStyles();
  let  history = useHistory();
  let dashbo=""
 



  const dispatch = useDispatch()
  const tip = useSelector (store => store.cartItem.checkedOutItems)   
  const cliente = useSelector (store => store.clientefile.clientefiles)   
  const loggedInName = useSelector (store => store.auth.user)     

  const numdocu = useSelector (store => store.ndocufile.ndocufiles)   
  const doculoading = useSelector (store => store.ndocufile.loading)   
  const [loading, setLoading] = useState(false); 


  const [isOpen, setisOpen] = useState(false)
  const [isOpen1, setisOpen1] = useState(false)
  const [isOpen3, setisOpen3] = useState(false)

  const [isPago, setisPago] = useState(false)
  const [tipo, setipo] = useState(0)
  const [paso, setpaso]=useState(0)
  const [descripcion, setDescripcion] = useState("")
  const [search, setsearch] = useState("")




  const [mensaje, setMensaje]=useState("")

  const [busca, setBusca]=useState("")
  const [unumero, setunumero] = useState(1)

  const [datos,setDatos]=useState({
    codigo:'',
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
  const tipodoc = [
    {
      value: 0,
      label: 'SELECCIONE',
    },
    {
      value: 1,
      label: 'FACTURAS',
    },
    {
      value: 3,
      label: 'BOLETAS',
    },
    {
      value: 5,
      label: 'PEDIDOS',
    },
 
 
  ];
  
  const [cpvarios,setCpvarios]=useState("");
  const [prove, setProve] = useState({
    codigo:1, 
    descripcion: "Varios",
    PVCL_NroDocIdentidad:"11",
    PVCL_Email:"grupo80pr@gmail.com",
    PVCL_Direccion:"s/n",

   });

  useEffect(() => {    
       dispatch(getCurrentClientesql())   
      },[dispatch])


      const Additemcli = (data) => {
        //alert(JSON.parse(data))
        console.log("esto tenemos acumualod en itemsfin")
        setDescripcion("")
        setisOpen3(false)
        setProve(data)
                
       }   


      const searchHandler= (event) => {
        const lolo = event.target.value.toUpperCase();
        //let categoryFilterValue="AALL CATEGORIAS";
        setsearch(lolo)
        setDescripcion(lolo)

        //alert(event.target.value)
        //history.push(
        //  "/pos/?category=" +
         // categoryFilterValue +
        //  "&term=" +
       // event.target.value
       // )

                 

        if (event.target.value.length>2){
          setisOpen3(true)

        }
        else{
          setisOpen3(false)


        }
        


    }
   
         
      

   const   handleInputChangeb=(event)=>{   

        setBusca(event.target.value)       
  
       }

  const handleClose = () => {
        setisOpen(false)       
        setisOpen1(false)       
       } 
  
  const toggleModal = () => {
        setisOpen(true)
        //dispatch(getCurrentClientesql())   

  }  
  
  const actulizacliente = () => {
    dispatch(getCurrentClientesql())   
   }  


  const toggleModal1 = () => {
    setisOpen1(true)
}    


  const   handleInputChange=(event)=>{    
     setipo(     
       event.target.value
    )
     fetchnumero(event.target.value,loggedInName.serie)
   }

  
   const fetchnumero = (data,serie) => {

    //alert(data)
    dispatch(fetch_ndocusql(data,serie))  
    setLoading(true)
    

   // alert(JSON.stringify(numdocu))

   }  
 


 

  

  const fetchidventa = (id,data,age,serie) => {
    console.log("estos on los datos que pasamos a idventa")
    console.log(data)
    let numero = parseInt(id);
     axios.post(ENDPOINT1+'/api/shoping1/idventa', {            
              id:numero,            
              items:tip,
              age:age,
              serie:serie,
          })              
      .then(res =>  
        console.log("que paso")
  
      )
  }
  
    
 const  fetchidaumenta = async (data,age,serie)=> {
     axios.post(ENDPOINT1+'/api/shoping1/idaumenta', {            
          id:data,            
          age:age,
          serie:serie,
          })              
          .then(res =>  
          console.log("que paso")  
  )
  .catch(function(err) {
    //console.error(err);
  });    
  }


  


  if (loading){
    if (doculoading){
      dashbo=(
        <Spinner />
      )        
    }
    
    else{
       if (numdocu.length>0){

             let info="Se Genero : ";
             let numero1=parseInt(numdocu[0].Numero)+1;

            // alert(tipo)
             setunumero(parseInt(numdocu[0].Numero)+1)   
           

              if(tipo==1){
                    if (prove.PVCL_NroDocIdentidad.length===11){
                      //alert("se genero el Numero de Factura "+numero1)  
                      info=info + "Factura "+numero1;

                      if (tip.length>0){
                        setpaso(1)
                        }      
                      
                    } 
                    else{
                      alert("Para la factura debe ingresar un RUC valido ")  
                      setpaso(0)
                      setipo(0)
                      

                    }
            
            }
            else if(tipo==3){
                //alert("se genero el Numero de Boleta "+numero1)

                info=info + "Boleta "+numero1;


                if (tip.length>0){
                  setpaso(1)
                }      
              
          
            }
            else{
                  //alert("se genero el Numero de Pedido "+numero1)
                  info=info + "Pedido "+numero1;
                  if (tip.length>0){
                    setpaso(1)
                  }      
              
            } 
 
          setMensaje(info)  
          setLoading(false)


       }
      }         
    }              







  let  f=new Date();
  let fecha= f.getFullYear()+ "-" + zfill((f.getMonth() +1),2) + "-" + zfill(f.getDate(),2);

  let serie=zfill(loggedInName.serie,3);


  //console.log(serie)



  

       
      


  const nlen=tip.length;


  


  console.log(nlen)
  console.log(tip)
  let edicion="";
  let dashboard="";
  let bsunat="";
  let mpago="";

  console.log(prove)

   if (prove!=null){

    dashboard=(

    
    <div className="cardnuevo cabeceracolor " style={{marginTop:"1px"}}>
      <GridContainer>
          <GridItem  xs={6} sm={12} md={6}>

           

            <h5>Ruc/Dni {prove.PVCL_NroDocIdentidad}</h5>
            <h5>Nombre  {prove.descripcion} </h5>

          </GridItem>
          <GridItem  xs={6} sm={12} md={6}>

            <h5>Direccion {prove.PVCL_Direccion}</h5>
            <h5>Email  {prove.PVCL_Email} </h5>

          </GridItem>0.00
      </GridContainer>    
          
          
          


    </div>
      
  )

} 

  let totalPrice = tip.reduce((accumulator, item) => {
    return accumulator + item.precio * item.quantity;
  }, 0);

  let totalPriceculqi=totalPrice*100; 
  let totalfactura=(mathRound2(totalPrice)).toFixed(2);         
  let totaligv=(mathRound2(totalPrice)-mathRound2(totalPrice/1.18)).toFixed(2); 
  let totalvventa=(mathRound2(totalPrice/1.18)).toFixed(2); 

  let items2=[];


  let filteredContacts = cliente.filter(

            (item) =>{
             //  console.log(item.descripcion.toLowerCase()+item.codigo.toLowerCase()).includes(search.toLowerCase())
              if (search && !(item.descripcion.toLowerCase()+item.codigo).includes(search.toLowerCase()))
                return false;
                return true;
              
                } //FIN EDL FUNCION MAP          
     );
     let dashboardContentcli;
     let edicion3;

     if (filteredContacts === null ) {
      dashboardContentcli = (
        <TableRow >                       
          <TableCell >
              <Spinner/>
          </TableCell>  
        </TableRow >
          
          );
                 
     }
     else { 

                    if (Object.keys(cliente).length > 0) {
                      dashboardContentcli = (          
                              filteredContacts.map(l1 => (

                                  <TableRow key={l1.codigo} className={classes.tableBodyRow}>                                
                                        <TableCell className={classes.tableCell} >{l1.codigo}</TableCell>                                                
                                        <TableCell className={classes.tableCell}>{l1.descripcion}</TableCell>                         
                                        <TableCell className={classes.tableCell}>{l1.PVCL_Direccion}</TableCell> 
                                        <TableCell className={classes.tableCell}>{l1.PVCL_NroDocIdentidad}</TableCell>                                         
                                        <TableCell className={classes.tableCell}>
                                          <button type="button"  style={{ backgroundColor:"#00acc1"}} onClick={()=>Additemcli(l1)} ><AddCircleIcon  style={{color:"#fff"}} /></button>                          
                                        </TableCell>                                
                                  </TableRow>    


                                      ))     
                                      );        
                     }
                     else{
                        dashboardContentcli = (   
                            <TableRow >                       
                                <TableCell >
                                    <Spinner/>
                                </TableCell>  
                              </TableRow >                              
                      );         
                     } 
                    if (isOpen3){
                        edicion3=(
                          <GridContainer>
                            <div style={{  maxHeight: '20rem',
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                borderTopWidth: '0',
                                outline: '0',
                                borderRadius: '0 0 .32571429rem .32571429rem',
                                transition: 'opacity .1s ease',
                                boxShadow: '0 2px 3px 0 rgba(34,36,38,.15)',
                                borderColor: '#96c8da',
                                width:"100%",
                                borderRightWidth: 1,
                                borderBottomWidth: 1,
                                borderLeftWidth: 1,
                                borderStyle: 'solid',}}>
                                           
                                              <TableContainer component={Paper}>                              
                                                    <Table className={classes.table} aria-label="customized table">    
                                                              <TableHead >
                                                                  <TableRow className={classes.tableHeadRow}>
                                                                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Codigo</TableCell>                                                                      
                                                                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Descripción</TableCell>                                                                                
                                                                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Direccion</TableCell>                                                                                                                                                                                      
                                                                      <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Doc Identidad</TableCell>                                                                      
                                                                </TableRow>                   
                                                              </TableHead>
                                                              
                                                              <TableBody>
                                                                      {dashboardContentcli}
                                                              </TableBody>    
                                                      </Table>
                                                </TableContainer>  
                                      
                            
                        
                  </div>         

                </GridContainer>  )}

     }  //cierre del esle filtered







 console.log(filteredContacts)


  tip.map((item, index) => {

     items2[index]={
                  codigo:item.codigo,
                  unidad_de_medida:"NIU",
                  quantity: item.quantity,
                  unit_price:(mathRound2(item.precio)).toFixed(2),         
                  tax:(mathRound2((item.precio*item.quantity)-(item.precio*item.quantity/1.18))).toFixed(2),
                  item_tax:(mathRound2(item.precio*item.quantity/1.18)).toFixed(2),
                  product_name:item.descripcion,
                  real_unit_price:(mathRound2(item.precio/1.18)).toFixed(2)
        }
       }
    )


 

  if (isOpen){

    edicion=(
      <Dialog
          open={isOpen}
          onClose={handleClose}
       
          >
           <AppBar position="static" style={{color:"", backgroundColor: "#00acc1",boxShadow: "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(0, 172, 193,.4)"}}>
            <Toolbar>           
                Datos del Cliente
            </Toolbar>
          </AppBar>

          
          <DialogContent>
                <Cliente />
                
          </DialogContent>
      </Dialog> 

    )
  }



  if (isOpen1){

    bsunat=(
      <Dialog
          open={isOpen1}
          onClose={handleClose}
       
          >
           <AppBar position="static" style={{color:"", backgroundColor: "#00acc1",boxShadow: "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(0, 172, 193,.4)"}}>
            <Toolbar>           
                Datos del Cliente
            </Toolbar>
          </AppBar>

          
          <DialogContent>

                <TextField
                        label="N.Documento Identidad"
                        id="ndoc"                  
                        className={classes.textField}
                        helperText="Numero de Documento"
                        margin="dense"
                        variant="outlined"
                        required
                        name="ndoc"
                        onChange={handleInputChangeb}
                  />     




                       

              
               
                
          </DialogContent>
      </Dialog> 

    )
  }



  if(isPago){

        if(tipo == "0") {
          alert("Debe Seleccionar un tipo de Documento")   
          setpaso(0) 
        }
        
        else{ 
            let inilet="";
              if (tipo == 1){
                    inilet="F"
              }
              else if  (tipo == 3){   
                inilet="B"
              }
              else  {
                inilet="P"
               }
              mpago= (
                    axios.post(ENDPOINT1+'/api/shoping1/card3', {
                            amount:totalPriceculqi,

                            id:unumero,

                            nom:prove.descripcion,
                            serie:loggedInName.serie,
                            dire:prove.PVCL_Direccion,
                            telf:prove.PVCL_Telefono,
                            email:prove.PVCL_Email,
                            dni:prove.PVCL_NroDocIdentidad,
                            items:tip,
                            idcliente:prove.codigo,

                            //paseo:this.state.paseo,
                            age:tipo,
                        })              
                        .then(res =>  

                          
                               fetchidventa(unumero,tip,tipo,loggedInName.serie),
                               fetchidaumenta(unumero,tipo,loggedInName.serie),
                              
                                axios.post(ENDPOINT2+'/api/notes', {                                                                       
                                          items:items2,
                                          title :RucEmpresa+"-0"+tipo+"-"+inilet+serie+"-"+unumero,
                                          content:"za",
                                          author:NameEmpresa,
                                          date:fecha,
                                          serie:inilet+serie,
                                          numero:unumero,
                                          fecha_de_emision:fecha ,
                                          total_letras:NumerosaLetras(totalPrice)+ " SOLES",
                                          rucemisor:RucEmpresa,
                                          proveedor:Nproveedor,
                                          razonemisor:NameEmpresa,
                                          provincia:Nprovincia,
                                          ciudad:Nciudad,
                                          distrito:Ndistrito,
                                          diremisor:Ndireccion,
                                          cliente_numero_de_documento:prove.PVCL_NroDocIdentidad,
                                          cliente_denominacion:prove.descripcion,
                                          cliente_direccion:prove.PVCL_Direccion,
                                          total_igv:totaligv,
                                          total_gravada:totalvventa,
                                          total:totalfactura,
                                          tipo_de_comprobante:"0"+tipo,
                                          porcentaje_de_igv:"18",
                                          moneda:"PEN",
                                          email:prove.PVCL_Email    
                                        
                                      })              
                                      .then(res =>
																		//	  history.push("/pdf/"),
																		   //|  alert("todo bien"),
                                         history.push("/pdf/"+"10309611131-0"+tipo+"-"+inilet+serie+"-"+unumero+".pdf"),
                                        dispatch(deleteCart([])),                                      
                                        history.push("/pos/pos")

                                      )
                                      .catch(err =>
                                        console.log(err)
                                        )


                           )
                   )  
    
            }  
  

       }
  
  


  //const dataprops= mapStateToProps();
  //console.log(props)

      return(
        


        
    
       <GridContainer>
          <GridItem  xs={12} sm={12} md={6}>
          
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Lista de Productos</h4>
                
              </CardHeader>

            {edicion}
            {bsunat}
             <TableContainer component={Paper}>                              
                   <Table className={classes.table} aria-label="customized table">    
                          <TableHead >
                                <TableRow className={classes.tableHeadRow}>
                                     <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Item Descripcion</TableCell>
                                     <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Cantidad</TableCell>
                                     <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Precio</TableCell>
                                     <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Total</TableCell>
                                     
                                </TableRow>                   
                           </TableHead>                                                           
                           <TableBody>
                           {tip.map((item, index) => {
                          return (
                            <TableRow key={item.id}>
                              <TableCell>{item.descripcion}</TableCell>
                              <TableCell>{item.precio}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.quantity*item.precio}</TableCell>
                            </TableRow>
                          );
                          })}
                                                                         
                           </TableBody>    
                           
                    </Table>
              </TableContainer> 

              <CardFooter>
                Total Venta S/. {totalPrice}
              
             </CardFooter>
           </Card>                      
        </GridItem>            
          <GridItem  xs={12} sm={12} md={6}>
          <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Datos de La Venta</h4>
                
              </CardHeader>


              

                
  
              <TextField
                type="text"
                id="descripcion"                
                value={descripcion}
                required
                name="descripcion"
                onChange={searchHandler}
                style={{ margin: 8,width:"95%"}}
                placeholder="Ingrese Codigo o Descripcion del Cliente"                
                fullWidth
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />  

               
                 {edicion3}

                 {dashboard}

                <Button
                    color="primary"
                    variant="outlined"
                    disabled={totalPrice === 0 } 

                    onClick={()=>toggleModal()} 
                   
                  >
                    Crear Nuevo Cliente   
                  </Button>
                  <Button
                    color="warning"
                    variant="outlined"
                    disabled={totalPrice === 0 } 

                    onClick={()=>actulizacliente()} 
                   
                  >
                    Actualizar Clientes
                  </Button>
                 

                  <TextField
                  id="tipo"
                  select
                  label="Select"
                  value={tipo}
                  name="tipo"
                  onChange={handleInputChange}
                  helperText="TIPO DE DOCUMENTO"
                  variant="outlined"
                  margin="dense"
                >
                  {tipodoc.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                {dashbo} 
               <h1>{mensaje}</h1> 

            

            
              <CardFooter>
                  <Button
                    color="primary"
                    variant="outlined"
                    disabled={paso==0 } 
                    
                    onClick={() => {
											console.log(prove)
                       setisPago(true)    

                   }}
                           
                 
                   
                  >
                    Efectivo
                  </Button>
                  <Button
                      color="primary"
                      variant="outlined"
                      //disabled={totalPrice === 0}

                      //onClick={()=>Rpago()} 


                      onClick={() => {
                           
                            dispatch(setCheckedOutItems([]))
                            dispatch(deleteCart([]))


                            history.push("/")
                            

                        
                      }}
                    
                    >
                      Descartar
                    </Button>
             
              
             </CardFooter>
           </Card>           

        </GridItem>
      </GridContainer>    


      )
  }

//const Order = withRouter(connect(mapStateToProps)(ConnectedOrder));  
export default Order



