
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {

  getCurrentCategoria,getCategoriaByHandle 
  
} from "../../../actions/categoriaActions";

import { Link } from 'react-router-dom';
import Spinner from "../../common/Spinner";


class Cateblog1 extends Component {
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

    
    
    this.handleClick = this.handleClick.bind(this);
     
    this.onChange = this.onChange.bind(this);

    
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


  

   




  

  

   handleChange(e){
     const {name,value}= e.target;
     this.setState({
       [name]:value
     })
   }

  
 

  componentDidMount() {
     this.props.getCurrentCategoria();
     //alert("llenado datos")
    }


  buscardato(){

   // this.props.getCategoriaByHandle("Tecnologia");


  }  
 



  

  render() {
    
            

          
            const { categoriafiles, loading } = this.props.categoriafile;
            const { currentPage, todosPerPage } = this.state;

            
          
          

            const currentTodos = categoriafiles;
            let dashboardContent;
            
          
            if (currentTodos === null || loading) {
              dashboardContent = <Spinner/>;
            } else {
              
                
              if (Object.keys(this.props.categoriafile).length > 0) {
                  dashboardContent = (          
                          currentTodos.map(l1 => (


                            <li><a  style={{color:"blue",fontSize:"14px"}} href={l1.descripcion}>{l1.descripcion}</a></li>

                            //this.props.history.push(
                            //    "/?category=" +
                           

                             

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

        <div >
            <ul className="todo-list">  

                {dashboardContent}
            </ul>  
            

      </div>
        
    );
  }
}


Cateblog1.propTypes = {
  getCurrentCategoria : PropTypes.func.isRequired,
  getCategoriaByHandle : PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  categoriafile: state.categoriafile,  
  errors: state.errors
}
);

export default connect(mapStateToProps, { getCurrentCategoria ,getCategoriaByHandle })(
  Cateblog1
);

