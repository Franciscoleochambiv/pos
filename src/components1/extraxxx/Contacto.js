
import React, { Component } from "react";
import {Slide,Slider,Caption,SideNav,SideNavItem, Button,Icon,Collapsible,CollapsibleItem,Dropdown,Divider } from 'react-materialize';

import M from  'materialize-css/dist/js/materialize.min.js';
//import Image from './Image'
import p1 from './5.jpg';
import p2 from './6.jpg';
import p3 from './7.jpg';
import p4 from './8.jpg';
import { Link } from "react-router-dom";



class Contacto extends Component
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
            duration: 600,
            height: 300,
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
                           Contacto 
                    </h5>
                </Caption>
            </Slide>
            <Slide image={<img  alt={p2} src={p2} />}>
                <Caption placement="left">
                    <h3>
                        Contacto
                    </h3>
                    <h5 className="light grey-text text-lighten-3">
                        Ubiquenos le dejamos nuestros datos
                    </h5>
                </Caption>
            </Slide>
           <Slide image={<img  alt={p3} src={p3} />} >
                <Caption placement="right">
                    <h3>
                       Contacto
                    </h3>
                    <h5 className="light grey-text text-lighten-3">

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

         <div className="container">

                        <h1 className="align center" >
                            Contacta con Nosotros

                        </h1>


                        <h6 className="align left" >
                         
                            

                        </h6>
                        <p className="font-weight  text mt-3 mb-4">  
                        Si quieres informacion sobre cualquiera de nuestros productos o estas interesado en su distribucion contactanos.
                        </p>
                        <p>

                        Muchas Gracias
                        </p>
                        <li>

                        Sede Central y oficinas: Calle Mariano Melgar 205  Urb Mariscal Castilla  Cerro Colorado-Arequipa
                        </li>
                        <li>
                        Telefono :(+51) 538117
                        </li>
                        <li>

                        Administracion: grupo23pe@yahoo.com    
                        </li>
                        <li>
                        Compras : grupo80pr@gmail.com 
                        </li>
                        <li>
                        Ventas : grupo90pr@gmail.com 
                        </li>
                        <li>
                        Comunicacion y Marketing : frankabel231@gmail.com 
                        </li>
                        
           </div>  
         </div> 
         
    </div>
  );
  }
 }

export default Contacto;
