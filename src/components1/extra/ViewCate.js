import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentCategoria,deleteCurrentCategoria,updateCurrentCategoria  
} from "../../actions/categoriaActions";
import Spinner from "../common/Spinner.js";
import { Modal } from 'react-materialize';
import ReactPaginate from 'react-paginate';
import './data.css';

class ViewCate extends Component {
  constructor(){
    super();
    this.state={
      tipoData:[],
      id:"",
      name:"",
      category:"",
      price:"",
      description:"",
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
  

  toggleModal = (id,cod,des) => {
    this.setState({
      isOpen: !this.state.isOpen,
      id_:id,
      codigo:cod,
      descripcion:des      
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
    
    };
    this.props.updateCurrentCategoria(this.state.id_,tipoData);
    this.toggleModalfin();

   }


  onChange(e) {
    console.log(e.target.value)
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
    this.props.deleteCurrentCategoria(id);
    }

 

  componentDidMount() {
     this.props.getCurrentCategoria();
    }


  render() {
                         
            const { categoriafiles, loading } = this.props.categoriafile;
            const { currentPage, todosPerPage } = this.state;
            const indexOfLastTodo = currentPage * todosPerPage;
            const indexOfFirstTodo = indexOfLastTodo - todosPerPage;            
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(categoriafiles.length / todosPerPage); i++) {
              pageNumbers.push(i);
            }
            let filteredContacts = categoriafiles.filter(
              (task) =>{
                  let poetName = task.codigo.toUpperCase()+task.descripcion.toUpperCase();
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
                containerClassName={'pagination pagination justify-content-center ' }
                subContainerClassName={' page-item page-link badge badge-primary'}
                activeClassName={'active'}                
                />      
               )

            const currentTodos = filteredContacts.slice(indexOfFirstTodo, indexOfLastTodo);
            let dashboardContent;
            let edicion;          
            if (filteredContacts === null || loading) {
              dashboardContent = <Spinner/>;
            } else {              
               if (this.state.isOpen){
                  edicion =(
                   <div >                     
                    <Modal                         
                        bottomSheet={false}
                        fixedFooter={false}
                        header="Edicion Categorias"
                        id="Modal-0"
                        open={this.state.isOpen} 
                        className="modal"
                        //"modal fade modal-dialog modal-sm"                       
                        options={{
                           dismissible: true,
                          endingTop: '15%',
                          inDuration: 250,
                          onCloseEnd: null,
                          onCloseStart: null,
                          onOpenEnd: null,
                          onOpenStart: null,
                          opacity: 0.5,
                          outDuration: 250,
                          preventScrolling: false,
                          startingTop: '4%'                        
                        }}                           
                    >
                   <div  className="card" style={{ width: "25rem" }}>
                      <form  onSubmit={this.onSubmit}   >  
                          <div className="p-col-12 p-lg-12">                
                              <div className="p-grid">
                                  <div className="p-col-12 p-md-6">
                                      <label for="codigo">Codigo</label>
                                       <input className="p-inputtext p-component"
                                          placeholder="id "
                                          value={this.state.codigo}
                                          name="codigo"
                                          onChange={this.onChange}                                  
                                       />                                
                                  </div>  
                                  <div className="p-col-12 p-md-6">
                                      <label for="descripcion">Descripcion</label>
                                      <input className="p-inputtext p-component"
                                          name="descripcion"
                                          placeholder="name"
                                          value={this.state.descripcion}
                                          onChange={this.onChange}                                                                                
                                       />
                                  </div>                            
                               </div>  
                                           
                          </div> 
                          <div className="p-col-12 p-nogutter">
                              <div className="p-grid">                       
                                  <div className="p-col-12 p-lg-12">                                              
                                      <div className="p-grid">
                                          <div className="p-col-12 p-md-6" style={{textAlign:'center'}}>
                                              <button  type="submit"  label="Grabar  " style={{marginBottom:'10px'}} className= "btn btn-info  mt-4 01579b light-blue darken-2">Editar</button>                                                               
                                              <button  type="button"  label="Cancelar" style={{marginBottom:'10px'}} className="btn btn-danger  mt-4 01579b red darken-2" onClick={() => this.setState({isOpen:false})}>Cancel</button>                                                                                                                       
                                          </div>                                                                                                                
                                        </div>     
                                   </div>                                                 
                              </div>  
                          </div>  
                      </form>
                    </div>                 
                  </Modal>
                </div>
                  );
                }                
            if (Object.keys(this.props.categoriafile).length > 0) {
              dashboardContent = (          
              currentTodos.map(l1 => (
                       <tr  key={l1._id}>            
                          <td className="p-col-12 p-md-6">{l1.codigo}</td>
                          <td className="p-col-12 p-md-6">{l1.descripcion}</td>                                    
                          <td>                                       
                              <button type="button"  onClick={this.toggleModal.bind(this,l1._id,l1.codigo,l1.descripcion)} className="btn btn-primary  01579b light-blue darken-2"  >Editar</button>                                         
                          </td>
                          <td>    
                              <button type="button" className="btn btn-danger   01579b red darken-2" onClick={this.onDeleteClick.bind(this,l1._id)} >Borrar</button> 
                          </td>
                       </tr>
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
     <div>
        {edicion}
        <div className="container center">             
             < div className="row mb-3">
                    <div   >                             
                       <select  className="form-control" style={{"colo":"red"}}  value={this.todosPerPage} onChange={this.seleccion}>
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
                    </div>  
                    <div className="col-md-8">
                       <div>
                         <input type ="text"  name="buscar" className="form-control" placeholder="Ingrese cadena A Buscar" onChange={this.searchHandler} value={this.state.search}  /> 
                       </div>  
                    </div>  
              </div>  
              <div className="p-col-12">
                 <div >
                    <table  className="table table-hover  table-striped  ">
                      <thead>
                        <tr>  
                          <th    className="p-button-warning p-button-rounded">Codigo</th>
                          <th   className="p-button-warning p-button-rounded">Descripcion </th>                              
                          <th >Acciones</th>
                          <th ></th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>{dashboardContent}</tbody>
                    </table>                       
                 </div>  
                 <center>
                      <p>Numero de Coincidencias encontradas {filteredContacts.length}</p>
                 </center>     
                 {Pagination}
              </div>
        </div>
    </div>            
    );
  }
}


ViewCate.propTypes = {
  getCurrentCategoria : PropTypes.func.isRequired,
  deleteCurrentCategoria: PropTypes.func.isRequired,
  updateCurrentCategoria: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  categoriafile: state.categoriafile,  
  errors: state.errors
}
);

export default connect(mapStateToProps, { getCurrentCategoria ,deleteCurrentCategoria,updateCurrentCategoria })(
  ViewCate
);

