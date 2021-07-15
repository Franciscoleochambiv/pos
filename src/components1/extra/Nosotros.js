
import React, { Component } from "react";
import {Slide,Slider,Caption } from 'react-materialize';

import M from  'materialize-css/dist/js/materialize.min.js';
//import Image from './Image'
import p1 from './5.jpg';
import p2 from './6.jpg';
import p3 from './7.jpg';
import p4 from './8.jpg';




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
                           Nosotros
                    </h5>
                </Caption>
            </Slide>
            <Slide image={<img  alt={p2} src={p2} />}>
                <Caption placement="left">
                    <h3>
                        Nosotros
                    </h3>
                    <h5 className="light grey-text text-lighten-3">
                        Análizamos la fluencia de sus datos.
                    </h5>
                </Caption>
            </Slide>
           <Slide image={<img  alt={p3} src={p3} />} >
                <Caption placement="right">
                    <h3>
                     Nosotros.
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
                            Sf System

                        </h1>


                        <h6 className="align left" >
                         
                            

                        </h6>
                        <p className="font-weight  text mt-3 mb-4 text-justify" >  
                        Somos una empresa que hace sus mejores esfuerzos en cumplir las metas que los clientes nos establecen dia a dia recientemente hace un año empezamos con la programacion en javascript durante ese periodo
                        desarrollamos diferentes modulos para satisfacer la demanda de los clientes , razon por la cual ya hemos mejorado en la programacion.
                        Estamos ala vanguardia de la actualizacion de los nuevos lenguajes que estan vigentes en la actualidad contamos con un equipo de 4 perwsonas las cuales 
                        se dedican casi las 24 horas a la programacion y a la socucion de problemas informaticos asi como tambien realizamos la intalacion de hardware y software 
                        como tambien la instalacion de servidores en Debian,Ubuntu, etc.
                        </p>
                        
           </div>  
         </div> 
         
    </div>
  );
  }
 }

export default Menu;
