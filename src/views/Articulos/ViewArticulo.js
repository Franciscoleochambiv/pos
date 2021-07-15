import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import ReactPaginate from 'react-paginate';
import {
  getCurrentArticulosql,deleteCurrentArticulosql,updateCurrentArticulosql
} from "../../actions/articuloActions";
import { getCurrentUmedidasql } from "../../actions/umedidaActions";

import { Autocomplete } from '@material-ui/lab';


//import { getCurrentLineasql } from "../../actions/lineaActions";


import Spinner from "../../components/common/Spinner";
//import Modal from '../../components/Modal/Modal.js';
import Button from "../../components/CustomButtons/Button.js";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
//import CardFooter from "../../components/Card/CardFooter.js";
import CardBody from "../../components/Card/CardBody.js";
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
//import SaveIcon from '@material-ui/icons/Save';
//import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';



import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NumberFormat from "react-number-format";
//import { getCurrentUmedidasql } from "../../actions/umedidaActions";






//import TextField from '@material-ui/core/TextField';


import '../../views/CSS/data.css';


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
      // isNumericString
    />
  );
}


class ViewArticulo extends Component {
  constructor(){
    super();
    this.state={
      tipoData:[],
      id:"",
      name:"",
      category:"",
      price:"",
      
      open:true,
      popular:"",
      imageUrls:"",
      id_:"",      
      search:'',
      currentPage: 1,
      todosPerPage:5,
      selectedPage: 1,    
      isOpen: false,
      costo:0,
      precio:0,
      proveedor:'',
      linea:'',
      grupo:'',
      imagen:'',
      codigostock:'',
      precio1:0,
      precio2:0,
      stockm:0,
      UM_ID:"1",
      detalle:'',
      fecha_cad:'',
      file:"",
      PathImage:"",
      
     
    };
    this.searchHandler=this.searchHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleModal= this.toggleModal.bind(this);   
    this.onChange = this.onChange.bind(this);    
    this.handleChange1 = this.handleChange1.bind(this);    

    this.sendImage = this.sendImage.bind(this);    
    this.onFileChange = this.onFileChange.bind(this);    
    //this.load20 = this.load20.bind(this);    

    this.onSubmit = this.onSubmit.bind(this);
    this.seleccion = this.seleccion.bind(this);
    this.ordenac = this.ordenac.bind(this);
  }
  

   handleClickOpen = () => {
    this.setState({
      open:true
    })
    
  };

  handleClose = () => {
    this.setState({
      open:false
    })
    
  };

 
 



  toggleModal = (id,cod,des,cos,pre,prov,line,grup,ima,cstock,pre1,pre2,stcm,unim,deta,fechad) => {

    //console.log(id,cod,des,tipo,titu,dir,dir2,dir3,di_id,nidenti,email1,telef,fechai)
    this.setState({
      isOpen: !this.state.isOpen,
      id_:id,
      codigo:cod,
      descripcion:des,
      costo:cos,
      precio:pre,
      proveedor:prov,
      linea:line,
      grupo:grup,
      imagen:ima,
      codigostock:cstock,
      precio1:pre1,
      precio2:pre2,
      stockm:stcm,
      UM_ID:unim,
      detalle:deta,
      fecha_cad:fechad,

    }); 
   }   
 
   toggleModalfin = () => {
     this.setState({
       isOpen: !this.state.isOpen      
     });
   }

   onSubmit(e) {
     //alert("eventio sad")
     
    
    const tipoData = {
          codigo:this.state.codigo,
          descripcion:this.state.descripcion,
          costo:this.state.costo,
          precio:this.state.precio,
          proveedor:this.state.proveedor,
          linea:this.state.linea,
          grupo:this.state.grupo,
          imagen:this.state.imagen,
          codigostock:this.state.codigostock,
          precio1:this.state.precio1,
          precio2:this.state.precio2,
          stockm:this.state.stockm,
          UM_ID:this.state.UM_ID,
          detalle:this.state.detalle,
          fecha_cad:this.state.fecha_cad,              
    
    };
    //console.log(tipoData);
    this.props.updateCurrentArticulosql(this.state.codigo,tipoData);
    this.toggleModalfin();
    

    e.preventDefault();

   }



   sendImage(e) {
        e.preventDefault()
        let ruta="http://adryan2.sytes.net:7002/upload/";
        let unidad="https://adryan2.sytes.net:7001";
       console.log("estot en el actions")  
       const form = new FormData()
      form.append('file',this.state.file,'form-data')
      console.log(form)
      axios
            .post(unidad+"/api/upload/", form)
            .then( this.response =  e =>{

                //console.log(response);

               this.setState({ imagen:ruta+e.data })
               console.log(this.state.imagen)
                
                //setNimagen(ruta+response.data)
                
        
              
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              }) 


    this.setState({ 
      file:"",
      PathImage :"http://adryan2.sytes.net:7002/upload/upload.png"    
    });
    //setFile("")  
   // setPathImage("http://adryan2.sytes.net:7002/upload.png")     

}

