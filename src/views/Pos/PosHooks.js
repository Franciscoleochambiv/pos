import React, { useEffect,useState } from 'react'
import  { useDispatch,useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate';
import {TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import {
  getCurrentArticulosql,deleteCurrentArticulosql,updateCurrentArticulosql
} from "../../actions/articuloActions";
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
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from "../../components/CustomButtons/Button.js";
import { Autocomplete } from '@material-ui/lab';



import AddCircleIcon from '@material-ui/icons/AddCircle';


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
import { addItemInCart } from "../../actions/ventasActions";
import  CartDialog   from "../CartDialog/CartDialogv";
import ProductList from "../ProductList/ProductListv";
import { useHistory } from "react-router-dom";
import { sortByPrice } from "../../funciones1";

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
        tableCell : {
          color: "#FFFFFF",
          padding:"1px"

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
    
const PosHooks = () => {  

    const ruta="http://adryan2.sytes.net:7002/upload/";

    let unidad="https://adryan2.sytes.net:7001";

    let  history = useHistory();
    const dispatch = useDispatch()
    const data = useSelector (store => store.articulofile.articulofiles) 
    const itemsfin=useSelector (store => store.cartItem.cartItems) 

    const cliente = useSelector (store => store.clientefile.clientefiles)   
     const linea = useSelector (store => store.lineafile.lineafiles)   
     const categoria = useSelector (store => store.categoriafile.categoriafiles)   
     const umedida = useSelector (store => store.umedidafile.umedidafiles)   


    
    const [search, setsearch] = useState("")
    const [itemsini, setItemsini] = useState(itemsfin)
    const [currentPage, setcurrentPage] = useState(1)
    const [todosPerPage, settodosPerPage] = useState(30)
    const [descripcion, setDescripcion] = useState("")
   // const [selectedPage, setselectedPage] = useState(1)
    const [isOpen, setisOpen] = useState(false)
    const [ file,setFile ]= useState("");
    
   // const [ pathImage,setPathImage ]= useState(ruta+"upload.png");

    const [ nimagen,setNimagen ] = useState(ruta+"upload.png");

    const [datos, setDatos] = useState({      
          codigo:"",
          descripcion:"",
          costo:0,
          precio:0,
          proveedor:"1",
          linea:"1",
          grupo:"1",
          imagen:"",
          codigostock:"",
          precio1:0,
          precio2:0,
          stockm:0,
          UM_ID:"",
          detalle:"",
          fecha_cad:"",

    })
    const [prove, setProve] = useState({
      codigo:1, 
      descripcion: "Varios"

     });
     const [line, setLine] = useState({
       codigo:1,
       descripcion:"Marca"
     });
     const [cate, setCate] = useState({
       codigo:1,
       descripcion:"Categoria"
     });

     const [uni, setUni] = useState({
      codigo:1,
      descripcion:"UNI"
    });

 

    useEffect(() => {
           
            dispatch(getCurrentArticulosql())
          
           
    },[dispatch])


  

    const searchHandler= (event) => {
        const lolo = event.target.value.toUpperCase();
        let categoryFilterValue="AALL CATEGORIAS";
        setsearch(lolo)
        setDescripcion(lolo)

        //alert(event.target.value)
        history.push(
          "/pos/?category=" +
          categoryFilterValue +
          "&term=" +
        event.target.value
        )

                 

        if (event.target.value.length>2){
          setisOpen(true)

        }
        else{
          setisOpen(false)


        }
        


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

      const toggleModal = (data) => {
        setisOpen(true)
       
        
        
        setDatos({
          codigo:data.codigo,
          descripcion:data.descripcion,
          costo:data.costo,
          precio:data.precio,
          proveedor:data.proveedor,
          linea:data.linea,
          grupo:data.grupo,
          imagen:data.imagen,
          codigostock:data.codigostock,
          precio1:data.precio1,
          precio2:data.precio2,
          stockm:data.stockm,
          UM_ID:data.UM_ID,
          detalle:data.detalle,
          fecha_cad:data.fecha_cad,
        })
        setNimagen(data.imagen)

        let cli=cliente.filter(shopingfile => shopingfile.codigo === data.proveedor)        
        let lin=linea.filter(shopingfile => shopingfile.codigo === data.linea)
        let ct=categoria.filter(shopingfile => shopingfile.codigo === data.grupo)
        let um=umedida.filter(shopingfile => shopingfile.codigo === data.UM_ID)

        setProve({
          codigo:cli[0].codigo, 
          descripcion:cli[0].descripcion 
        })



        setLine({
          codigo:lin[0].codigo, 
          descripcion:lin[0].descripcion 
        })
        setCate({
          codigo:ct[0].codigo, 
          descripcion:ct[0].descripcion 
        })
        setUni({
          codigo:um[0].codigo, 
          descripcion:um[0].descripcion 
        })
        

       }  

       const deleteModal = (data) => {
            //alert(JSON.parse(data))
            console.log("esto tenemos acumualod en itemsfin")
            console.log(itemsini)
            console.log(data)
            console.log({...data, quantity: 1} )
            dispatch(
              addItemInCart({ ...data, quantity: 1 })
            );
            setDescripcion("")
            setisOpen(false)
            let categoryFilterValue="AALL CATEGORIAS";
            history.push(
              "/pos/?category=" +
              categoryFilterValue +
              "&term=" 
            
            )


            //dispatch(deleteCurrentArticulosql(id)) 
       }  

       const handleClose = () => {
        setisOpen(false)
       
       } 
       
      

       const   handleInputChange=(event)=>{
         setDatos({
           ...datos,
           [event.target.name]:event.target.value
         })
  
         
       }

       const handleChange = event => {
        setDatos({
          ...datos,
          [event.target.name]:parseFloat(event.target.value)
        })
      };

      const sendImage = (e) => {
          e.preventDefault()
          const form = new FormData()
          form.append('file',file,'form-data')
          console.log(form)
          axios
                .post(unidad+"/api/upload/", form)
                .then(function (response) {
                    setNimagen(ruta+response.data)
                  
                  })
                  .catch(function (error) {
          
                   // console.log(error);
                  }) 
        
      
        setFile("")  
       // setPathImage("http://adryan2.sytes.net:7002/upload.png")     

  }

  const onFileChange = (e) =>{
      if(e.target.files && e.target.files.length > 0) {
           const file = e.target.files[0]        
           if(file.type.includes("image")){
               const reader = new FileReader()
               reader.readAsDataURL(file)
               
               reader.onload = function load() {
                 //  setPathImage(reader.result)  

               }
               setFile(file)
            
            }
            else{
                console.log("ha ocurrido un error")
             
            }

      } 

  }


  const enviarDatos=(event) =>{
           event.preventDefault();     
           let id=datos.codigo    
            dispatch(updateCurrentArticulosql(id,datos,prove,line,cate,nimagen,uni))
            setProve({
              codigo:1, 
              descripcion: "Varios"
        
            });
            setLine({
              codigo:1,
              descripcion:"Marca"
            });
            setCate({
              codigo:1,
              descripcion:"Categoria"
            });
            setUni({
              codigo:1,
              descripcion:"UNI"
            });
            setNimagen(ruta+"upload.png")
            
            setDatos({
              costo:0,
              precio:0,
              precio1:0,
              precio2:0,
              stockm:0,
              
            })
            event.target.reset();
            setisOpen(false)  

}
        
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(data.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }

        //let data = informacion.filter(item => { 

        let filteredContacts = data.filter(

            
            (item) =>{

             //  console.log(item.descripcion.toLowerCase()+item.codigo.toLowerCase()).includes(search.toLowerCase())
              if (search && !(item.descripcion.toLowerCase()+item.codigo.toLowerCase()).includes(search.toLowerCase()))
                return false;

                return true;
        /*

                let poetName = task.codigo+task.descripcion.toUpperCase();
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

                */      
                } //FIN EDL FUNCION MAP
            
          );
          //settodosPerPage(filteredContacts.length)

          filteredContacts= sortByPrice(filteredContacts, "lh");



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
          let cabecera;
          if (filteredContacts === null ) {
            dashboardContent = (
              <TableRow >                       
                <TableCell >
                    <Spinner/>
                </TableCell>  
              </TableRow >
                
                );
                       
          } else {

             
          if (Object.keys(data).length > 0) {
            dashboardContent = (          
                    currentTodos.map(l1 => (

                      <TableRow key={l1.codigo} className={classes.tableBodyRow}>
                      
                               <TableCell className={classes.tableCell} >{l1.codigo}</TableCell>        
                               <TableCell className={classes.tableCell}>{l1.linea}</TableCell>        
                               <TableCell className={classes.tableCell}>{l1.descripcion}</TableCell>                         
                               <TableCell className={classes.tableCell}>{l1.costo}</TableCell> 
                               <TableCell className={classes.tableCell}>{l1.precio}</TableCell> 
                               <TableCell className={classes.tableCell}>{l1.precio1}</TableCell> 
                               <TableCell className={classes.tableCell}>{l1.precio2}</TableCell> 
                               <TableCell className={classes.tableCell}>{l1.id}</TableCell>                                
                               <TableCell className={classes.tableCell}>{l1.stockm}</TableCell> 
                               <TableCell className={classes.tableCell}>
                           <button type="button"  style={{ backgroundColor:"#00acc1"}} onClick={()=>deleteModal(l1)} ><AddCircleIcon  style={{color:"#fff"}} /></button>                          
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


            if (isOpen){

              edicion=(
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
                                                            <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Marca</TableCell>
                                                            <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Descripción</TableCell>                                                                                
                                                            <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Costo</TableCell>                                    
                                                            <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Precio</TableCell>
                                                            <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Prec.Dist</TableCell>
                                                            <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Prec.Mayor</TableCell>
                                                            <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>ID</TableCell>                                                                                
                                                            <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>UM_ID</TableCell>
                                                            

                                                            
                                                      </TableRow>                   
                                                    </TableHead>
                                                    
                                                    <TableBody>
                                                            {dashboardContent}
                                                    </TableBody>    
                                            </Table>
                                      </TableContainer>  
                             
                   
              
         </div>         

       </GridContainer>  )}

              

            

          }  //cierre deleslse

        

       
        return (
            
              <div>

              <TextField
                type="text"
                id="descripcion"
                
                value={descripcion}
                required
                name="descripcion"
                onChange={searchHandler}
                style={{ margin: 8,width:"95%"}}
                placeholder="Ingrese Codigo o Descripcion del Articulo"
                
                fullWidth
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />                    
                          
                            
                {edicion}
               <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                <CartDialog />       

                </GridItem>  
                <GridItem xs={12} sm={6} md={6}>
                 <ProductList />

                </GridItem>  
                </GridContainer>  





                          
                  </div>                           
                  

        )
   }
export default PosHooks

