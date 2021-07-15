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
  getCurrentAlmacensql,deleteCurrentAlmacensql,updateCurrentAlmacensql  
} from "../../actions/almacenActions";
import Spinner from "../../components/common/Spinner";
//import Modal from '../../components/Modal/Modal.js';
import Button from "../../components/CustomButtons/Button.js";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';


//import TextField from '@material-ui/core/TextField';


import '../../views/CSS/data.css';


class ViewAlmacen extends Component {
  constructor(){
    super();
    this.state={
      tipoData:[],
      id:"",
      name:"",
      category:"",
      price:"",
      description:"",
      direccion:"",
      provincia:"",
      ciudad:"",
      distrito:"",
      tel:"",
      empresa:"",

      popular:"",
      imageUrls:"",
      id_:"",      
      search:'',
      currentPage: 1,
      todosPerPage:5,
      selectedPage: 1,    
      isOpen: false   
     
    };
    this.searchHandler=this.searchHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleModal= this.toggleModal.bind(this);   
    this.onChange = this.onChange.bind(this);    
    this.onSubmit = this.onSubmit.bind(this);
    this.seleccion = this.seleccion.bind(this);
    this.ordenac = this.ordenac.bind(this);
  }
  

  toggleModal = (id,cod,des,dir,prov,ciu,distri,tele,empre) => {
    this.setState({
      isOpen: !this.state.isOpen,
      id_:id,
      codigo:cod,
      descripcion:des,
      direccion:dir,
      provincia:prov,
      ciudad:ciu,
      distrito:distri,
      tel:tele,
      empresa:empre

    }); 
   }   
 
   toggleModalfin = () => {
     this.setState({
       isOpen: !this.state.isOpen      
     });
   }

   onSubmit(e) {
    e.preventDefault();
    const tipoData = {
      descripcion: this.state.descripcion,
      codigo: this.state.codigo,
      direccion:this.state.direccion,
      provincia:this.state.provincia,
      ciudad:this.state.ciudad,
      distrito:this.state.distrito,
      tel:this.state.tel,
      empresa:this.state.empresa,
    
    };
    this.props.updateCurrentAlmacensql(this.state.codigo,tipoData);
    this.toggleModalfin();

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
    this.props.deleteCurrentAlmacensql(id);
    }

 

