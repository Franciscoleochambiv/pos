//import React, { Component } from 'react'
import React, { useEffect,useState } from 'react'
import  { useDispatch } from 'react-redux';
import Spinner from "../components/common/Spinner";
import ReactPaginate from 'react-paginate';
import { deleteCurrentCategoria } from '../actions/categoriaActions'
import {Modal, TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';



// class ViewCateHooks extends Component {

    const useStyles = makeStyles((theme) => ({
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
        }
      }));
      

    
const ViewCateHooks = ({data}) => {  
    //const {register, errors, handleSubmit} = useForm();
    const dispatch = useDispatch()
    const styles= useStyles();
    const [search, setsearch] = useState("")
    const [currentPage, setcurrentPage] = useState(1)
    const [todosPerPage, settodosPerPage] = useState(5)
    const [selectedPage, setselectedPage] = useState(1)
    const [isOpen, setisOpen] = useState(false)

    const [modalEditar, setModalEditar]= useState(false);
    const [modalEliminar, setModalEliminar]= useState(false);
    const [categoriaSeleccionado, setcategoriaSeleccionado]=useState({
            codigo: "",
            descripcion: "",
            _id: "" ,
            estado:""           
          })



    const handleChange=e=>{
            const {name, value}=e.target;
            setcategoriaSeleccionado(prevState=>({
              ...prevState,
              [name]: value
       }));
    }
    

    const searchHandler= (event) => {
        const lolo = event.target.value.toUpperCase();

        setsearch(lolo)

        //this.setState({search: lolo});
        //this.setState({
        //selectedPage: 1,
        //currentPage: Number(1)
       // })
    }
    
    const handlePageClicked = data => {
        let selected = data.selected;
        setselectedPage(selected)
        let sumapagina=Number(selected+1)
        setcurrentPage(sumapagina)

      };


      const seleccion = (event) => {
        event.preventDefault();
        let op =event.target.value;
        settodosPerPage(op)        
      }; 

      const peticionDelete = () => {

        console.log("se ha presionado delete")
        console.log(setcategoriaSeleccionado._id)
        dispatch(deleteCurrentCategoria(categoriaSeleccionado._id))
        abrirCerrarModalEliminar()
        //console.log(data._id)
        //  setData(data.filter(artista=>artista.id!==artistaSeleccionado.id));
        //alert(id)
        //  abrirCerrarModalEliminar();
        
      }

/*

      const bodyEliminar=(
        <div className={styles.modal}>
            <p>Estás seguro que deseas eliminar <b>{categoriaSeleccionado && categoriaSeleccionado.codigo}</b>? </p>
            <div align="right">
                <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
                <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
        
            </div>
        
        </div> 

        
      )

      
*/

      const abrirCerrarModalEliminar=()=>{
        setcategoriaSeleccionado(
            {"id": "",
             "codigo":"",
             "descripcion":"",
             "estado":""
            })
        setModalEliminar(!modalEliminar);
      }

      const peticionPut=async()=>{        
          var dataNueva= data;
          /*
          dataNueva.map(artista=>{
            if(artista.id===artistaSeleccionado.id){
              artista.artista=artistaSeleccionado.artista;
              artista.genero=artistaSeleccionado.genero;
              artista.ventas=artistaSeleccionado.ventas;
              artista.pais=artistaSeleccionado.pais;
            }
          });
          setData(dataNueva);
         */ 
          abrirCerrarModalEditar();
       
      }

      const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
      }



      const bodyEditar=(
        <div className={styles.modal}>
          <h3>Editar</h3>
          <TextField className={styles.inputMaterial} label="Codigo" name="codigo" onChange={handleChange} value={categoriaSeleccionado&&categoriaSeleccionado.codigo}/>
          <br />
          <TextField className={styles.inputMaterial} label="Descripcion" name="descripcion" onChange={handleChange} value={categoriaSeleccionado&&categoriaSeleccionado.descripcion}/>          
        <br />
          <br /><br />
          <div align="right">
            <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
          </div>
        </div>
      )


    
     
      /*

      onDeleteClick = (id) => {
        this.props.deleteCurrentCategoria(id);
        }   
     */

        //const {data} = this.props;

        const { categoriafiles, loading } = data;
        //const { currentPage, todosPerPage } = this.state;

        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(categoriafiles.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }


        console.log(categoriafiles) 
        console.log(categoriaSeleccionado) 




        let filteredContacts = categoriafiles.filter(
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
              containerClassName={'pagination pagination justify-content-center ' }
              subContainerClassName={' page-item page-link badge badge-primary'}
              activeClassName={'active'}
              
              />      
          )

          const currentTodos = filteredContacts.slice(indexOfFirstTodo, indexOfLastTodo);
          let dashboardContent;
          let dashboardContent2;
          if (filteredContacts === null || loading) {
            dashboardContent = <Spinner/>;
          } else {
            

          }  

          if (categoriaSeleccionado.estado=="E"){
            dashboardContent2 = (

                <div className={styles.modal}>
            <p>Estás seguro que deseas eliminar <b>{categoriaSeleccionado && categoriaSeleccionado.codigo}</b>? </p>
            <div align="right">
                <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
                <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
        
            </div>
        
        </div> 
            )

          }

          else{
            dashboardContent2 = (

                <div >
            
                </div> 
            )
          }


        
         

          if (Object.keys(data).length > 0) {
            dashboardContent = (          
                    currentTodos.map(l1 => (
                        <tr  key={l1._id}>            
                              <td className="p-col-12 p-md-6">{l1.codigo}</td>
                              <td className="p-col-12 p-md-6">{l1.descripcion}</td>
                              <td className="p-col-12 p-md-6">{l1.id}</td>
                              <td>                                       
                                 <button type="button"   className="btn btn-primary 01579b light-blue" onClick={peticionPut}  >Editar</button>                                         
                              </td>
                              <td>    
                                  <button type="button" className="btn btn-danger 01579b red darken-2"    onClick={() => setcategoriaSeleccionado(
                                      {"id": l1._id,
                                       "codigo":l1.codigo,
                                       "descripcion":l1.descripcion,
                                       "estado":"E"
                                      }
                                      
                                      )
                                                   
                                  
                                }  >Borrar</button> 
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
                        </div>  
                        <div className="col-md-8">
                            <div>
                                <input type ="text"  name="buscar" className="form-control" placeholder="Ingrese cadena A Buscar" onChange={searchHandler} value={search}  /> 
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

                {dashboardContent2}

                
            </div>
        )
   }
export default ViewCateHooks


/*
<Modal
                    open={modalEditar}
                    onClose={abrirCerrarModalEditar}>
                    {bodyEditar}
                </Modal>

                <Modal
                    open={modalEliminar}
                    onClose={abrirCerrarModalEliminar}>

                    {bodyEliminar}    
                    
                </Modal>  
*/