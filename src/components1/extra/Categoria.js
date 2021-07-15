
import React, { Component } from "react";
import {  withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCategoria } from "/home/lolo/curso_react/menu3/client/src/actions/categoriaActions";
//import { ViewTipos } from "/home/adryan/curso_react/menu3/client/src/components/extra/ViewTipos";
import {TextInput, Button,Icon} from  'react-materialize';//
//import ViewTipos from "./ViewCate";
//import Row from 'react-materialize/lib/Row';



class Categoria extends Component {

    constructor(props) {
        super(props);
        this.state = {
          descripcion: "",
          errors: {},
          disabled: false,
          codigo: ""
         };
    
    
         
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
      }

      componentDidMount() {

        console.log("Inicalizando variables")
        //componentDidMount() {
         
        
        
      }
        

      componentWillReceiveProps(nextProps) {
        if (nextProps) {
          this.setState({ errors: nextProps.errors });
        }
      }
    
      onSubmit(e) {
        e.preventDefault();
    
        const tipoData = {
          
          descripcion: this.state.descripcion,
          codigo: this.state.codigo
        };
    
       this.props.addCategoria(tipoData, this.props.history);
       //this.props.addTipos(tipoData, this.props._id);

       
      }
    
      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
      onCheck(e) {
        this.setState({
          disabled: !this.state.disabled,
          descripcion: !this.state.descripcion
        });
      }
    
    
    
    render() {
        const { errors } = this.state;

  return (
    <div className="App">


       


 

        <h5 className="align center" >Operaciones Categorias</h5>
        <div className="section container">
            

        <form onSubmit={this.onSubmit} > 
            <TextInput 
                 
                 label="Codigo"
                 name="codigo"
                  value={this.state.codigo}
                  onChange={this.onChange}
                  error={errors.codigo}
             />
               <TextInput
                
                label="Descripcion"
                name="descripcion"
                value={this.state.descripcion}
                  onChange={this.onChange}
                  error={errors.descripcion}
                />
                 
            
                <Button type="submit" waves="light" className="btn-small blue">
                    Submit
                    <Icon >
                    lock
                    </Icon>
                   
                </Button>
                

              </form>   
              </div>  
              
              
          
                  
    </div>
  );
}
}

Categoria.propTyes = {
    addCategoria: PropTypes.func.isRequired,
    
    errors: PropTypes.object.isRequired
  };
  

const mapStateToProps = state => ({
   
    errors: state.errors
  });


export default connect(mapStateToProps, { addCategoria })(
    withRouter(Categoria)
  );
  

