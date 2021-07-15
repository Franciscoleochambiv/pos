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
import { unidad } from "../../variables";



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
    
const ViewVentaserieHooks = () => {  
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
    const [ file,setFile ]= useState("");
    
   // const [ pathImage,setPathImage ]= useState(ruta+"upload.png");

    let serie= zfill(loggedInName.serie,3) 

 

    useEffect(() => {
           
            dispatch(fetch_ventaseriesql(loggedInName.serie))
            
           
    },[dispatch])


  

    const searchHandler= (event) => {
        const lolo = event.target.value.toUpperCase();
        setsearch(lolo)

    }
    
    const handlePageClicked = data => {
        let selected = data.selected;
      //  setselectedPage(selected)
        let sumapagina=Number(selected+1)
        setcurrentPage(sumapagina)

      };


      const seleccion = (event) => {
        event.preventDefault();
        let op =event.target.value;
        settodosPerPage(op)        
      }; 

        
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

          const Pagination = (
            <ReactPaginate 
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={Math.ceil(filteredContacts.length / todosPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={handlePageClicked}
              
              containerClassName={'react-paginate ul'}
              subContainerClassName={'react-paginate li'}
              activeClassName={'active'}
      

              
              />      
             )

         

          const currentTodos = filteredContacts.slice(indexOfFirstTodo, indexOfLastTodo);
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
                      
                               <TableCell className={classes.tableCell}>{l1.DVC_ID}</TableCell>        
                               <TableCell className={classes.tableCell}>{l1.DVC_Serie}</TableCell>        
                               <TableCell className={classes.tableCell}>{l1.DVC_Numero}</TableCell>                         
                               <TableCell className={classes.tableCell}>{l1.TD_ID }</TableCell>        
                               
                               <TableCell className={classes.tableCell}>{l1.TD_Descripcion}</TableCell> 
                               <TableCell className={classes.tableCell}>{l1.fecha}</TableCell> 
                               <TableCell className={classes.tableCell}>{l1.PVCL_RazonSocial}</TableCell> 
                               <TableCell className={classes.tableCell}>{l1.PVCL_NroDocIdentidad}</TableCell> 
                               <TableCell className={classes.tableCell}>{l1.DVC_Total}</TableCell> 

                               <TableCell className={classes.tableCell}>{l1.PVCL_Direccion}</TableCell> 
                               <TableCell className={classes.tableCell}>
                                  <Button type="button"   color="danger" style={{padding:"4px 30px"}}  onClick={() => {
                                   let inilet=(l1.TD_Descripcion).substring(0,1)
                                    history.push("/archivos/"+"10309611131-0"+l1.TD_ID+"-"+inilet+serie+"-"+l1.DVC_Numero+".pdf")                                                  
                                    }}  >PDF</Button>   
                                    <Button type="button" color="success" style={{padding:"4px 30px"}} onClick={() => {
                                   let inilet=(l1.TD_Descripcion).substring(0,1)
                                    history.push("/archivos/"+"10309611131-0"+l1.TD_ID+"-"+inilet+serie+"-"+l1.DVC_Numero+".xml")                                                  
                                    }}  >XML</Button>  
                                    <Button type="button"  color="info"  style={{padding:"4px 30px"}} onClick={() => {
                                   let inilet=(l1.TD_Descripcion).substring(0,1)
                                    history.push("/archivos/"+"R-10309611131-0"+l1.TD_ID+"-"+inilet+serie+"-"+l1.DVC_Numero+".zip")                                                  
                                    }}  >CDR</Button>    
                                   
                              </TableCell>
                              <TableCell className={classes.tableCell}>{l1.DVC_Serie+"-"+l1.DVC_Numero}</TableCell>        
                              
                      
                      
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
                                                 
                            <select  className="form-control" style={{"colo":"red"}}  value={todosPerPage} onChange={seleccion}>
                                <option  style={{"colo":"red"}}value="5">
                                   5
                                </option>
                                <option value="10">
                                    10
                                </option>
                                <option value="25">
                                    25
                                </option>
                                <option value="50">
                                    50
                                </option>
                                <option value="100">
                                    100
                                </option>
                                <option value={filteredContacts.length }>
                                    Todos
                                </option>
                            </select>   
                            <Input type ="text"  name="buscar" className="form-control" placeholder="Buscar Ser-Num RSocial RUC" onChange={searchHandler} value={search}  />                         

                            <GridContainer>
                                    <GridItem xs={12} sm={6} md={12}>
                                          <Card style={{overflow: "auto"}}>  
                                            <CardBody>
                                              <GridContainer>
                                                  <GridItem xs={12} sm={6} md={12}>  
                                                        {edicion}
                                                        <TableContainer component={Paper}>                              
                                                              <Table className={classes.table} aria-label="customized table">    
                                                                        <TableHead >
                                                                            <TableRow className={classes.tableHeadRow}>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>ID</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Serie</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Numero</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Tipo</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Descripción</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Fecha</TableCell>                                    
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Razon Social</TableCell>                                    
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>NIdenditad</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Total</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Direccion</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Visorr</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Visor</TableCell>
                                                             
                                                                                
                                                                          </TableRow>                   
                                                                        </TableHead>
                                                                        
                                                                        <TableBody>
                                                                                {dashboardContent}
                                                                        </TableBody>    
                                                                </Table>
                                                          </TableContainer>  
                                                  </GridItem>
                                                  <GridItem xs={12} sm={6} md={12}> 
                                                              {Pagination} 
                                                  </GridItem>      
                                              </GridContainer> 
                                            </CardBody>  
                                        </Card>
                                        <Card>|
                                            <CardHeader color="primary">            
                                              <p className={classes.cardCategoryWhite}>           
                                              Numero de Coincidencias encontradas {filteredContacts.length}
                                              </p>
                                          </CardHeader> 
                                          
                                          
                                        </Card>        
                                  </GridItem>      

                           </GridContainer>  
                  </GridItem>                           
                  

        )
   }
export default ViewVentaserieHooks

