
import React, { Component } from "react";
import {Slide,Slider,Caption,SideNav,SideNavItem, Button,Icon,Collapsible,CollapsibleItem,Dropdown,Divider } from 'react-materialize';

import M from  'materialize-css/dist/js/materialize.min.js';
//import Image from './Image'
import p1 from './1.jpg';
import p2 from './2.jpg';
import p3 from './3.jpg';
import p4 from './4.jpg';
import { Link } from "react-router-dom";



class Menu extends Component
 {

    componentDidMount() {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
      }

  render(){    
    
  return (
      

 
    <div className="App">  
    <div  style={{paddingTop:"0px"}} > 
       

        

            
            <Slider

fullscreen={false}
options={{
  duration: 500,
  height: 500,
  indicators: true,
  interval: 6000
}}
            
            >
            <Slide image={<img  alt={p1} src={p1} />}>
                <Caption>
                    <h3>
                        SfSystem !
                    </h3>
                    <h5 className="light grey-text text-lighten-3">
                           Software a Medida para todos.
                    </h5>
                </Caption>
            </Slide>
            <Slide image={<img  alt={p2} src={p2} />}>
                <Caption placement="left">
                    <h3>
                        Diseño e Implemetación
                    </h3>
                    <h5 className="light grey-text text-lighten-3">
                        Análizamos la fluencia de sus datos.
                    </h5>
                </Caption>
            </Slide>
           <Slide image={<img  alt={p3} src={p3} />} >
                <Caption placement="right">
                    <h3>
                      Ofrecemos Servidores .
                    </h3>
                    <h5 className="light grey-text text-lighten-3">
                        Ensamblados e Instalados por Nosotros.
                    </h5>
                </Caption>
            </Slide>
            <Slide image={<img  alt={p4} src={p4} />}>
                <Caption>
                    <h3>
                        Ofrecemos Facturación Electronica!
                    </h3>
                    <h5 className="light grey-text text-lighten-3">
                        Empiece hoy mismo .
                    </h5>
                </Caption>
            </Slide>
         </Slider>

         <h6 className="align center" >
             Sistema Realizado en React con Material IU,

         </h6>
         <h5 className="align center"  >
                        Sistema de Control de Almacen y Facturacion Electronica.                
                        Back-End Realizado en Node Js
                        Front-End En React

         </h5>

         <h6 className="align center" >
              Compras,Ventas,Kardex Fisico ,Pedidos, Notas de Credito,Transferencia entre Almacenes
              Mantenimiento de Articulos,Documentos,Categorias,Marcas,etc

         </h6> 

         <br></br>
         <br></br>
         </div> 
         
    </div>
  );
  }
 }

export default Menu;
