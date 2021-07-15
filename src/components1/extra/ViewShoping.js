
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentShoping,deleteCurrentShoping,updateCurrentShoping
  
} from "../../actions/shopingActions";


import Spinner from "../common/Spinner.js";


import {Modal } from 'react-materialize';

//import {Dialog} from 'primereact/dialog';
import ReactPaginate from 'react-paginate';

class ViewShoping extends Component {
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
  

  toggleModal = (id,cod,des,category,price,description,popular,imageUrls) => {
    this.setState({
      isOpen: !this.state.isOpen,
      id_:id,
      id:cod,
      name:des,
      category:category,
      price:price,
      description:description,
      popular:popular,
      imageUrls:imageUrls

        
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
      name: this.state.name,
      id: this.state.id,
      category:this.state.category,
      price:this.state.price,
      description:this.state.description,
      popular:this.state.popular,
      imageUrls:this.state.imageUrls
    };
    console.log(tipoData)
   this.props.updateCurrentShoping(this.state.id_,tipoData);
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
    this.props.deleteCurrentShoping(id);
    }

 

  componentDidMount() {
     this.props.getCurrentShoping();
    }

 



  

  render() {
    
                     
            const { shopingfiles, loading } = this.props.shopingfile;
            const { currentPage, todosPerPage } = this.state;

            const indexOfLastTodo = currentPage * todosPerPage;
            const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
            
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(shopingfiles.length / todosPerPage); i++) {
              pageNumbers.push(i);
            }

            let filteredContacts = shopingfiles.filter(
              (task) =>{
                  let poetName = task.name.toUpperCase()+task.description.toUpperCase();
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
                          //console.log("recorriendo el aray")
                          //  console.log(poetName1[i]); 
                            datopa=poetName1[i];
                            //datopa=datopa+" "+datopa;
                            return poetName.indexOf(datopa) !== -1 ;
                          //  datopa=poetName1[i];
                          //  return poetName.indexOf(datopa) !== -1 ;
                        

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
                        header="Edicion de E-Comerce"
                        id="Modal-0"
                        open={this.state.isOpen}
                        options={{
                          dismissible: true,
                          endingTop: '5%',
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
                               <form  onSubmit={this.onSubmit}  >  
                                  <div className="p-col-12 p-lg-12">                
                                        <div className="card card-w-title  p-col-12 p-lg-12" >

                                            <div className="p-grid">
                                                  <div className="p-col-12 p-md-6">
                                                    <input className="p-inputtext p-component"
                                                      placeholder="id "
                                                      value={this.state.id}
                                                      name="id"
                                                      onChange={this.onChange}                                  
                                                    />                                
                                                  </div>  

                                                  <div className="p-col-12 p-md-6">
                                                    <input className="p-inputtext p-component"
                                                      name="name"
                                                      placeholder="name"
                                                      value={this.state.name}
                                                      onChange={this.onChange}                                                                                
                                                      />
                                                  </div>  

                                                   <div className="p-col-12 p-md-6">
                                                    <input className="p-inputtext p-component"
                                                      name="category"
                                                      placeholder="Categoria"
                                                      value={this.state.category}
                                                      onChange={this.onChange}                                                                                
                                                      />
                                                  </div>  

                                                  <div className="p-col-12 p-md-6">
                                                    <input className="p-inputtext p-component"
                                                      name="price"
                                                      placeholder="Precio"
                                                      value={this.state.price}
                                                      onChange={this.onChange}                                                                                
                                                      />
                                                  </div>  

                                                  <div className="p-col-12 p-md-12">
                                                    <textarea class="md-textarea form-control" rows="1"
                                                      name="description"
                                                      placeholder="Descripcion del Producto"
                                                      value={this.state.description}
                                                      onChange={this.onChange}                                                                                
                                                      />
                                                  </div>  

                                                  <div className="p-col-12 p-md-6">
                                                    <input className="p-inputtext p-component"
                                                      name="popular"
                                                      placeholder="Verdarero o Falso"
                                                      value={this.state.popular}
                                                      onChange={this.onChange}                                                                                
                                                      />
                                                  </div>  

                                                  <div className="p-col-12 p-md-12">
                                                    <textarea class="md-textarea form-control" rows="1"
                                                      name="imageUrls"
                                                      placeholder="Imagen asociada a el producto "
                                                      value={this.state.imageUrls}
                                                      onChange={this.onChange}                                                                                
                                                      />
                                                  </div>  








                                              </div>  
                                        </div>    
                                  </div> 
                                  <div className="p-col-12 p-nogutter">
                                      <div className="p-grid">                       
                                          <div className="p-col-12 p-lg-12">
                                              <div className="card card-w-title">                              
                                                  <div className="p-grid">
                                                        <div className="p-col-12 p-md-6" style={{textAlign:'center'}}>
                                                            <button  type="submit"  label="Grabar  " style={{marginBottom:'10px'}} className= "btn btn-info  mt-4 01579b light-blue darken-2">Editar</button>                                                               
                                                            <button  type="button"  label="Cancelar" style={{marginBottom:'10px'}} className="btn btn-danger  mt-4 01579b red darken-2" onClick={() => this.setState({isOpen:false})}>Cancel</button>                                                               
                                                        
                                                        </div>
                                                        
                                                        
                                                  </div>     
                                              </div>      
                                          </div>    
                                      </div>  
                                  </div>  
                              </form>



                            





                          </Modal>
                 
                        
                </div>
                  );
            }

                
              if (Object.keys(this.props.shopingfile).length > 0) {
                  dashboardContent = (          
                          currentTodos.map(l1 => (
                              <tr  key={l1._id}>            
                                    <td className="p-col-12 p-md-6">{l1.id}</td>
                                    <td className="p-col-12 p-md-6">{l1.name}</td>
                                    <td className="p-col-12 p-md-6">{l1.category}</td>
                                    <td className="p-col-12 p-md-6">{l1.price}</td>
                                    <td className="p-col-12 p-md-6">{l1.description.substr(0,40)}</td>
                                    <td className="p-col-12 p-md-6">{l1.popular}</td>
                                    <td className="p-col-12 p-md-6">{l1.imageUrls[0].substr(0,30)}</td>
                                    

                                    


                                    <td>                                       
                                       <button type="button"  onClick={this.toggleModal.bind(this,l1._id,l1.id,l1.name,l1.category,l1.price,l1.description,l1.popular,l1.imageUrls)} className="btn btn-primary  mt-4 01579b light-blue darken-2"  >Editar</button>                                         
                                    </td>
                                    <td>    
                                        <button type="button" className="btn btn-danger  mt-4 01579b red darken-2" onClick={this.onDeleteClick.bind(this,l1._id)} >Borrar</button> 

                                        
                                    
                                             
                                        
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
             <h3  className="alert alert-primary">Listado de Datos</h3>

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
                         
                          
                        
                        <table  className="table table-hover  table-striped  responsive-table">
                          <thead>
                            <tr>  
                              <th  onClick={()=> this.ordenac("id")}   className="p-button-warning p-button-rounded">id  </th>
                              <th  onClick={()=> this.ordenac("name")} className="p-button-warning p-button-rounded">Name </th>
                              <th  className="p-button-warning p-button-rounded">Categorias</th>
                              <th  className="p-button-warning p-button-rounded">Precio</th>
                              <th  className="p-button-warning p-button-rounded">Descripcion</th>
                              <th  className="p-button-warning p-button-rounded">Popular</th>
                              <th  className="p-button-warning p-button-rounded">ImageUrl</th>

                              <th >Acciones</th>
                              <th ></th>
                              <th />
                            </tr>
                          </thead>
                          <tbody>{dashboardContent}</tbody>
                        </table>
                       <div className="row">
                          <div  className="container col s1 " >
                          </div>
        
                      </div>
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


ViewShoping.propTypes = {
  getCurrentShoping : PropTypes.func.isRequired,
  deleteCurrentShoping: PropTypes.func.isRequired,
  updateCurrentShoping: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  shopingfile: state.shopingfile,  
  errors: state.errors
}
);

export default connect(mapStateToProps, { getCurrentShoping ,deleteCurrentShoping,updateCurrentShoping })(
  ViewShoping
);

