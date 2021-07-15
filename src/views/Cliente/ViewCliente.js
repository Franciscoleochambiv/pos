import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import ReactPaginate from 'react-paginate';
import {
  getCurrentClientesql,deleteCurrentClientesql,updateCurrentClientesql  
} from "../../actions/clienteActions";
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
import MenuItem from '@material-ui/core/MenuItem';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';




//import TextField from '@material-ui/core/TextField';


import '../../views/CSS/data.css';


class ViewCliente extends Component {
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
      tipodoc:"C",
      titular:"",
      direccion:"",
      direccion2:"",
      direccion3:"",
      DI_Id:"1",
      nidentidad:'',
      email:"",
      telefono:"",
      fechaingreso:""
     
    };
    this.searchHandler=this.searchHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleModal= this.toggleModal.bind(this);   
    this.onChange = this.onChange.bind(this);    
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


 



  toggleModal = (id,cod,des,tipo,titu,dir,dir2,dir3,di_id,nidenti,email1,telef,fechai) => {

    //console.log(id,cod,des,tipo,titu,dir,dir2,dir3,di_id,nidenti,email1,telef,fechai)
    this.setState({
      isOpen: !this.state.isOpen,
      id_:id,
      codigo:cod,
      descripcion:des,
      tipodoc:tipo,
      titular:titu,
      direccion:dir,
      direccion2:dir2,
      direccion3:dir3,
      DI_Id:di_id,
      nidentidad:nidenti,
      email:email1,
      telefono:telef,
      fechaingreso:fechai

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
          tipodoc:this.state.tipodoc,
          titular:this.state.titular,
          direccion:this.state.direccion,
          direccion2:this.state.direccion2,
          direccion3:this.state.direccion3,
          DI_Id:this.state.DI_Id,
          nidentidad:this.state.nidentidad,
          email:this.state.email,
          telefono:this.state.telefono,
          fechaingreso:this.state.fechaingreso,
    
    };
    //console.log(tipoData);
    this.props.updateCurrentClientesql(this.state.codigo,tipoData);
    this.toggleModalfin();
    

    e.preventDefault();

   }


  onChange(e) {
   // console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value });
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
    this.props.deleteCurrentClientesql(id);
    }

 

  componentDidMount() {
     this.props.getCurrentClientesql();
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


                         
            const { clientefiles, loading } = this.props.clientefile;
            const { currentPage, todosPerPage } = this.state;
            const indexOfLastTodo = currentPage * todosPerPage;
            const indexOfFirstTodo = indexOfLastTodo - todosPerPage;            
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(clientefiles.length / todosPerPage); i++) {
              pageNumbers.push(i);
            }
            let filteredContacts = clientefiles.filter(
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
                                id="titular"
                                label="Titular"
                                name="titular"
                                required="true"

                                value={this.state.titular}
                                onChange={this.onChange}                 
                                
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

                              value={this.state.direccion}
                              onChange={this.onChange}                 


                              
                              style={{ margin: 8,width:"95%"}}
                              placeholder="Direccion Principal"
                              helperText="direccion"
                              fullWidth
                              margin="dense"
                              required="true"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              variant="outlined"
                            />
                            <TextField
                              id="direccion2"
                              label="Direccion2"
                              name="direccion2"

                              value={this.state.direccion2}
                              onChange={this.onChange}                 


                              
                              style={{ margin: 8,width:"95%"}}
                              placeholder="Direccion2"
                              helperText="Direccion 2"
                              required="true"
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

                              value={this.state.direccion3}
                              onChange={this.onChange}                 
                              
                              style={{ margin: 8,width:"95%"}}
                              placeholder="Direccion 3"
                              helperText="Direccion 3"
                              fullWidth
                              required="true"
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
                                
                                name="tipodoc"

                                value={this.state.tipodoc}
                                onChange={this.onChange}                 

                                
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
                                id="DI_Id"
                                select
                                label="Select"
                                
                                name="DI_Id"
                              

                                value={this.state.DI_Id}
                                onChange={this.onChange}                 


                                helperText="Seleccione un tipo de Documento"
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
                                id="nidentidad"                  

                                className={classes.textField}
                                helperText="Numero de Documento"
                                margin="dense"
                                variant="outlined"
                                required="true"
                                name="nidentidad"

                                value={this.state.nidentidad}
                                onChange={this.onChange}                 


                              
                              />     
                              <TextField
                                label="Telefono"
                                id="telefono"                  
                                className={classes.textField}
                                helperText="Numero de Telefono"
                                margin="dense"
                                variant="outlined"
                                name="telefono"
                                required="true"
                                value={this.state.telefono}
                                onChange={this.onChange}                 
                                
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
                                required="true"
                                value={this.state.email}
                                onChange={this.onChange}                 
                                
                              />   
                              <TextField
                              
                                type="date"
                                id="fechaingreso"                  
                                className={classes.textField}
                                helperText="Fecha"
                                margin="dense"
                                variant="outlined"
                                name="fechaingreso"
                                required="true"
                                value={this.state.fechaingreso}
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
            if (Object.keys(this.props.clientefile).length > 0) {
              dashboardContent = (          
              currentTodos.map(l1 => (
                 
                
                    <TableRow key={l1.codigo} className={classes.tableBodyRow}>
                       <TableCell className={classes.tableCell}>
                            <button type="button"  onClick={this.toggleModal.bind(this,l1.id,l1.codigo,l1.descripcion,l1.PVCL_Tipo,l1.PVCL_Titular,l1.PVCL_Direccion,l1.PVCL_Direccion2,l1.PVCL_Direccion3,l1.DI_Id,l1.PVCL_NroDocIdentidad,l1.PVCL_Email,l1.PVCL_Telefono,l1.PVCL_FecIngreso)}  ><EditIcon  color="primary" /></button>                                         
                       </TableCell>
                       <TableCell className={classes.tableCell}>
                            <button type="button"  onClick={this.onDeleteClick.bind(this,l1.codigo)} ><DeleteForeverIcon color="secondary"/></button>                          
                       </TableCell>
                       
                       <TableCell className={classes.tableCell}>{l1.codigo}</TableCell>        
                       <TableCell className={classes.tableCell}>{l1.descripcion}</TableCell>                         
                       <TableCell className={classes.tableCell}>{l1.PVCL_Tipo}</TableCell>        
                       <TableCell className={classes.tableCell}>{l1.PVCL_Titular}</TableCell>  
                       <TableCell className={classes.tableCell}>{l1.PVCL_Direccion}</TableCell> 
                       <TableCell className={classes.tableCell}>{l1.PVCL_Direccion2}</TableCell> 
                       <TableCell className={classes.tableCell}>{l1.PVCL_Direccion3}</TableCell> 
                       <TableCell className={classes.tableCell}>{l1.DI_Id}</TableCell> 
                       <TableCell className={classes.tableCell}>{l1.PVCL_NroDocIdentidad}</TableCell>        
                       <TableCell className={classes.tableCell}>{l1.PVCL_Email}</TableCell> 
                       <TableCell className={classes.tableCell}>{l1.PVCL_Telefono}</TableCell> 
                       <TableCell className={classes.tableCell}>{l1.PVCL_FecIngreso}</TableCell> 
                       
                      
                       
                       
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

      <GridItem xs={12} sm={12} md={12}>
        
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
           
      <GridItem xs={12} sm={12} md={12}>
     

      <Card style={{overflow: "auto"}}>
          
          <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>             
                    {edicion}
                    <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="customized table">    


                            <TableHead >
                                <TableRow className={classes.tableHeadRow}>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Modificaiones</TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Eliminaciones</TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Codigo</TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Razón Social</TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Tipo</TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Titular</TableCell>                                    
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Direccion</TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Direccion2</TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Direccion3</TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Ruc/Dni  </TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Numero</TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Correo</TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Telefono</TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Fecha</TableCell>

                                    
                               </TableRow>                   
                             </TableHead>
                            
                             <TableBody>
                                     {dashboardContent}
                             </TableBody>    
                             </Table>
               </TableContainer>         
                             


                </GridItem>
                <GridItem xs={12} sm={12} md={12}> 
                  {Pagination} 
                </GridItem>

            </GridContainer> 
        </CardBody>  
    </Card> 
      <Card>|
          <CardHeader color="info">            
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


ViewCliente.propTypes = {
  getCurrentClientesql : PropTypes.func.isRequired,
  deleteCurrentClientesql: PropTypes.func.isRequired,
  updateCurrentClientesql: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  clientefile: state.clientefile,  
  errors: state.errors
}
);

export default connect(mapStateToProps, { getCurrentClientesql ,deleteCurrentClientesql,updateCurrentClientesql })(
  ViewCliente
);

