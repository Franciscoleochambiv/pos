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
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

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


      <AppBar
      position="static"
      style={{ backgroundColor: "#FAFAFB", padding: 10 }}
    >
      <Toolbar>
        <div className="left-part">
          <IconButton
            onClick={() => {
              this.props.dispatch(toggleMenu());
            }}
          >
            <MenuIcon size="medium" />
          </IconButton>

          <img
            src={cartImage}
            alt={"Logo"}
            style={{ marginLeft: 10 }}

          />
          <TextField
            label="Search products"
            value={this.state.searchTerm}
            onChange={e => {
              this.setState({ searchTerm: e.target.value });
            }}
            style={{ marginLeft: 30, width: 250, marginBottom: 15 }}
          />

          <Select
            style={{ maxWidth: 200, marginLeft: 20 }}
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
            {categoryOptions}
          </Select>

          <Button
            style={{ marginLeft: 20 }}
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
            Search
          </Button>
        </div>
        <div className="right-part">
          {!this.props.loggedInUser ? (
            <Button
              variant="outlined"
              style={{ marginRight: 20 }}
              color="primary"
              onClick={() => {
                this.props.history.push("/login");
              }}
            >
              Log in
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
              Checkout page
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
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>

    
      
      
      




    
     
    );
  }
}

const Header = withRouter(connect(mapStateToProps)(ConnectedHeader));
export default Header;



/*








             












<AppBar className="botones"
    
style={{ backgroundColor: "#FAFAFB"}}
>
<Toolbar>
  <div className="left-part1">


  <div >
    
  



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
  </div>

    <IconButton
      onClick={() => {
        //alert("asdasd")
        this.props.dispatch(toggleMenu());
      }}
    >
      <MenuIcon size="medium" />
    </IconButton>

    <img
      src={cartImage}
      alt={"Logo"}
      style={{ marginLeft: 10 }}

    />
    <TextField
      label="Bus Prod"
      value={this.state.searchTerm}
      onChange={e => {
        this.setState({ searchTerm: e.target.value });

        
        this.props.history.push(
          "/?category=" +
          this.state.categoryFilterValue +
          "&term=" +
          this.state.searchTerm);


        

      }}

      className="texto"
    />

<div className="left-part2">

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
</div >     

   
  </div>



  
  
</Toolbar>
</AppBar>
















  <AppBar>
          <Toolbar>
           < div className="row mb-3">
           <div className="col-md-1 mx-auto ">
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


                 

           </div>    


          <div className="col-md-3 mx-auto">  
              <div className="btn-group">
                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Categorias
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">Categorias</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                  <div className="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Separated link</a>
                </div>
              </div>
  
          </div> 
          <div className="col-md-6 mx-auto">                            
              <div className="container">
              <TextField
                label="Bus Prod"
                value={this.state.searchTerm}
                onChange={e => {
                  this.setState({ searchTerm: e.target.value });

                  
                  this.props.history.push(
                    "/?category=" +
                    this.state.categoryFilterValue +
                    "&term=" +
                    this.state.searchTerm);


                  

                }}

                className="texto"
              />
                <input type ="text"  name="buscar" className="form-control" placeholder="Buscar "  /> 
              </div>
          </div>  
          <div className="col-md-2 mx-auto ">

           </div>      
      </div>    

      
      </Toolbar>

            
     </AppBar>       







*/