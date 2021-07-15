
import React, { Component } from "react";
import {Slide,Slider,Caption,SideNav,SideNavItem, Button,Icon,Collapsible,CollapsibleItem,Dropdown,Divider } from 'react-materialize';

import M from  'materialize-css/dist/js/materialize.min.js';
//import Image from './Image'
import p1 from './5.jpg';
import p2 from './6.jpg';
import p3 from './7.jpg';
import p4 from './8.jpg';
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import PropTypes from "prop-types";

import  {getCurrentShoping}  from "../../actions/shopingActions";



class Blog extends Component
 {

    componentDidMount() {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
        this.props.getCurrentShoping();
      }



      
  render(){ 
      
    const { shopingfiles, loading } = this.props.shopingfile;

    console.log(shopingfiles)
    
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

         <div >

             <div className="col-md-8">
                        <h3 className="align center" >
                            Notica

                        </h3>
                        <h6 className="align left" >
                        </h6>
                        <p className="font-weight  text mt-3 mb-4">  
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur accusantium, unde tempora atque nihil exercitationem necessitatibus modi minus sequi adipisci tenetur dolorum eos fuga, incidunt asperiores excepturi numquam maxime impedit.
                        </p>
                </div>
                <div className="col-md-4">
                        <h3 className="align center" >
                            Notica ddd

                        </h3>
                        <h6 className="align left" >
                        </h6>
                        <p className="font-weight  text mt-3 mb-4">  
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur accusantium, unde tempora atque nihil exercitationem necessitatibus modi minus sequi adipisci tenetur dolorum eos fuga, incidunt asperiores excepturi numquam maxime impedit.
                        </p>
                </div> 
        

        < div className="row mb-3">

                <div className="col-mb-1 ">
                    <h6>li</h6>
                    <aside class="social-sharing">
	<ul className="menu-social">
		<li className="social-item"><a href="http://twitter.com/intent/tweet?text=SiloCreativo&url=https://www.silocreativo.com/en/" target="_blank"><span class="screen-reader-text">Twitter</span></a></li>
		<li className="social-item"><a href="http://www.facebook.com/sharer.php?u=https://www.silocreativo.com/en/&t=SiloCreativo" target="_blank"><span class="screen-reader-text">Facebook</span></a></li>
		<li className="social-item"><a href="https://www.pinterest.com/pin/find/?url=https://www.silocreativo.com/en/" target="_blank"><span class="screen-reader-text">Pinterest</span></a></li>
		<li className="social-item"><a href="whatsapp://send?text=https://www.silocreativo.com/en/" data-action="share/whatsapp/share"><span class="screen-reader-text">Whatsapp</span></a></li>
		<li className="social-item newsletter"><span>Newsletter</span></li>     
		<li class="social-item next"><a href="#">Next</a></li>
	</ul>
</aside>


                </div>  
                <div className="col-mb-8  ">
                    <h3 className="align center" >Publicacion de Noticia</h3>
                    <section className="view intro-video">    
                                <div className="hm-gradient">
                                <div className="full-bg-img">
                                    <div className="container flex-center">
                                    <div className="row pt-5 mt-3">
                                        

                                        <div className="col-lg-12 wow fadeIn">
                                        <div className="embed-responsive embed-responsive-16by9 wow fadeInRight">
                                            <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/IQyauRAxvjI"
                                            allowfullscreen></iframe>
                                        </div>
                                        </div>
                                        <div className="col-lg-12 wow fadeIn mb-5 text-center text-lg-left">
                                        <div className="black-text">
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non unde nihil voluptate sint, aspernatur illum aliquam, magnam, sapiente fugiat quasi hic quaerat pariatur illo eum impedit? Consequatur at quae assumenda.</p>
                                            
                                            <a className="btn btn-outline-white wow fadeInLeft" data-wow-delay="0.3s">Just do it!</a>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                   </section>



                   <h3 className="align center" >Publicacion de Noticia</h3>
                    <section className="view intro-video">    
                                <div className="hm-gradient">
                                <div className="full-bg-img">
                                    <div className="container flex-center">
                                    <div className="row pt-5 mt-3">
                                        

                                        <div className="col-lg-12 wow fadeIn">
                                        
                                             <img className="img-fluid" src="https://picsum.photos/id/237/1500/600" />  
                                        
                                        </div>
                                        <div className="col-lg-12 wow fadeIn mb-5 text-center text-lg-left">
                                        <div className="black-text">
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non unde nihil voluptate sint, aspernatur illum aliquam, magnam, sapiente fugiat quasi hic quaerat pariatur illo eum impedit? Consequatur at quae assumenda.</p>
                                            
                                            <a className="btn btn-outline-white wow fadeInLeft" data-wow-delay="0.3s">Just do it!</a>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                   </section>




                    
                </div>  
                <div className="col-mb-3">
                    <h3>Novedades</h3>


                    <ul className="todo-list">  
                           <li>
                        
                            <div className="icon">
                                <img src={require(`./8.jpg`)}  alt="hambuerger" />
                            </div>
                            <div className="name">
                                <span className="item-name">loo</span>
                                <span className="item-price">200</span>
                            </div>
                            <div className="price">
                                <h3>$300</h3>
                            </div>
                            <button className="remove" >
                                <i className="material-icons">close</i>
                            </button>
                        </li>
                </ul>      
                   
                    
                    

                    
                    
                </div>  
        </div>      

                  



                <section className="view intro-video">    
                                <div className="hm-gradient">
                                <div className="full-bg-img">
                                    <div className="container flex-center">
                                    <div className="row pt-5 mt-3">

                                    <div className="col-lg-6 wow fadeIn">
                                        
                                           <img class="img-fluid" src="https://picsum.photos/id/237/1500/600" />
                                        
                                        </div>

                                      
                                        <div className="col-lg-6 wow fadeIn mb-5 text-center text-lg-left">
                                            
                                        <div className="black-text">
                                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non unde nihil voluptate sint, aspernatur illum aliquam, magnam, sapiente fugiat quasi hic quaerat pariatur illo eum impedit? Consequatur at quae assumenda.</p>
                                            
                                            <a className="btn btn-outline-white wow fadeInLeft" data-wow-delay="0.3s">Just do it!</a>
                                        </div>
                                        </div>

                                        
                                    </div>
                                    </div>
                                </div>
                                </div>
                </section>

















                
                
                       

               < div className="row mb-3">


                            <div className="col-md-4">
                                    <h3 className="align center" >
                                        Notica

                                    </h3>
                                    <h6 className="align left" >
                                    </h6>
                                    <p className="font-weight  text mt-3 mb-4">  
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur accusantium, unde tempora atque nihil exercitationem necessitatibus modi minus sequi adipisci tenetur dolorum eos fuga, incidunt asperiores excepturi numquam maxime impedit.
                                    </p>
                            </div> 
                            <div className="col-md-4">
                                    <h3 className="align center" >
                                        Notica

                                    </h3>
                                    <h6 className="align left" >
                                    </h6>
                                    <p className="font-weight  text mt-3 mb-4">  
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur accusantium, unde tempora atque nihil exercitationem necessitatibus modi minus sequi adipisci tenetur dolorum eos fuga, incidunt asperiores excepturi numquam maxime impedit.
                                    </p>
                            </div> 
                            <div className="col-md-4">
                                    <h3 className="align center" >
                                        Notica

                                    </h3>
                                    <h6 className="align left" >
                                    </h6>
                                    <p className="font-weight  text mt-3 mb-4">  
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur accusantium, unde tempora atque nihil exercitationem necessitatibus modi minus sequi adipisci tenetur dolorum eos fuga, incidunt asperiores excepturi numquam maxime impedit.
                                    </p>
                            </div> 
                    </div>  

                          <div className="col-6">
                                    <h3 className="align center" >
                                        Notica

                                    </h3>
                                    <h6 className="align left" >
                                    </h6>
                                    <p className="font-weight  text mt-3 mb-4">  
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur accusantium, unde tempora atque nihil exercitationem necessitatibus modi minus sequi adipisci tenetur dolorum eos fuga, incidunt asperiores excepturi numquam maxime impedit.
                                    </p>
                            </div> 

                    <div className="row mb-3">
                        <div className="col-6">
                                    <h3 className="align center" >
                                        Notica

                                    </h3>
                                    <h6 className="align left" >
                                    </h6>
                                    <p className="font-weight  text mt-3 mb-4">  
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur accusantium, unde tempora atque nihil exercitationem necessitatibus modi minus sequi adipisci tenetur dolorum eos fuga, incidunt asperiores excepturi numquam maxime impedit.
                                    </p>
                            </div> 
                            <div className="col-6">
                                    <h3 className="align center" >
                                        Notica

                                    </h3>
                                    <h6 className="align left" >
                                    </h6>
                                    <p className="font-weight  text mt-3 mb-4">  
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur accusantium, unde tempora atque nihil exercitationem necessitatibus modi minus sequi adipisci tenetur dolorum eos fuga, incidunt asperiores excepturi numquam maxime impedit.
                                    </p>
                            </div> 
                            



                    </div>
                        
           </div>  
         </div> 
         
    </div>
  );
  }
 }



Blog.propTypes = {
    getCurrentShoping : PropTypes.func.isRequired
   
  
  };

 const mapStateToProps = state => ({
    shopingfile: state.shopingfile,  
    errors: state.errors
  }
  );

  export default connect(mapStateToProps, { getCurrentShoping  })(
    Blog
  );
  

//export default Blog;