  componentDidMount() {
     this.props.getCurrentAlmacensql();
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
                         
            const { almacenfiles, loading } = this.props.almacenfile;
            const { currentPage, todosPerPage } = this.state;
            const indexOfLastTodo = currentPage * todosPerPage;
            const indexOfFirstTodo = indexOfLastTodo - todosPerPage;            
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(almacenfiles.length / todosPerPage); i++) {
              pageNumbers.push(i);
            }
            let filteredContacts = almacenfiles.filter(
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
                     
                    
                      
                     <Card >                   
                       <CardHeader color="primary">
                          
                          <h4 className={classes.cardTitleWhite}>Edicion Almacen</h4>
                          

                        <form  className={classes.root}  onSubmit={this.onSubmit}>  
                        <CardBody>
                            
                      


                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={12} lg={10}>
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={3}>
                                  <label >Codigo</label>
                                  <input className="p-inputtext p-component"
                                    placeholder="id "
                                    value={this.state.codigo}
                                    name="codigo"
                                    onChange={this.onChange}                                  
                                  /> 
                                
                              </GridItem>
                              <GridItem xs={12} sm={12} md={3}>
                                  <label >Empresa</label>
                                  <input className="p-inputtext p-component"
                                        name="empresa"
                                        placeholder="Empresa"
                                        value={this.state.empresa}
                                        onChange={this.onChange} 
                                      
                                   />

                              
                              </GridItem>
                              <GridItem xs={12} sm={12} md={3}>
                                  <label >Descripcion</label>
                                  <input className="p-inputtext p-component"
                                      name="descripcion"
                                      placeholder="Descripcion"
                                      value={this.state.descripcion}
                                      onChange={this.onChange} 
                                   />

                                
                                
                              </GridItem>

                              <GridItem xs={12} sm={12} md={3}>
                                    <label >Dirección</label>
                                               <input className="p-inputtext p-component"
                                                name="direccion"
                                                placeholder="Direccion"
                                                value={this.state.direccion}
                                                onChange={this.onChange} 
                                               />                                  
                                
                              </GridItem>
                              
                            </GridContainer>
                          </GridItem>
                        

                        <GridItem xs={12} sm={12} md={12} lg={10}>
                            <GridContainer>
                            <GridItem xs={12} sm={12} md={3}>
                                    <label >Provincia</label>
                                               <input className="p-inputtext p-component"
                                                name="provincia"
                                                placeholder="provincia"
                                                value={this.state.provincia}
                                                onChange={this.onChange} 
                                               />                                  
                                
                              </GridItem>
                              <GridItem xs={12} sm={12} md={3}>
                                  <label >Ciudad</label>
                                  <input className="p-inputtext p-component"
                                     name="ciudad"
                                     placeholder="Ciudad"
                                     value={this.state.ciudad}
                                     onChange={this.onChange} 
                                   />

                              </GridItem>
                              <GridItem xs={12} sm={12} md={3}>
                                  <label >Distrito</label>
                                  <input className="p-inputtext p-component"
                                     name="distrito"
                                     placeholder="Distrito"
                                     value={this.state.distrito}
                                     onChange={this.onChange} 
                                   />

                              </GridItem>

                              <GridItem xs={12} sm={12} md={3}>
                                  <label >Telefono</label>
                                  <input className="p-inputtext p-component"
                                     name="telefono"
                                     placeholder="Telefono"
                                     value={this.state.tel}
                                     onChange={this.onChange} 
                                   />

                              </GridItem>

                       </GridContainer>
                        </GridItem> 

                       

                        <GridItem xs={12} sm={12} md={12} lg={10}>
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={12}>                                                                           
                                      <Button color="white" type="submit" ><SaveIcon color="primary"/></Button>
                                      <Button color="white" type="button" onClick={() => this.setState({isOpen:false})} ><CancelIcon color="secondary"/></Button>
                                       
                                </GridItem>
                               </GridContainer>
                        </GridItem> 

                              </GridContainer>     
                        </CardBody>      
                        </form>  
                        </CardHeader>                          										 
                      </Card> 
                    
                 
                 </div>
                         );
                }                
            if (Object.keys(this.props.almacenfile).length > 0) {
              dashboardContent = (          
              currentTodos.map(l1 => (
                 
                
                    <TableRow key={l1.codigo} className={classes.tableBodyRow}>
                       
                       <TableCell className={classes.tableCell}>{l1.codigo}</TableCell>        
                       <TableCell className={classes.tableCell}>{l1.descripcion}</TableCell>        
                       <TableCell className={classes.tableCell}>{l1.direccion}</TableCell>        
                       <TableCell className={classes.tableCell}>{l1.provincia}</TableCell>        
                       <TableCell className={classes.tableCell}>{l1.ciudad}</TableCell>        
                       <TableCell className={classes.tableCell}>{l1.distrito}</TableCell>        
                       <TableCell className={classes.tableCell}>{l1.tel}</TableCell>        
                       
                       <TableCell className={classes.tableCell}>
                            <button type="button"  onClick={this.toggleModal.bind(this,l1.id,l1.codigo,l1.descripcion,l1.direccion,l1.provincia,l1.ciudad,l1.distrito,l1.tel,l1.empresa)}  ><EditIcon  color="primary" /></button>                                         
                       </TableCell>
                       <TableCell className={classes.tableCell}>
                            <button type="button"  onClick={this.onDeleteClick.bind(this,l1.codigo)} ><DeleteForeverIcon color="secondary"/></button>                          
                       </TableCell>
                       
                       
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
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Codigo</TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Descripcion</TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Direccion</TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Provincia</TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Ciudad</TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Distrito</TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Telf</TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Modificaiones</TableCell>
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell}>Eliminaciones</TableCell>
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


ViewAlmacen.propTypes = {
  getCurrentAlmacensql : PropTypes.func.isRequired,
  deleteCurrentAlmacensql: PropTypes.func.isRequired,
  updateCurrentAlmacensql: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  almacenfile: state.almacenfile,  
  errors: state.errors
}
);

export default connect(mapStateToProps, { getCurrentAlmacensql ,deleteCurrentAlmacensql,updateCurrentAlmacensql })(
  ViewAlmacen
);

