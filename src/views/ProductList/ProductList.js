import React, { Component } from "react";
import Item from "../Item/Item"
import CircularProgress from "@material-ui/core/CircularProgress";
import queryString from "query-string";
import Api from "../../Api";
import Paging from "../Paging/Paging";
import ProductsHeader from "../ProductsHeader/ProductsHeader"
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";



import { makeStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';




import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';


import { connect } from "react-redux";

import { addItemInCart } from "../../actions/ventasActions";


import { withRouter } from "react-router-dom";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";











// This component is responsible for fetching products. It determines from query string which products to fetch.
// The URL is checked on initial mount and when URL changes.
class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      totalItemsCount: null,
      items: []
    };
    this.updateQueryString = this.updateQueryString.bind(this);

  }



  toggleModal = (id) => {

      //alert("escojioo "+id)
      this.props.history.push("/details/" + id);
   
   }   

   toggleModal1 = (id,codigo,precio,descripcion) => {

    //alert("escojioo "+id)


    /*
onClick={e => {
                                      e.stopPropagation();
                                      this.props.dispatch(
                                        addItemInCart({ ...this.props.item, quantity: 1 })
                                      );
                                    }}
                                  


    */
    this.props.history.push("/details/" + id);
 
 }   



  async fetchData() {

    this.setState({ loading: true });

    // Parse the query string
    let qsAsObject = queryString.parse(this.props.location.search);
    //console.log("este es el resultado de la barra")

    //console.log(qsAsObject)
    
    console.log("estes es el dato a bausdca")
    console.log(qsAsObject)



    let results = await Api.searchItems(qsAsObject);

    this.setState({
      items: results.data,
      loading: false,
      totalItemsCount: results.totalLength
    });
  }
  

  
  componentDidMount() {
    this.fetchData();
  }

  updateQueryString(newValues) {
    let currentQS = queryString.parse(this.props.location.search);
    let newQS = { ...currentQS, ...newValues };
    this.props.history.push("/prod/?" + queryString.stringify(newQS));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    let currentQS = queryString.parse(this.props.location.search);
    let oldQS = queryString.parse(prevProps.location.search);
    
    let areSameObjects = (a, b) => {
      if (Object.keys(a).length !== Object.keys(b).length) return false;
      for (let key in a) {
              if (a[key] !== b[key]) return false;
      }
      return true;
    }


    // We will refetch products only when query string changes.
    if (!areSameObjects(currentQS,oldQS )) {
      this.fetchData();
    }
  }

  render() {
    
    let parsedQS = queryString.parse(this.props.location.search);

    //console.log(this.props);

    if (this.state.loading) {
      return (
        <CircularProgress className="circular" />
      );
    }


    const useStyles = makeStyles({
      table: {
        minWidth: 250,
                
      
      },

      tableCell:{
          backgroundColor:"#00acc1",  

      },
      root: {
        '& .MuiTextField-root': {
          
          width: '25ch',
        },
      },  
    });    
    const classes = useStyles;

    let dash="";

    if (this.state.items.length>0){
           dash=(             
               this.state.items.map(l1 => (                                 
                  <TableRow key={l1.codigo} className={classes.tableBodyRow}>
                              <TableCell className={classes.tableCell}>{l1.codigo}</TableCell>        
                              <TableCell className={classes.tableCell}>{l1.descripcion}</TableCell>                         
                              <TableCell className={classes.tableCell}>{l1.precio}</TableCell>                                                            
                              <TableCell className={classes.tableCell}>
                                  <button type="button"  onClick={this.toggleModal.bind(this,l1.id)}  ><EditIcon  color="primary" /></button>                                         
                              </TableCell>
                              
                  
                  </TableRow>    
                
              
               )
           )
           )
    }



    return (
    <GridContainer style={{marginTop:"7px"}}>

          
                  <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <ProductsHeader
                      parsedQS={parsedQS}
                      updateQueryString={this.updateQueryString}
                      totalItemsCount={this.state.totalItemsCount} />

                    <div style={{ flex: 1 }}>
                      {this.state.items.map(item => {
                        return <Item key={item.id} item={item} />;
                      })}
                    </div>

                    <Paging
                      parsedQS={parsedQS}
                      updateQueryString={this.updateQueryString}
                      totalItemsCount={this.state.totalItemsCount}
                    />
                  </div >

    
             </GridContainer>     
       



     
    );
  }
}

//export default ProductList;
export default withRouter(connect()(ProductList));


/*

,overflowX:"auto",overflowY:"auto"

                                           <TableCell style={{color:"white"}}>Escojer</TableCell>                                                                      

<TableCell className={classes.tableCell}>
                                  <button type="button"  
                                     onClick={this.toggleModal1.bind(this,l1.id,l1.codigo,l1.precio,l1.descripcion)}                                                                                                         
                                    ><EditIcon  color="secondary" /></button>                                         
                              </TableCell>
*/