import React, { Component } from 'react'
import Spinner from "../components/common/Spinner";
import ReactPaginate from 'react-paginate';
import { deleteCurrentCategoria } from '../actions/categoriaActions'


 class ViewCateHooks2 extends Component {
    constructor(){
        super();
        this.state={    
          search:'',
          currentPage: 1,
          todosPerPage:5,
          selectedPage: 1,    
          isOpen: false   
                 }
        this.searchHandler=this.searchHandler.bind(this);
    }
   
    
   

    searchHandler= (event)=> {
        const lolo = event.target.value.toUpperCase();
        this.setState({search: lolo});
        this.setState({
        selectedPage: 1,
        currentPage: Number(1)
        })
    }
    
    handlePageClicked = data => {
        let selected = data.selected;
        this.setState({
          selectedPage: selected,
          currentPage: Number(selected+1)
        })
      };

      onDeleteClick(id) {
          alert(id)
        deleteCurrentCategoria(id);
        }   
  

    render() {

        const {data} = this.props;

        const { categoriafiles, loading } = data;
        const { currentPage, todosPerPage } = this.state;

        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(categoriafiles.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }
        console.log(categoriafiles) 
        let filteredContacts = categoriafiles.filter(
            (task) =>{
                let poetName = task.codigo+task.descripcion.toUpperCase();
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
          
          if (filteredContacts === null || loading) {
            dashboardContent = <Spinner/>;
          } else {
            

          }  
         

          if (Object.keys(this.props.data).length > 0) {
            dashboardContent = (          
                    currentTodos.map(l1 => (
                        <tr  key={l1._id}>            
                              <td className="p-col-12 p-md-6">{l1.codigo}</td>
                              <td className="p-col-12 p-md-6">{l1.descripcion}</td>
                              <td className="p-col-12 p-md-6">{l1.id}</td>
                              <td>                                       
                                 <button type="button"   className="btn btn-primary 01579b light-blue"  >Editar</button>                                         
                              </td>
                              <td>    
                                  <button type="button" className="btn btn-danger 01579b red darken-2" onClick={this.onDeleteClick.bind(this,l1._id)}   >Borrar</button> 
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
    
        return (
            <div>
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
                                    <th className="p-button-warning p-button-rounded">id  </th>
                                    <th className="p-button-warning p-button-rounded">Descripcion </th>                                       
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
        )
    }
}
export default ViewCateHooks2
