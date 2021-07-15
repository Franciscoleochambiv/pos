
import React, { Component } from "react";
import {Slide,Slider,Caption,SideNav,SideNavItem, Button,Icon,Collapsible,CollapsibleItem,Dropdown,Divider } from 'react-materialize';

import M from  'materialize-css/dist/js/materialize.min.js';
//import Image from './Image'
import p1 from './5.jpg';
import p2 from './6.jpg';
import p3 from './7.jpg';
import p4 from './8.jpg';
import p45 from './45.jpg';



import PropTypes from "prop-types";
import { connect } from "react-redux";
import  { buscarCurrentShoping }  from "../../actions/shopingActions";





class DetBlog extends Component
 {

     


    componentDidMount() {
      alert("reacargasndo")
     
        
        if (this.props.match.params.handle) {
            this.props.buscarCurrentShoping(this.props.match.params.handle);
        }
        //console.log(JSON.stringify(this.props.shopingfile))
      }


      refreshPage(){ 
        alert("reacrgando la pagina")
           window.location.reload(); 
      } 

      
  render(){ 
    //const { shopingfile, loading } = this.props.shopingfile.shopingfile;

    let dashboardContent;
   //  console.log(this.props.shopingfile)
     const { data, loading } = this.props.shopingfile;
     //console.log(data)


              
     if (Object.keys(this.props.shopingfile).length > 0) {
        dashboardContent = (          
                data.map(l1 => (
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
      
    
       
     

     
    
  return (
      <div>
          <h1>hola esto ers detblog</h1>
          {dashboardContent}
              
 
    
         
    </div>
  );
  }
 }

 DetBlog.propTypes = {
    buscarCurrentShoping : PropTypes.func.isRequired,
    
  
  };
  
  const mapStateToProps = state => ({
    shopingfile: state.shopingfile,  
    buscafile:state.buscafile,
    errors: state.errors
  }
  );



  export default connect(mapStateToProps, { buscarCurrentShoping })(
    DetBlog
  );
  


  
  
  

