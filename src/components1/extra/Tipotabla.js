import React, { Component } from "react";
//import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentTipos,deleteCurrentTipos
  
} from "../../actions/tiposfileActions.js";
//import { deleteCurrentTipos } from "../../actions/tiposfileActions";

//import Tabla1 from  "./tabla1";
//import Spinner from "../common/Spinner.js";
//import Education from "../dashboard/Education.js";
//import ProfileActions from "../dashboard/ProfileActions";
//import Experience from "./Experience.js";
//import Tiposdoc from "../dashboard/Tiposdoc";

//import Menu from "./menu.js";

class Tipotabla extends Component {
  constructor(){
    super();
    this.state={
      tasks:[]
    
    }
  }


 

  onDeleteClick(id) {
    //this.props.getCurrentTipos();

    this.props.deleteCurrentTipos(id);
    //this.props.deleteCurrentTipos(id, this.props.history);
    //referscar la pagina
       // this.setState.tiposfile
  // this.props.getCurrentTipos();
   //this.props.history.push('/view-tipos');


    
  }

 

  componentDidMount() {
    this.props.getCurrentTipos();
    // dashboardContent();
    
  }


  render() {
  //  const { user } = this.props.auth;
    const { tiposfile, loading } = this.props.tiposfile;
    
    //  
    //const { tiposfile1 } =this.props;



    
   


    //listar visualizar un arraythis.setState({tasks:profile}) 
    let dashboardContent;

    if (tiposfile === null || loading) {
    //   dashboardContent = <Spinner/>;
    } else {
         

      


      //
      ///*
/*
      {tiposfiles.map(tiposfile => (
        <h1 key={tiposfile._id} tiposfile={tiposfile} />
        )
       }
     ));
                 
     */


//console.log(profile)
     // console.log(tasks)
      if (Object.keys(tiposfile).length > 0) {

        //const tasks = Object.getOwnPropertyNames(profile);
        //console.log(tasks)



     
        
        dashboardContent = (
              tiposfile.map(l1 => (
                    <tr key={l1._id}>            
                       <td>{l1.codigo}</td>
                       <td>{l1.descripcion}</td>
                       <td>
                          <button className="btn btn-info"  >
                              Modificar
                          </button>
                      </td>
                      <td>
                      
                          <button  onClick={this.onDeleteClick.bind(this,l1._id)} className="btn btn-danger"  >
                              Borrar
                          </button>
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
        <h4 className="mb-4">Tipos de Documento</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Descripcion</th>
              <th>Acciones</th>
              <th />
            </tr>
          </thead>
          <tbody>{dashboardContent}</tbody>
        </table>

         {console.log(this.state.tasks)}
        

      </div>
         
            
    );
  }
}

Tipotabla.propTypes = {
  getCurrentTipos : PropTypes.func.isRequired,
  deleteCurrentTipos: PropTypes.func.isRequired,
  //auth: PropTypes.object.isRequired,
  tiposfile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tiposfile: state.tiposfile,


  //profile: state.profile,
  errors: state.errors
  //auth: state.auth
});

export default connect(mapStateToProps, { getCurrentTipos ,deleteCurrentTipos })(
  Tipotabla
);























