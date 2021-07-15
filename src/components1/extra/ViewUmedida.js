
import React, { Component } from "react";
//import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentUmedida,deleteCurrentUmedida,updateCurrentUmedida,buscarCurrentUmedida
  
} from "../../actions/umedidaActions.js";
import { Button,Icon,Modal} from  'react-materialize';

import Spinner from "../common/Spinner.js";
import {TextInput} from  'react-materialize';
import ReactPaginate from 'react-paginate';


class ViewUmedida extends Component {
  constructor(){
    super();
    this.state={
      tipoData:[],
      codigo:"",
      descripcion:"",
      tasks:[],
      id_:"",
      term:'',
      search:'',
      currentPage: 1,
      todosPerPage:5,
      indices:[],
      respuesta:[],
      datos:[],
      hcodigo:'',
      selectedPage: 1,
      actualiza:[],
      isOpen: false,
      idgeneral:'',
      store:[]
    
    };

    
    this.searchHandler=this.searchHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleModal= this.toggleModal.bind(this);


    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.seleccion = this.seleccion.bind(this);
    this.ordenac = this.ordenac.bind(this);
  }
  

  toggleModal = (id) => {
    this.props.buscarCurrentUmedida(id);
    this.setState({
     isOpen: !this.state.isOpen,
     idgeneral: id
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
      codigo: this.state.codigo
    };
   this.props.updateCurrentUmedida(this.props.buscafile._id,tipoData);
   this.toggleModalfin();

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
   // alert(op);
   // console.log(op)

  };

   

  ordenac(columna) {
    //event.preventDefault();

    let oc =columna;
    //this.state.hcodigo;
   // this.setState({todosPerPage: op});
    alert(oc);
   // console.log(op)

  }; 




  searchHandler(event){
//    console.log(event.target.value)
    const lolo = event.target.value.toUpperCase();
//    console.log(lolo)
    this.setState({search: lolo});
    //this.handlePageClicked();
    this.setState({
      selectedPage: 1,
     currentPage: Number(1)
    })
    
 //   console.log(this.state.term)

   }
  

  

   handleChange(e){
     const {name,value}= e.target;
     this.setState({
       [name]:value
     })
   }

  onDeleteClick(id) {
    this.props.deleteCurrentUmedida(id);
    }

 

  componentDidMount() {

     console.log("que retorna la fumncion getcurrent tipos")
     this.props.getCurrentUmedida();
 
      
  }

 

  render() {


    const { umedidafile, loading } = this.props.umedidafile;
    const { currentPage, todosPerPage } = this.state;

  
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(umedidafile.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

 
   
  

  console.log("filtrando resultados ")
    let filteredContacts = umedidafile.filter(
      (task) =>{
           let poetName = task.codigo.toUpperCase() + task.descripcion.toUpperCase();
           let separador=" "; 
           let i;
          let poetName1=this.state.search.split(separador);
          

          //longitud de lo qu escribimos  array
          let tpalabras=poetName1.length;
          // console.log("datos llenados en el array para la busqueda")
         // console.log(tpalabras)
          //console.log(poetName1[0])
          // console.log(poetName1[1])

  //        var string = Welcome to geeks for geeks!
//document.write(string.match(/eek/g);
//Output:
           //return  poetName.match(this.state.search);
               // esta es la frase original
    //var cadena = "Era una vez un gato y un zapato que deseaban ser amigos de un pato";
    // encuentra la primer posición de "ato"
    /*
    var posicion = poetName.indexOf(this.state.search);
    // y mientras tengas una posición mayor o igual que 0,
    // (recuerda que -1 significa que no lo encontró)
   while (posicion >= 0)
           {
                        // remplaza 
                        "ato" por "atito"
                        //cadena = cadena.slice(0, posicion) + "atito" + cadena.slice(posicion + 3);
                        // busca la siguiente ocurrencia de la palabra
                        return   posicion = poetName.indexOf(this.state.search);

                        
             }
                    console.log(this.state.search);    
                  
                    return   posicion = poetName.indexOf(this.state.search);    
*/
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
     
   // return poetName.indexOf(this.state.search) !== -1; 
          // return  poetName.test(this.state.search);
          
      }
      
    );
    //console.log(poetName1);
   // console.log(filteredContacts);
    //console.log("DAtos Encontrados") 
     //console.log(poetName)



    
    



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

    let dashboardContent;
   
    

    if (filteredContacts === null || loading) {
       dashboardContent = <Spinner/>;
    } else {
         
      if (Object.keys(this.props.umedidafile).length > 0) {


        dashboardContent = (
          
          currentTodos.map(l1 => (
                    <tr key={l1._id}>            
                       <td className="tama">{l1.codigo}</td>
                       <td className="tama">{l1.descripcion}</td>
                       <td>


                       <Button onClick={this.toggleModal.bind(this,l1._id)} small className="tama btn btn-info 01579b light-blue darken-2" >
    
                        <Icon>
                              edit
                              </Icon>
                      </Button>
                       

                         
                          
                      </td>
                      <td>
                      
                          <Button  onClick={this.onDeleteClick.bind(this,l1._id)}  small className="btn btn-danger d50000 red accent-4"  >
                              
                              <Icon>
                              delete
                              </Icon>
                          </Button>
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
      <div>

      <div clasname="container colo">   
        <h4 className="mb-4 titulo">Categorias </h4>
        <div className="row">
          <div  className="container col s1 " >
                  <select   className ="tama1" value={this.todosPerPage} onChange={this.seleccion}>
                    <option value="5">
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
          <div className="container col s2" >
          </div> 
          
          
          
          <div className="container col s6" >
             <input type ="text"  name="buscar" className="input-field col s12" placeholder="Ingrese cadena A Buscar" onChange={this.searchHandler} value={this.state.search}  /> 
          </div> 
           </div>


        




        <table  className="table  centered responsive"   >
          <thead>
            <tr>  
              <th  onClick={()=> this.ordenac("codigo")}   className="colo">Codigo ⇅ </th>
              <th  onClick={()=> this.ordenac("descripcion")}className="colo">Descripcion ⇅</th>
              <th className="colo">Acciones</th>
              <th className="colo"></th>
              <th />
            </tr>
          </thead>
          <tbody>{dashboardContent}</tbody>
        </table>

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







    
      <Modal open={this.state.isOpen}  actions ={                  
              <Button onClick={this.toggleModalfin} waves="light" className="btn-small blue">
                Close
              <Icon >
                  close
              </Icon>
             </Button>     

        } header="Modificacion de Datos" >
                          
          <div>
           <TextInput 
                 
                 label="Codigo"
                 name="codigo1"
                  value={this.props.buscafile.codigo}
                  disabled
                  
             />
               <TextInput
                
                label="Descripcion"
                name="descripcion1"
                value={this.props.buscafile.descripcion}
                disabled  
                />
            

            </div>
                 <center>
                 <h6>Nuevos Datos</h6>   
                   </center> 
                
     
                          <form onSubmit={this.onSubmit}> 
                 
                          
             <TextInput 
                 
                  label="Codigo"
                  name="codigo"
                   value={this.state.codigo}
                   onChange={this.onChange}
                   
              />
                <TextInput
                 
                 label="Descripcion"
                 name="descripcion"
                 onChange={this.onChange}
                 value={this.state.descripcion}
                  
                 />
                  
             
                 <Button type="submit" waves="light" className="btn-small blue">
                     Enviar 
                     <Icon >
                     lock
                     </Icon>
                    
                 </Button>
                 
                 
 
               </form> 
             
                          
                     </Modal>






                    
     



        </div>



      
                   
      </div>
      
         
            
    );




    
  }
}


ViewUmedida.propTypes = {
  getCurrentUmedida : PropTypes.func.isRequired,
  deleteCurrentUmedida: PropTypes.func.isRequired,
  updateCurrentUmedida: PropTypes.func.isRequired,
  buscarCurrentUmedida: PropTypes.func.isRequired,
  //frPagina2: PropTypes.func.isRequired

};

const mapStateToProps = state => ({
  umedidafile: state.umedidafile,
  buscafile: state.umedidafile.buscafile,
  errors: state.errors
  
}
);

export default connect(mapStateToProps, { getCurrentUmedida ,deleteCurrentUmedida,updateCurrentUmedida,buscarCurrentUmedida })(
  ViewUmedida
);

