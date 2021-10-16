import React, { useEffect,useState } from 'react'
import  { useDispatch,useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate';

import {makeStyles} from '@material-ui/core/styles';

import Spinner from "../../components/common/Spinner";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import NumberFormat from "react-number-format";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Input from "@material-ui/core/Input";

import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";

import CardBody from "../../components/Card/CardBody.js";

import Button from "../../components/CustomButtons/Button.js";
import { useHistory } from "react-router-dom";


import { fetch_ventaseriesql } from "../../actions/ventaserieActions";
import {NumerosaLetras,zfill,mathRound2} from "../../funciones1";
import { unidad,RucEmpresa,ENDPOINT1,ENDPOINT2,NameEmpresa,Nproveedor,Nprovincia,Nciudad,Ndistrito,Ndireccion} from "../../variables";
import axios from 'axios';
import { Divider } from '@material-ui/core';


    const useStyles = makeStyles((theme) => ({
      cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      root: {
        maxWidth: 445,
        '& .MuiTextField-root': {
            
          width: '25ch',
        },
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
      },
        modal: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        },
        iconos:{
          cursor: 'pointer'
        }, 
        inputMaterial:{
          width: '100%'
        },
        table: {
          minWidth: 150,

        },
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
        tableCell1:{
          textDecorationLine: 'underline',
          fontWeight: 'bold',
          fontStyle: 'italic',
          color: "red"

        },
        
       
      }));
      
      const classes = useStyles;



function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator

    />
  );
}


    
const ViewValidaHooks = () => {  
  let  history = useHistory();

    
    const dispatch = useDispatch()
    const data = useSelector (store => store.ventaserie.ventaseriefiles) 
    const loggedInName = useSelector (store => store.auth.user)     


    
    const [search, setsearch] = useState("")
    const [currentPage, setcurrentPage] = useState(1)
    const [todosPerPage, settodosPerPage] = useState(5)
   // const [selectedPage, setselectedPage] = useState(1)
    const [isOpen, setisOpen] = useState(false)
    const [isComp, setisComp] = useState("")
    const [ file,setFile ]= useState("");
    
   // const [ pathImage,setPathImage ]= useState(ruta+"upload.png");

    let serie= zfill(loggedInName.serie,3) 

 

    useEffect(() => {
           
            dispatch(fetch_ventaseriesql(loggedInName.serie))
            
           
    },[dispatch])


    const comprueba2 =(RucEmpresa,data)=>{
      console.log(data)
      setisOpen(true)
      axios.post(ENDPOINT2 + '/api/notes/comprueba2', {
        rucEmisor:RucEmpresa,
        data:data
      })
      .then(res =>
      {
        //alert(res.data)

        //alert("Archivo Generado con Exito")
        setisOpen(false)
        //history.push("/pdf/" + RucEmpresa+"-0" + tipo + "-" + inilet + serie + "-" + unumero + ".pdf"),
        history.push("/vcompro/valida.xls")

        //return(res.data)
        //setisComp(res.data)

      }
      )
      .catch(err =>
        console.log(err)
      )
    }

     

          let dashboardContent;          
       

          dashboardContent = (
           
                  <Spinner/>
              
              );



         
         
        
    
        return (


            
            <GridItem xs={12} sm={6} md={12}>                                                                           
                            <GridContainer>
                                    <GridItem xs={12} sm={6} md={6}>
                                          <Card style={{overflow: "auto"}}>  
                                            <CardBody>
                                              <GridContainer>
                                                  <GridItem xs={12} sm={6} md={6}>  
                                                  <Button type="button"   color="success" style={{padding:"4px 30px"}}  onClick={() => {                                     
                                                            comprueba2(RucEmpresa,data)
                                     
                                                               }}  >Generar Archivo de Validacion de Comprobantes </Button>   

                                                      {isOpen &&
                                                        dashboardContent
                                                      
                                                      ||
                                                       
                                                      <h4 ></h4>
                                                      }         


                                                        
                                                        
                                                  </GridItem>
                                                  
                                              </GridContainer> 
                                            </CardBody>  
                                        </Card>
                                        
                                  </GridItem>      

                           </GridContainer>  
                  </GridItem>                           
                  

        )
   }
export default ViewValidaHooks

