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
    
const ViewArticuloHooks = () => {  

    const ruta="http://adryan2.sytes.net:7002/upload/";

    let unidad="https://adryan2.sytes.net:7001";
    const dispatch = useDispatch()
    const data = useSelector (store => store.articulofile.articulofiles) 

    const cliente = useSelector (store => store.clientefile.clientefiles)   
     const linea = useSelector (store => store.lineafile.lineafiles)   
     const categoria = useSelector (store => store.categoriafile.categoriafiles)   
     const umedida = useSelector (store => store.umedidafile.umedidafiles)   


    
    const [search, setsearch] = useState("")
    const [currentPage, setcurrentPage] = useState(1)
    const [todosPerPage, settodosPerPage] = useState(5)
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
            dispatch(getCurrentClientesql())
            dispatch(getCurrentLineasql())
            dispatch(getCurrentCategoriasql())
            dispatch(getCurrentUmedidasql())
           
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
            let id=data.codigo
            dispatch(deleteCurrentArticulosql(id)) 
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

        let filteredContacts = data.filter(
            (task) =>{
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
                       
          } else {

            if (isOpen){

              edicion=(

                   
                      
                    <Dialog
                        open={isOpen}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">{" Edición de Articulos"}</DialogTitle>
                        <DialogContent>
                         
                          <form onSubmit={enviarDatos}>
               
                                  <TextField
                                    type="text"
                                    label="Codigo"
                                    id="codigo"
                                    value={datos.codigo}                                 
                                    className={classes.textField}
                                    helperText="Codigo del Articulo"
                                    margin="dense"
                                    variant="outlined"
                                    name="codigo"    
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                                                      
                                    onChange={handleInputChange}
                                  
                                    
                                    
                                    />

                                  <TextField
                                    type="text"
                                    label="Codigo Stock"
                                    id="codigostock"   
                                    value={datos.codigostock}               
                                    className={classes.textField}
                                    helperText="Stock Minimo"
                                    margin="dense"
                                    variant="outlined"
                                    required
                                    name="codigostock"
                                    onChange={handleInputChange}
                                    inputProps={{ autoFocus: true }}
                                  />     


                                  <TextField
                                  type="text"
                                  id="descripcion"
                                  label="Descripción del Articulo"
                                  value={datos.descripcion}               
                                  required
                                  name="descripcion"
                                  onChange={handleInputChange}
                                  style={{ margin: 8,width:"95%"}}
                                  placeholder="Descripcion"
                                  helperText="Nombre de la Descripcion"
                                  fullWidth
                                  margin="dense"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  variant="outlined"
                                  />
                                  <TextField
                                  type="text" 
                                  id="imagen"
                                  label="Imagen"
                                  name="imagen"
                                  value={nimagen}               
                                  //value={nimagen}
                                  //value={file.name}
                                  required
                                  onChange={handleInputChange}
                                  style={{ margin: 8,width:"95%"}}
                                  placeholder="Imagen"
                                  helperText="Imagen"
                                  fullWidth
                                  margin="dense"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  variant="outlined"
                                  />
                                   <TextField
                                      type="file"
                                      id="imagen"
                                    
                                      
                                      className={classes.textField}
                                      
                                      margin="dense"
                                      variant="outlined"
                                      name="imagen"                  
                                    
                                      
                                      onChange={onFileChange}                      
                      
                                  />
                                  <Button 
                                size="sm"  
                                color="info"
                                onClick={sendImage}
                                
                                >
                                Subir Imagen
                              </Button>



                                    <TextField
                                  type="text" 
                                  id="detalle"
                                  label="Detlle"
                                  name="detalle"
                                  multiline
                                  rowsMax={3}
                                  value={datos.detalle}               
                                  onChange={handleInputChange}
                                  style={{ margin: 8,width:"95%"}}
                                  placeholder="Detalle"
                                  helperText="detalle"
                                  fullWidth
                                  margin="dense"
                                  required
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  variant="outlined"
                                  />

                                  <TextField
                                  type="text" 
                                  value={datos.costo.toFixed(2)}

                                  id="costo"
                                  label="Costo"
                                  name="costo"
                                  onChange={handleChange}               
                                  placeholder="Costo"
                                  helperText="Costo"
                                  required
                                  className={classes.textField}                
                                  margin="dense"


                                  InputProps={{
                                    inputComponent: NumberFormatCustom
                                  }}

                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  variant="outlined"
                                  />
                                  <TextField
                                    type="text" 
                                    value={datos.precio.toFixed(2)}
                                  id="precio"
                                  label="Precio"
                                  name="precio"
                                  onChange={handleChange}
                                  className={classes.textField}                
                                  placeholder="Precio"
                                  helperText="Precio"                
                                  required
                                  margin="dense"
                                  InputProps={{
                                    inputComponent: NumberFormatCustom
                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  variant="outlined"
                                  />

                                  <TextField
                                  type="text" 
                                  id="precio1"
                                  value={datos.precio1.toFixed(2)}
                                  label="Precio Distribuidor"
                                  name="precio1"
                                  className={classes.textField}                
                                  onChange={handleChange}                
                                  placeholder="Precio Distribuidor"
                                  helperText="Precio Distribuidor"                
                                  required
                                  margin="dense"
                                  InputProps={{
                                    inputComponent: NumberFormatCustom
                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  variant="outlined"
                                  />

                                  <TextField
                                  type="text" 
                                  id="precio2"
                                  value={datos.precio2.toFixed(2)}
                                  label="Precio x Mayor"
                                  name="precio2"
                                  className={classes.textField}                
                                  onChange={handleChange}                
                                  placeholder="Precio Mayor"
                                  helperText="Precio Mayor"                
                                  required
                                  margin="dense"
                                  InputProps={{
                                    inputComponent: NumberFormatCustom
                                  }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  variant="outlined"
                                  />


                                  <TextField
                                    type="text" 
                                    label="Stock Minimo"
                                    id="stockm"                  
                                    value={datos.stockm.toFixed(2)}
                                    className={classes.textField}
                                    helperText="Stock Minimo"
                                    margin="dense"
                                    variant="outlined"
                                    required
                                    name="stockm"
                                    onChange={handleChange}
                                    InputProps={{
                                      inputComponent: NumberFormatCustom
                                    }}
                                  />   
                                    


                                    <TextField

                                    type="date"
                                    id="fecha_cad"                  
                                    className={classes.textField}
                                    helperText="Fecha"
                                    margin="dense"
                                    variant="outlined"
                                    name="fecha_cad"
                                    required
                                    onChange={handleInputChange}
                                  /> 

                                   <Autocomplete
                                    id="prove"
                                    options={cliente}
                                    name="prove"
                                    
                                    freeSolo      
                                    value={prove}
                                    onChange={(event, newValue) => {
                                      setProve(newValue);
                                    }}      
                                    //getOptionSelected={(option, value) => option.descripcion === value.descripcion}      
                                    getOptionLabel={(option) => option.descripcion}
                                    //getOptionLabel={option => option.descripcion?option.descripcion:option}
                                    style={{ width:"95%" }}
                                    renderInput={(params) => <TextField {...params}    className={classes.textField} margin="dense" label="Cliente Proveedor" variant="outlined" />}
                                    />


                                    <Autocomplete
                                      id="line"
                                      options={linea}
                                      name="line"
                                      freeSolo      
                                      value={line}
                                      onChange={(event, newValue) => {
                                        setLine(newValue);
                                      }}      
                                      //getOptionSelected={(option, value) => option.descripcion === value.descripcion}      
                                      getOptionLabel={(option) => option.descripcion}
                                      style={{ width:"95%" }}
                                      renderInput={(params) => <TextField {...params}    className={classes.textField} margin="dense" label="Lineas /Marcas" variant="outlined" />}
                                      />
                                      <Autocomplete
                                      id="cate"
                                      options={categoria}
                                      name="cate"
                                      freeSolo      
                                      value={cate}
                                      onChange={(event, newValue) => {
                                        setCate(newValue);
                                      }}      
                                    // getOptionSelected={(option, value) => option.descripcion === value.descripcion}      
                                      getOptionLabel={(option) => option.descripcion}
                                      style={{ width:"95%" }}
                                      renderInput={(params) => <TextField {...params}    className={classes.textField} margin="dense" label="Categorias" variant="outlined" />}
                                      />  


                                  <Button color="primary" type="submit" >Grabar</Button>
                                  <Button color="primary" type="button"  onClick={handleClose} >Cancelar</Button>
                                  

                                  </form> 




                        </DialogContent>
                    </Dialog>
                      

              )
              

            }


            

          }  

         
          if (Object.keys(data).length > 0) {
            dashboardContent = (          
                    currentTodos.map(l1 => (

                      <TableRow key={l1.codigo} className={classes.tableBodyRow}>
                      <TableCell className={classes.tableCell}>
                           <button type="button"  onClick={()=>toggleModal(l1)}  ><EditIcon  color="primary" /></button>                                         

                      </TableCell>
                      <TableCell className={classes.tableCell}>
                           <button type="button"  onClick={()=>deleteModal(l1)} ><DeleteForeverIcon color="secondary"/></button>                          
                      </TableCell>
                      
                               <TableCell className={classes.tableCell}>{l1.codigo}</TableCell>        
                               <TableCell className={classes.tableCell}>{l1.codigostock}</TableCell>        
                               <TableCell className={classes.tableCell}>{l1.descripcion}</TableCell>                         
                               <TableCell className={classes.tableCell}>{l1.imagen}</TableCell>        
                               
                               <TableCell className={classes.tableCell}>{l1.costo}</TableCell> 
                               <TableCell className={classes.tableCell}>{l1.precio}</TableCell> 
                               <TableCell className={classes.tableCell}>{l1.precio1}</TableCell> 
                               <TableCell className={classes.tableCell}>{l1.precio2}</TableCell> 
                               <TableCell className={classes.tableCell}>{l1.proveedor}</TableCell> 
                               <TableCell className={classes.tableCell}>{l1.linea}</TableCell>        
                               <TableCell className={classes.tableCell}>{l1.grupo}</TableCell> 
                               <TableCell className={classes.tableCell}>{l1.stockm}</TableCell> 
                               <TableCell className={classes.tableCell}>{l1.UM_ID}</TableCell> 
                               <TableCell className={classes.tableCell}>{l1.fecha_cad}</TableCell> 
                               
                     
                      
                      
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
                            <Input type ="text"  name="buscar" className="form-control" placeholder="Ingrese cadena A Buscar" onChange={searchHandler} value={search}  />                         

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
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Modificaiones</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Eliminaciones</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Codigo</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Cod Stock</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Descripción</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Imagen</TableCell>                                    
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Costo</TableCell>                                    
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Precio</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Prec.Dist</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Prec.Mayor</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Proveedor</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Categoria</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Marca</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Stockm</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>UM_ID</TableCell>
                                                                                <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Fecha</TableCell>

                                                                                
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
export default ViewArticuloHooks

