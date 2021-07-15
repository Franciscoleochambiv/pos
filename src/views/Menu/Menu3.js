import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import queryString from "query-string";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//import { dataForTheMenu } from "../../Data";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Icon from "@material-ui/core/Icon";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';


import Api from "../../Api";

const mapStateToProps = state => {
  return {
    showMenu: state.showMenu,
  };
};

class ConnectedMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initially item with id 1 is expanded
      expandedMenuItems: {
        1: true
      },
      dataForTheMenu:[]
    };

    this.renderMenu = this.renderMenu.bind(this)
  }


  async fetchData() {

    let resultscat = await Api.fetch_datacate();

    //console.log("opciones de cxweforia MWNU 2")


    let dataForTheMenu12 = [
     
      {
        name: "",
        id: 1,
        children: resultscat.map((x, i) => {
          return {
            name: x.descripcion,
            id: i,
            url: "/?category=" + x.descripcion,
            icon: "list"
          };
        })
      },
    
    ]; 

    //console.log(dataForTheMenu12)



    this.setState({
      dataForTheMenu:dataForTheMenu12,
    
    });

   
  }

  componentDidMount() {
    this.fetchData();
  }





  // This method determines from URL whether to highlight a menu item or not
  isMenuItemActive(item, location) {

    if (location.pathname === "/" && location.search) {
      let queryStringParsed = queryString.parse(
        location.search
      );

      return (
        item.name === queryStringParsed.category
      );
    }

    return item.url === location.pathname;
  }

  renderMenu(data) {

    return (
    
    
    <List>
      {data
        .map((x, i) => {          

          if (!x.children) {
            return (

            <li><a  style={{color:"white",fontSize:"12px"}} href={x.url}>{x.name}</a></li>
              
              )

          } else {
            return (
              
              <Fragment key={x.id}>
               
                <Collapse in={this.state.expandedMenuItems[x.id]} timeout="auto" unmountOnExit>
                  {this.renderMenu(x.children)}
                </Collapse>
              </Fragment>
            );
          }
       

        })}
    </List >)
  }


  render() {
  if (!this.props.showMenu) return null;
    return (
      <div >


            <div className="btn-group">
                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Categorias
                </button>
                
                <li class="dropdown">                      
                      <ul class="dropdown-menu columns">
                              {this.renderMenu(this.state.dataForTheMenu)}
                          
                      </ul>
                  </li>




              </div>



       





      </div>
    );
  }
}
const Menu3 = withRouter(connect(mapStateToProps)(ConnectedMenu));
export default Menu3;


/*


<NavLink
                to={x.url}
                exact
                isActive={(param, location) => { return this.isMenuItemActive(x, location) }}
                style={{
                  textDecoration: "none",
                  color: "rgb(32, 32, 34)",
                }}
                key={x.id}
                activeStyle={{
                  color: "#4282ad",
                  fontWeight: "bold"
                }}
              >
               {x.url} 

                <h1>hollas</h1>
                <ListItem dense button>
                  <ListItemIcon>
                    <Icon
                    >{x.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={<div style={{ color: "inherit" }} >{x.name}</div>} />
                </ListItem>


                
              </NavLink>





               <a className="dropdown-item" href={x.url}>{x.name}</a>

*/
