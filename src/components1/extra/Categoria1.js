
import React, { Component } from "react";
//import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCategoria 
} from "../../actions/CategoriaAccion";
import { Button,Icon,Modal} from  'react-materialize';

import Spinner from "../common/Spinner.js";
import {TextInput} from  'react-materialize';
import ReactPaginate from 'react-paginate';

import Item from "../extra/Item";


class Categoria1 extends Component {
  constructor(){
    super();
    this.state={      
      tasks:[],            
      search:'',
      currentPage: 1,
      todosPerPage:5,          
      selectedPage: 1,           
    };

    
    this.searchHandler=this.searchHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
  


    this.onChange = this.onChange.bind(this);
 
    this.seleccion = this.seleccion.bind(this);
   
  }
  

  onChange(e) {
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

  
 

  componentDidMount() {

   //  console.log("que retorna la fumncion getcurrent tipos")
     this.props.getCategoria();
     
     
 
      
  }

 

  render() {


            const { categoriafile, loading } = this.props.categoriafile;
            const { currentPage, todosPerPage } = this.state;

            const indexOfLastTodo = currentPage * todosPerPage;
            const indexOfFirstTodo = indexOfLastTodo - todosPerPage;    
            const pageNumbers = [];

            for (let i = 1; i <= Math.ceil(categoriafile.length / todosPerPage); i++) {
            pageNumbers.push(i);
            }

            //console.log("filtrando resultados ")
            //console.log(JSON.stringify(categoriafile))

            let filteredContacts = categoriafile.filter(
                (task) =>{
                let poetName = task.Categoria+task.descripcion.toUpperCase();
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
                        
                
                }      
            );
        
                const Pagination = (
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(filteredContacts.length / todosPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={this.handlePageClicked}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    />                
                )

                const currentTodos = filteredContacts.slice(indexOfFirstTodo, indexOfLastTodo);
                let dashboardContent,envio;   
                if (filteredContacts === null || loading) {
                    dashboardContent = <Spinner/>;
                } 
                else 
                {
                        
                  
                    

                        if (Object.keys(this.props.categoriafile).length > 0) {
                            envio = (
                                <Item data={currentTodos}/>
                            ) 
                            dashboardContent = (                    
                                                currentTodos.map(l1 => (
                                                    <tr key={l1._id}>            
                                                    <td className="tama">{l1.Categoria}</td>
                                                    <td className="tama">{l1.descripcion}</td>
                                                    <td>
                                                    </td>
                                                    <td>                                
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
                }

    return (

      <div   >
              
             
               {envio}
                <div >   
                
                    
                   
                    <div className="row">
                    <div  className="container col s1 " >
                        <ul className="pagination">
                        <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>   
                            <ul className="pagination" id="page-numbers">                  
                            {Pagination}
                            </ul>
                                <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
                            </ul>  
                        <center>
                                <p className="colo ">Numero de Coincidencias encontradas {filteredContacts.length}</p>
                        </center>          
                    </div>
                    </div>
                </div>                   
        </div>
    ); //return

  } //fin de render
} //fin de class


Categoria1.propTypes = {
  getCategoria : PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  categoriafile: state.categoriafile,
  buscafile: state.categoriafile.buscafile,
  errors: state.errors
  
}
);

export default connect(mapStateToProps, { getCategoria  })(
  Categoria1
);

