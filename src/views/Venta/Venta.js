
import React, { useEffect,useState } from 'react'
import  { useDispatch,useSelector } from 'react-redux'

import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";



const styles = {
     cardCategoryWhite: {
       color: "rgba(255,255,255,.62)",
       margin: "0",
       fontSize: "14px",
       marginTop: "0",
       marginBottom: "0"
     },
     root: {
       maxWidth: 445,
     },
     media: {
       height: 100,
       marginTop: "0",
     },
     cardTitleWhite: {
       color: "#FFFFFF",
       marginTop: "0px",
       minHeight: "auto",
       fontWeight: "300",
       fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
       marginBottom: "3px",
       textDecoration: "none"
     }
   };
   
   const useStyles = makeStyles(styles);
   
 

 const Ventas = () => {

     let  history = useHistory();

    

    return(
       <div>
         {history.push("/prod")}
       </div>  
      

    )
}
export default Ventas
////  {this.props.history.push("/prod")}