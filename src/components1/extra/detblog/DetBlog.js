import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//import ProfileHeader from './ProfileHeader';
//import ProfileAbout from './ProfileAbout';
//import ProfileCreds from './ProfileCreds';
//import ProfileGithub from './ProfileGithub';
import Spinner from '../../common/Spinner';
import { getShopingByHandle } from '../../../actions/shopingActions';




//import FB from 'fb';
//import { FacebookProvider, Like } from 'react-facebook';








class DetBlog extends Component {
  componentDidMount() {
   // window.location.reload();
    
    if (this.props.match.params.handle) {
      this.props.getShopingByHandle(this.props.match.params.handle);
    }
  }
 
   
  actualiza(){                                                                                                                                                                                                                                           
    window.location.reload()
  }
 


  
  componentWillReceiveProps(nextProps) {
    if (nextProps.shopingfile.shopingfile === null && this.props.shopingfile.loading) {
      this.props.history.push('/not-found');
    }                           
  }

  render() {

         // window.location.reload(); 

   
    const { shopingfile, loading } = this.props.shopingfile;
    let shofileContent;


   // let texto = JSON.stringify(shopingfile.description);
 //   console.log(texto.length)
//

//    let  texto2 = (          
 //     currentTodos.map(l1 => (
  //      console.log(texto)
   //   ))
    //)

    
    


    if (shopingfile === null || loading) {
      shofileContent = <Spinner />;
       //window.location.reload();

    } else {
     shofileContent = (
        <div>
          <div >
            <div className="col-md-6">
              
              <Link to="/blog" className="btn btn-info btn-light mb-3 float-left light-blue darken-2">
                
                Ir a Blog
              </Link>
            </div>




            
                        <section className="view intro-video">    
                                  
                                  <div className="hm-gradient">
                                  <div className="full-bg-img">
                                      <div className="container flex-center">
                                      <div className="row pt-5 mt-3">
                                          

                                          <div className="col-lg-12 wow fadeIn">
                                          <h3 className="align center">{shopingfile.name}</h3>

                                          {shopingfile.popular &&

                                          <div className="embed-responsive embed-responsive-16by9 wow fadeInRight">
                                              
                                            <iframe class="embed-responsive-item" src={shopingfile.imageUrls}
                                              allowfullscreen></iframe>    
                                          </div>

                                          ||

                                          <img className="img-fluid" src={shopingfile.imageUrls}/>  

                                          }

                                          </div>
                                          <div className="col-lg-12 wow fadeIn mb-5 text-center text-lg-left">
                                          <div className="black-text">

                                              <br>
                                              </br>

                                              <p  className="text-justify"  style={{fontSize:"20px"}}>{shopingfile.description} . . .</p>
                                              
                                              
                                          
                                                                              
                                          </div>
                                          </div>
                                      </div>
                                      </div>
                                  </div>
                                  </div>

                                  
                      </section>

            </div>
        </div>
      )
    }

    return (
      <div >
        <div >
          <div className="col-mb-8">          
            {shofileContent}
            
          </div>
          <div className="col-mb-8">
          <div className="container flex-center">
         
            <button class="btn btn-info btn-block mt-4 01579b light-blue darken-2" onClick={this.actualiza} >Comentar en Facebook</button>
                 <div className="row pt-5 mt-3">
                 <div className="fb-comments" 
                   data-href="https://sfsystemfactura.000webhostapp.com" 
                   data-numposts="5" 
                   data-width="100%" 
                   data-order-by="reverse-time" 
                   ></div>
                 </div>
                 </div>
          </div>

          
                        
        </div>
      </div>
    );
  }
}

DetBlog.propTypes = {
  getShopingByHandle: PropTypes.func.isRequired,
  shopingfile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  shopingfile: state.shopingfile
});

export default connect(mapStateToProps, { getShopingByHandle })(DetBlog);