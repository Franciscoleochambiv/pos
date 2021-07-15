import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';



class Navbar extends Component {

  

    componentDidMount() {
        
      }




  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
    
      <div  >
      <ul id="nav-mobile" className="nav justify-content-end"  >

              <li className="nav-item">
                 <Link  to="/menu">
                     Inicio
                  </Link>
              
              </li>   

             
             
                       
              <li className="nav-item">
                 <Link  to="/nosotros">
                     Nosotros
                  </Link>
              
              </li> 
              <li className="nav-item">
              <Link to="/privacidad">
                Privacidad
              </Link>
                </li>
                
                <li className="nav-item">
                  <Link  to="/contacto">
                    Contacto
                  </Link>
                </li>       
                    
              <li className="nav-item">
                 <Link  to="/blog">
                    Blog
                  </Link>
               </li>

              


               <li className="nav-item">
                 <Link  to="/dashboard">
                     Dashboard
                  </Link>
               </li>
               <li className="nav-item">
                <a
                  href="/login"
                  onClick={this.onLogoutClick.bind(this)}
                  className="nav-link"
                >
                  <img
                    className="rounded-circle"
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: '25px', marginRight: '5px'}}
                    title="You must have a gravatar connected to your email to display an image"/>
                  {' '}Logout -- {user.name}
                  
                </a>
              </li>
          </ul>
       </div>

    );

    const guestLinks = (

      

      <ul id="nav-mobile" className="nav justify-content-end"  >
        <li className="nav-item">
          <Link className="nav-link" to="/menu">
            Inicio
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/blog">
            Blog
          </Link>
        </li>

       
              
        
        <li className="nav-item">
          <Link className="nav-link" to="/nosotros">
            Nosotros
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/privacidad">
            Privacidad
          </Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link" to="/contacto">
            Contacto
          </Link>
        </li>
        

        

        

        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
  <div>

      <nav  style={{backgroundColor: "white",paddingBottom:5,color:"black"}} > 
             
         { isAuthenticated ? authLinks : guestLinks }
  
            
    </nav>



      
      </div>   
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logoutUser, clearCurrentProfile
})(Navbar);
