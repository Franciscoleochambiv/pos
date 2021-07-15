import React, { useEffect } from "react";
import GridContainer from "./components/Grid/GridContainer.js";
import {  logoutUser } from './actions/authActions';
import { useHistory } from "react-router-dom";
import  { useDispatch } from 'react-redux'

const Salir = () =>{
  const dispatch = useDispatch()
  let  history = useHistory();
  useEffect(() => {    
    dispatch(logoutUser())   
   },[dispatch])

    return (

             <GridContainer> 
                    {history.push("/login")}

                </GridContainer>  
   ) 
  }
  export default Salir

