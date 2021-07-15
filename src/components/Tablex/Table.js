//import React from "react";
import React, { useState } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import ReactPaginate from 'react-paginate';
import Spinner from "../common/Spinner";
import Input from "@material-ui/core/Input";
import './dcs.css';
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, datos, tableHeaderColor } = props;

  //const [search, setSearch] = useState();
  const [search, setSearch] = useState("")
  const [currentPage, setcurrentPage] = useState(1);
  const [todosPerPage,settodosPerPage]= useState(5);
  const [selectedPage, setselectedPage] = useState(1)
  const {
    id,
    inputProps
  
  } = props;

  const handlePageClicked = data => {
    let selected = data.selected;
    setselectedPage(selected)
    let sumapagina=Number(selected+1)
    setcurrentPage(sumapagina)

  };


//  console.log(search);





  //const  categoriafiles  = tableData;
  const  categoriafiles = tableData;
  //const { currentPage, todosPerPage } = this.state;
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;            
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(categoriafiles.length / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  let filteredContacts=[];
  if (categoriafiles.length>1){
   filteredContacts = categoriafiles.filter(
    (task) =>{
        let poetName = task.codigo.toUpperCase()+task.descripcion.toUpperCase();
        let separador=" "; 
        let i;
        let poetName1=search.split(separador);
        let tpalabras=poetName1.length;    
        let datopa;  
        if (tpalabras>3){
            return  poetName.indexOf(search) !== -1;    

          }
        else{
              for (i=0;i<tpalabras;i++) {
                datopa=poetName1[i];             
                return poetName.indexOf(datopa) !== -1 ;             
                    }
              return poetName;
            }
        } //FIN EDL FUNCION MAP              
    
        );
      }
     else{
      filteredContacts=[];
     }
  
    console.log(filteredContacts)
    const Pagination = (
      <ReactPaginate 
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(filteredContacts.length / todosPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClicked}
        containerClassName={'react-paginate ul'}
        subContainerClassName={'react-paginate li'}
        activeClassName={'active'}
        
        />      
    )  
    const currentTodos = filteredContacts.slice(indexOfFirstTodo, indexOfLastTodo);
    let dashboardContent;
    let dashboardContent2;
    if (filteredContacts === null ) {
      dashboardContent = <Spinner/>;
    } else {
      

    }  






  return (
    <div className={classes.tableResponsive}>
       <Input
           type="text"
          onChange={e => setSearch(e.target.value)}
        
      />
      
      
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {

              currentTodos.map(l1 => (
                <TableRow key={l1._id} className={classes.tableBodyRow}>
                    <TableCell className={classes.tableCell}>{l1._id}</TableCell>
                    <TableCell className={classes.tableCell}>{l1.codigo}</TableCell>
                    <TableCell className={classes.tableCell}>{l1.descripcion}</TableCell>                          
                </TableRow>

               ))     
            }
                    
        </TableBody>

      
      </Table>
      {Pagination}
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};