 onFileChange(e) {
  if(e.target.files && e.target.files.length > 0) {
       const file = e.target.files[0]        
       if(file.type.includes("image")){
           const reader = new FileReader()
           reader.readAsDataURL(file)
           
           reader.onload = function load20() {
             //   this.setState({ PathImage:reader.result });

    //           setPathImage(reader.result)  

           }
           
           this.setState({ file:file });
           //setFile(file)

        }
        else{
            console.log("ha ocurrido un error")
         
        }
  } 

}


  onChange(e) {
   // console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange1(e) {
    // console.log(e.target.value)
 //    this.setState({ [e.target.name]: e.target.value });
     this.setState({ [e.target.name]: parseFloat(e.target.value) });    
   }


 

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }


  handlePageClicked = data => {
    let selected = data.selected;
    this.setState({
      selectedPage: selected,
      currentPage: Number(selected+1)
    })
  };

  
  seleccion(event) {
    event.preventDefault();
    let op =event.target.value;
    this.setState({todosPerPage: op});
  };


  ordenac(columna) {
    let oc =columna;
    alert(oc);
  
  }; 


  searchHandler(event){
    const lolo = event.target.value.toUpperCase();
    this.setState({search: lolo});
    this.setState({
      selectedPage: 1,
     currentPage: Number(1)
    })
   }
  
   handleChange(e){
     const {name,value}= e.target;
     this.setState({
       [name]:value
     })
   }

  onDeleteClick(id) {
    this.props.deleteCurrentArticulosql(id);
    }

 

  componentDidMount() {
    const {
      getCurrentArticulosql,
      getCurrentUmedidasql
    } = this.props;
     getCurrentArticulosql();
     getCurrentUmedidasql();
    
    // this.props.getCurrentArticulosql();
     //this.props.lolo();
    //this.props.getCurrentUmedidasql();
     
    }


  render() {

    
    
    //const useStyles = makeStyles(styles);
    const useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
      root: {
        '& .MuiTextField-root': {
          
          width: '25ch',
        },
      },  
    });    
    const classes = useStyles;


                            
            const { articulofiles, loading } = this.props.articulofile;

            //const { umedidafiles } = this.props.umedida;
            

            const { currentPage, todosPerPage } = this.state;
            const indexOfLastTodo = currentPage * todosPerPage;
            const indexOfFirstTodo = indexOfLastTodo - todosPerPage;            
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(articulofiles.length / todosPerPage); i++) {
              pageNumbers.push(i);
            }
            let filteredContacts = articulofiles.filter(
              (task) =>{
                  let poetName = (task.codigo.toString()).toUpperCase()+task.descripcion.toUpperCase();
                  let separador=" "; 
                  let i;
                  let poetName1=this.state.search.split(separador);
                  let tpalabras=poetName1.length;    
                  let datopa;  
                  if (tpalabras>3){
                      return  poetName.indexOf(this.state.search) !== -1;    

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
                onPageChange={this.handlePageClicked}
                containerClassName={'react-paginate ul'}
                subContainerClassName={'react-paginate li'}
                activeClassName={'active'}
        

                
                />      
               )

            const currentTodos = filteredContacts.slice(indexOfFirstTodo, indexOfLastTodo);
            let dashboardContent;
            let edicion;          
            if (filteredContacts === null || loading) {
              dashboardContent = (
                <TableRow >                       
                  <TableCell >
                      <Spinner/>
                  </TableCell>  
                </TableRow >
                  
                  );
            } else {              
               if (this.state.isOpen){
                  
                  edicion =(
                    
                   <div >  

                   <form  className={classes.root}  >    
                     
                    <Dialog
                        open={this.state.isOpen}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">{" Edición de Clientes"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">

                          
                          

                            <TextField
                              label="Codigo"
                              id="codigo"
                              value={this.state.codigo}                                                              
                              className={classes.textField}
                              helperText="Codigo del Cliente o Proveedor"
                              margin="dense"
                              variant="outlined"
                              name="codigo"                  
                              required="true"                                    
                              inputProps={{ autoFocus: true }}                        
                              
                            />
                              <TextField
                              label="Codigo Stock"
                              id="codigostock"
                              value={this.state.codigostock}                                                              
                              className={classes.textField}
                              helperText="Codigo de Stock"
                              margin="dense"
                              variant="outlined"
                              name="codigostock"                  
                              required="true"                                    
                              inputProps={{ autoFocus: true }}                        
                              
                            />
                
                              <TextField
                                id="descripcion"
                                label="Razón Social"
                                required="true"
                                name="descripcion"

                                value={this.state.descripcion}
                                onChange={this.onChange}                 
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
                                id="imagen"
                                label="Imagen"
                                name="imagen"
                                required="true"

                                value={this.state.imagen}
                                onChange={this.onChange}                 
                                
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
                              
                                
                                onChange={this.onFileChange}
                                
                                
                              />
                              <Button 
                                size="sm"  
                                color="info"
                                onClick={this.sendImage}
                                
                                >
                                Subir Imagen
                              </Button>


      
      
                    
                              <TextField
                              id="detalle"
                              label="Detalle"
                              name="detalle"

                              value={this.state.detalle}
                              onChange={this.onChange}                 


                              
                              style={{ margin: 8,width:"95%"}}
                              placeholder="Detalle"
                              helperText="detalle"
                              fullWidth
                              margin="dense"
                              required="true"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                            />

                                                             

                              <TextField
                                label="Costo"
                                id="costo"                  
                                className={classes.textField}
                                helperText="Costo"
                                margin="dense"
                                variant="outlined"
                                name="costo"
                                required="true"
                                value={this.state.costo.toFixed(2)}
                                onChange={this.handleChange1}  
                                InputProps={{
                                  inputComponent: NumberFormatCustom
                                }}               
                                
                              /> 

                              <TextField
                                label="Precio"
                                id="precio"                  
                                className={classes.textField}
                                helperText="Precio"
                                margin="dense"
                                variant="outlined"
                                name="precio"
                                required="true"
                                value={this.state.precio.toFixed(2)}
                                onChange={this.handleChange1} 
                                InputProps={{
                                  inputComponent: NumberFormatCustom
                                }}                     

                                
                              /> 

                            <TextField
                                label="Precio Dist"
                                id="precio1"                  
                                className={classes.textField}
                                helperText="Precio D"
                                margin="dense"
                                variant="outlined"
                                name="precio1"
                                required="true"
                                value={this.state.precio1.toFixed(2)}
                                onChange={this.handleChange1} 
                                
                                InputProps={{
                                  inputComponent: NumberFormatCustom
                                }}     
                                
                              /> 
                              <TextField
                                label="Precio May"
                                id="precio2"                  
                                className={classes.textField}
                                helperText="Precio M"
                                margin="dense"
                                variant="outlined"
                                name="precio2"
                                required="true"
                                value={this.state.precio2.toFixed(2)}
                                
                                onChange={this.handleChange1} 
                                InputProps={{
                                  inputComponent: NumberFormatCustom
                                }}     
                                
                              /> 


                              <TextField
                                label="stockm"
                                id="stockm"                  
                                className={classes.textField}
                                helperText="Stock Minimo"
                                margin="dense"
                                variant="outlined"
                                name="stockm"
                                required="true"
                                value={this.state.stockm.toFixed(2)}
                                onChange={this.handleChange1} 
                                
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
                                required="true"
                                value={this.state.fecha_cad}
                                onChange={this.onChange}                 
                                
                                />

                               





                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>


                          <Button onClick={this.onSubmit} color="info">
                              Grabar
                          </Button>
                          
                          <Button onClick={() => this.setState({isOpen:false})} color="info" autoFocus>
                            Cancelar
                          </Button>
                        </DialogActions>
                      </Dialog>
                                      
                      </form> 
                      
                      
                 
                 </div>
                         );


                }                
            if (Object.keys(this.props.articulofile).length > 0) {
              dashboardContent = (          
              currentTodos.map(l1 => (
                 
                
                    <TableRow key={l1.codigo} className={classes.tableBodyRow}>
                       <TableCell className={classes.tableCell}>
                            <button type="button"  onClick={this.toggleModal.bind(this,l1.id,l1.codigo,l1.descripcion,l1.costo,l1.precio,l1.proveedor,l1.linea,l1.grupo,l1.imagen,l1.codigostock,l1.precio1,l1.precio2,l1.stockm,l1.UM_ID,l1.detalle,l1.fecha_cad)}  ><EditIcon  color="primary" /></button>                                         

                       </TableCell>
                       <TableCell className={classes.tableCell}>
                            <button type="button"  onClick={this.onDeleteClick.bind(this,l1.codigo)} ><DeleteForeverIcon color="secondary"/></button>                          
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
                        <div>
                          <p className="lead text-muted">Bienvenido </p>
                          <p>Aún no ha configurado un perfil, por favor agregue alguna información.</p>                  
                        </div>
                  );         
                }      
       } //FIN DEL RENDER
    return (

      <GridItem xs={12} sm={6} md={12}>
        
               <select  className="form-control" style={{"colo":"red"}}  value={this.todosPerPage} onChange={this.seleccion}>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <option  style={{"colo":"red"}}value="5">
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
                <Input type ="text"  name="buscar" className="form-control" placeholder="Ingrese cadena A Buscar" onChange={this.searchHandler} value={this.state.search}  /> 
  
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
                  <Card>
                      <CardHeader color="primary">            
                        <p className={classes.cardCategoryWhite}>           
                        Numero de Coincidencias encontradas {filteredContacts.length}
                        </p>
                    </CardHeader> 
                    
                    
                  </Card> 

      


            </GridItem>   


     
    </GridContainer>  
    </GridItem> 
 
   
    );
  }
}


ViewArticulo.propTypes = {
  getCurrentArticulosql : PropTypes.func.isRequired,
  deleteCurrentArticulosql: PropTypes.func.isRequired,
  updateCurrentArticulosql: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  articulofile: state.articulofile,  
  errors: state.errors
}
);

export default connect(mapStateToProps, { getCurrentArticulosql ,deleteCurrentArticulosql,updateCurrentArticulosql })(
  ViewArticulo
);

