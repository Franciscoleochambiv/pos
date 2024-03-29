//import React from "react";
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";


import  { useDispatch,useSelector } from 'react-redux'
import {
  getCurrentCategoria,deleteCurrentCategoria,updateCurrentCategoria  
} from "../../actions/categoriaActions";



const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

const TableList = () => {
  const dispatch = useDispatch()
  const cate = useSelector (store => store.categoriafile.categoriafiles) 

  
  
 console.log(Object.values(cate));
const data1=Object.values(cate);

  useEffect(() => {    
      // dispatch(getCurrentCategoria())
   });


//export default function TableList() {
  const classes = useStyles();
  return (
    <GridContainer>
      <button  onClick={()=> dispatch(getCurrentCategoria())}>Pulsa </button>
     
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Table on Plain Background
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Codigo", "Descripcion"]}
              datos={["codigo", "descripcion"]}
              tableData={data1}
       
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
export default TableList

/*tableData={[
  ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
  ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
  ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
  [
    "4",
    "Philip Chaney",
    "$38,735",
    "Korea, South",
    "Overland Park"
  ],
  [
    "5",
    "Doris Greene",
    "$63,542",
    "Malawi",
    "Feldkirchen in Kärnten"
  ],
  ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
]}

*/