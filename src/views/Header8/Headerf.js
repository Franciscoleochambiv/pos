import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./Header.css";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  showCartDlg,
  toggleMenu,
  logout
} from "../../Redux/Actions";
import cartImage from "../../Images/logo2.png";
import Auth from "../../Auth";



import { categories } from "../../Data";



import Api from "../../Api";

//import {fetch_datacate} from "../../Api";

import Person from "@material-ui/icons/PersonOutline";
import Avatar from "@material-ui/core/Avatar";
//import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "../../Components/Menu/Menu";

import Header2 from "./header2";

const mapStateToProps = state => {
  return {
    nrOfItemsInCard: state.cartItems.length,
    loggedInUser: state.loggedInUser
  };
};

// Option items for product categories

const categoryOptions = categories.map(x => {
  return (
    <MenuItem key={x.name} value={x.name}>
      {x.name}
    </MenuItem>
  );
});



class ConnectedHeader extends Component {
  constructor(){
    super();
    this.state={
      informacate:"",
      searchTerm: "",
      anchorEl: null,
      categoryFilterValue:""
    };

  }


  async fetchData() {

    //this.setState({ loading: true });

    // Parse the query string
    //let qsAsObject = queryString.parse(this.props.location.search);

    let resultscat = await Api.fetch_datacate();
    console.log(resultscat[0].descripcion)

   // console.log("daytos de la api")
   // console.log("xxxxxxxxxx")
   // console.log(resultscat)

    this.setState({
      informacate: resultscat,
      categoryFilterValue:resultscat[0].descripcion
    
    });

   // console.log(this.state.informacate)
  }
  
  
  
  componentDidMount() {
    this.fetchData();
   
  }

  render() {
    let { anchorEl } = this.state;

     
    let caracol ="";


    //console.log("rederizado0")


    if (this.state.informacate.length!==0){

      //console.log(this.state.informacate.length)
      //console.log(this.state.informacate[0]._id)


      caracol = this.state.informacate.map(x => (
        <MenuItem key={x.descripcion} value={x.descripcion}>
         {x.descripcion}
         
       </MenuItem>
         )
      )
       
    }
    

    

   

    ///let  caracol = cate.map(l1 => (
      //    <h1>{l1._id}</h1>

    //)
      //{
      //return (
       // {x}
        //<MenuItem key={x.name} value={x.name}>
         // {x.name}
        //</MenuItem>
     // );
    //}
    //);

    return (


      <div>
      

       <AppBar
       position="static"
       style={{ backgroundColor: "#FAFAFB", padding: 10 }}
       >
       

        < div className="row mb-3">
           <div className="col-md-1 mx-auto  d-flex flex-row bd-highlight mb-3 ">

           <IconButton 
                  aria-label="Cart"
                  onClick={() => {
                    this.props.dispatch(showCartDlg(true));
                  }}
                >
                  <Badge badgeContent={this.props.nrOfItemsInCard} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
            </IconButton>
            <img
              src={cartImage}
              alt={"Logo"}
              style={{ marginLeft: 10 }}

            />
                <Menu style={{top: "15",}} />

            

            </div>
          



        



        
            
         
 

            
          <div className="col-md-4 mx-auto  d-flex flex-row bd-highlight mb-3" >            
           
          
         



            <TextField 
              label="Buscar Productos"
              value={this.state.searchTerm}
              onChange={e => {
                this.setState({ searchTerm: e.target.value });

                
                this.props.history.push(
                  "/?category=" +
                  this.state.categoryFilterValue +
                  "&term=" +
                  this.state.searchTerm);


                

              }}
              
            />
            

     


            <Select 
             
              value={this.state.categoryFilterValue}
              MenuProps={{
                style: {
                  maxHeight: 500
                }
              }}
              onChange={e => {
                this.setState({ categoryFilterValue: e.target.value });
              }}
            >



              
              {caracol}



            </Select>



            <Button
              className="mx-auto"
              variant="outlined"
              color="primary"
              onClick={() => {
                this.props.history.push(
                  "/?category=" +
                  this.state.categoryFilterValue +
                  "&term=" +
                  this.state.searchTerm
                );
              }}
            >
              {" "}
              Buscar
            </Button>
            </div>  
          
           




            <div className="col-md-4 mx-auto  d-flex flex-row bd-highlight mb-4" >    
          
            {!this.props.loggedInUser ? (
              <Button
              className="mx-auto"
                variant="outlined"
                
                color="primary"
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                Ingresar
              </Button>
            ) : (
                <Avatar
                  onClick={event => {
                    this.setState({ anchorEl: event.currentTarget });
                  }}
                  style={{ backgroundColor: "#3f51b5", marginRight: 10 }}
                >
                  <Person />
                </Avatar>
              )}
            
            </div>


            </div> 
      
            </AppBar>
      </div> 
     
    );
  }
}

const Header = withRouter(connect(mapStateToProps)(ConnectedHeader));
export default Header;


/*

 <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => {
                this.setState({ anchorEl: null });
              }}
            >
              <MenuItem
                onClick={() => {
                  this.setState({ anchorEl: null });
                  this.props.history.push("/order");
                }}
              >
                Página de pago
              </MenuItem>
              <MenuItem
                onClick={() => {
                  Auth.signout(() => {
                    this.props.dispatch(logout());
                    this.props.history.push("/");
                  });
                  this.setState({ anchorEl: null });
                }}
              >
                Salir
              </MenuItem>
            </Menu>

*/