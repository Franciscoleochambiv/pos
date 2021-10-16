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

    

    //let unidad="https://adryan2.sytes.net:7001";


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
      axios.post(ENDPOINT2 + '/api/notes/comprueba2', {
        rucEmisor:RucEmpresa,
        data:data
      })
      .then(res =>
      {
        //alert(res.data)
        alert("Archivo Generado con Exito")
        //return(res.data)
        //setisComp(res.data)

      }
      )
      .catch(err =>
        console.log(err)
      )
    }

        

      const comprueba =(ruc,tipo,serie,numero,numeroidr,fecha,importe)=>{
      let tidrecep="";
      let nserie="";
      

      if (tipo==="03"){
        tidrecep="0";
        nserie="B"+zfill(serie,3);

      }

      else{
        tidrecep="6";
        nserie="F"+zfill(serie,3);
        


      }
    //  alert(archivotmp)

          
      axios.post(ENDPOINT2 + '/api/notes/comprueba2', {
        rucEmisor:ruc,
        tipoCDP:tipo,
        serieCDP:nserie,
        numeroCDP:numero,
        tipoDocIdReceptor:tidrecep,
        numeroDocIdReceptor:numeroidr,
        fechaEmision:fecha,
        importeTotal:mathRound2(importe,2),                    

      })
        .then(res =>
         {
           //alert(res.data)
          //return(res.data)
          setisComp(res.data)

         }
          
          //alert(res.data)
          //console.log(res.data)



        )
        .catch(err =>
          console.log(err)
        )

    }




  



    
        
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(data.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }

        let filteredContacts = data.filter(
            (task) =>{
                let poetName = task.Nserie+task.PVCL_RazonSocial.toUpperCase()+task.PVCL_NroDocIdentidad;
                let separador=" "; 
                let i;
                let poetName1=search.split(separador);
                let tpalabras=poetName1.length;    
                let datopa;  
                if (tpalabras>3){
                    return  poetName.indexOf(search) !== -1;    

                  }
                else{

                      for (i=0;i<tpalabras;i++) {                       
                          datopa=poetName1[i];                         
                          return poetName.indexOf(datopa) !== -1 ;                       
                        }
                        return poetName;
                      }
                } //FIN EDL FUNCION MAP
            
          );

        
         

          const currentTodos = filteredContacts.slice(indexOfFirstTodo, indexOfLastTodo);
          let data2={};
         

          let dashboardContent;          
          let edicion;


          if (filteredContacts === null ) {
            dashboardContent = (
              <TableRow >                       
                <TableCell >
                    <Spinner/>
                </TableCell>  
              </TableRow >
                
                );
                       
          } 

         
          if (Object.keys(data).length > 0) {
            dashboardContent = (          
                    currentTodos.map(l1 => (
                  

                      <TableRow key={l1.codigo} className={classes.tableBodyRow}>   
                                                                                     
                                <TableCell className={classes.tableCell}>{l1.fecha}</TableCell>    
                                <TableCell className={classes.tableCell}>{l1.DVC_Serie+"-"+l1.DVC_Numero}</TableCell>                                                      
                                <TableCell className={classes.tableCell}>{l1.TD_ID }</TableCell>        
                                <TableCell className={classes.tableCell}>{l1.TD_Descripcion}</TableCell> 
                                <TableCell className={classes.tableCell}>{l1.PVCL_NroDocIdentidad}</TableCell>                                 
                                <TableCell className={classes.tableCell}>{l1.PVCL_RazonSocial}</TableCell>                                
                                <TableCell className={classes.tableCell}>{l1.DVC_Total}</TableCell> 
                                <TableCell className={classes.tableCell}>
    

                                                   

                                 </TableCell> 
                                
                      
                    </TableRow>    


                            ))     
                            );        
        }
        else{
          dashboardContent = (   
            <TableRow >                       
                <TableCell >
                    <Spinner/>
                </TableCell>  
              </TableRow >  

                  
            );         
          } 
    
        return (


            
            <GridItem xs={12} sm={6} md={12}>                                                                           
                            <GridContainer>
                                    <GridItem xs={12} sm={6} md={6}>
                                          <Card style={{overflow: "auto"}}>  
                                            <CardBody>
                                              <GridContainer>
                                                  <GridItem xs={12} sm={6} md={6}>  
                                                  <Button type="button"   color="success" style={{padding:"4px 30px"}}  onClick={() => {
                                     //anula(RucEmpresa,"0"+l1.TD_ID,l1.DVC_Serie,l1.DVC_Numero,l1.fecha,l1.DVC_Total,l1.PVCL_RazonSocial,l1.DVC_ID)     
                                                            comprueba2(RucEmpresa,data)
                                     
                                                               }}  >Generar Archivo de Validacion de Comprobantes </Button>   


                                                        
                                                        
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

