
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
                           Privacidad 
                    </h5>
                </Caption>
            </Slide>
            <Slide image={<img  alt={p2} src={p2} />}>
                <Caption placement="left">
                    <h3>
                        Privacidad
                    </h3>
                    <h5 className="light grey-text text-lighten-3">
                        Politicas de Privacidad
                    </h5>
                </Caption>
            </Slide>
           <Slide image={<img  alt={p3} src={p3} />} >
                <Caption placement="right">
                    <h3>
                       Privacidad
                    </h3>
                    <h5 className="light grey-text text-lighten-3">

                    </h5>
                </Caption>
            </Slide>
            <Slide image={<img  alt={p4} src={p4} />}>
                <Caption>
                    <h3>
                       Politicas de privacidad                      
                    </h3>
                    <h5 className="light grey-text text-lighten-3">
  
                    </h5>
                </Caption>
            </Slide>
         </Slider>

         <div className="container">

                        <h1 className="align center" >
                            Privacidad

                        </h1>


                        <h6 className="align left" >
                         
                            

                        </h6>
                        <p className="font-weight  text mt-3 mb-4 text-justify">  
                        Política de privacidad de datos
                        Identidad y dirección del responsable del fichero donde se encuentran sus datos
                        En virtud de la Ley Orgánica 15/1999, de 13 de diciembre, Protección de Datos de Carácter Personal, Zimrre D. Sedano Javier con domicilio social en Estambul N3 1A 41007Sevilla-España (de ahora en adelante el Responsable del Fichero), le informa que al introducir sus datos a través de los formularios electrónicos de nuestra web nos suministrará determinados datos de carácter personal que se tratarán de forma automatizada e incorporarán a los correspondientes ficheros de los que Zimrre D. Sedano Javier es titular y Responsable.
                        <br>
                        </br>
                        <br>
                        </br>

                        Finalidad del tratamiento de sus datos
                        <br>
                        </br>
                        La recogida y tratamiento automatizado de sus datos personales tiene como finalidad hacerle participar en los concursos y promociones que ofrecemos a través de nuestra web www.zimrre.com así como recibir nuestro Newsletter si así lo desea. Por la presente, usted consiente el tratamiento de sus datos con el fin de ser utilizados para el envío de promociones publicitarias y prospección comercial a través de cualquier medio, incluyendo por vía electrónica, por la empresa Zimrre D. Sedano Javier y otras relacionadas con los sectores de las telecomunicaciones, financiero, ocio, formación, gran consumo, automoción y energía.
                        <br>
                        </br>
                        <br>
                        </br>
                        

                        Derechos de acceso, rectificación y cancelación
                          <br>
                        </br>
                        En todo momento podrá ejercitar su derecho de acceso, rectificación, cancelación y oposición enviando su solicitud escrita y firmada dirigida al Departamento Legal de Zimrre D. Sedano Javier acompañando fotocopia de su DNI a la dirección postal arriba indicada o bien a la siguiente dirección de correo electrónico info@zimrre.com . Asimismo, en cualquier momento podrá revocar el consentimiento arriba prestado para la cesión de sus datos personales y la recepción de comunicaciones comerciales enviando una comunicación en este sentido a la dirección de correo electrónico indicando la palabra “Baja” en el asunto a la dirección de correo electrónico arriba referenciada.
                        <br>
                        </br>
                        <br>
                        </br>

                        Cesión
                        <br>
                        </br>
                        Si usted es premiado en alguno de nuestros concursos o promociones, autoriza la publicación de sus datos personales en nuestra Web y en los perfiles sociales de Zimrre D. Sedano Javier de Facebook, Youtube, Twitter, Instagram, Google y Pinterest a efectos de anunciar quien ha sido la persona ganadora. Asimismo, usted consiente la comunicación de sus datos a proveedores externos de Zimrre D. Sedano Javier relacionados con los sectores de las telecomunicaciones, financiero, ocio, formación, gran consumo, automoción y energía, a fin de ser utilizados para el envío de promociones publicitarias y prospección comercial.

                        </p>
                       
                        
           </div>  
         </div> 
         
    </div>
  );
  }
 }

export default Contacto;
