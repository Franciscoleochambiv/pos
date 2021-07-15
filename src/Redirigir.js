import React, { useEffect } from "react";

//import {  logoutUser } from './actions/authActions';
import { useHistory } from "react-router-dom";
import  { useSelector } from 'react-redux'


const Redirigir = () =>{
  
  let  history = useHistory();
  const loggedInUser = useSelector (store => store.auth.isAuthenticated) 
  const loggedInName = useSelector (store => store.auth.user)  
  let dashbo=""
  
  if (loggedInUser){
     dashbo= (
          <div>
           {history.push("/prod")}
          </div>

     )

  }
  else{
    dashbo= (
      <div>
          {history.push("/login")}


     </div>  
    )     

  }

    return (
        <div>
          {dashbo}
        </div>        

      
   ) 
  }
  export default Redirigir

//{history.push("/login")}