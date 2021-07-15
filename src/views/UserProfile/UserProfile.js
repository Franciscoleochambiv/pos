//import React from "react";
import React, { useState } from 'react'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";



import  { useDispatch,useSelector } from 'react-redux'
import { addCategoria } from '../../actions/categoriaActions'
import { useForm } from 'react-hook-form'
import ViewCate from '../../Components/ViewCate';




const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
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

const Categorias = () => {
  const classes = useStyles();

  const dispatch = useDispatch()
     const cate = useSelector (store => store.categoriafile.categoriafiles)     
     const [Entradas, setEntradas] = useState([])
     const {register, errors, handleSubmit} = useForm();

    const onSubmit = (data,e) => {
      console.log(data)
        setEntradas([
            ...Entradas,
            data
        ])

        dispatch(addCategoria(data))
        e.target.reset();

    }    

  const ndata=cate.length+1


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Categorias</h4>
              <p className={classes.cardCategoryWhite}>Complete la Información</p>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                <label  style={{color:"black"}} for="codigo">Codigo</label>

                <input
                    value={ndata}
                    type="Number"
                    className="form-control"
                    name="codigo"
                    placeholder="Enter Codigo"
                    ref={register({ required: true })}
                  />
                  {errors.codigo && (
                       <div className="text-danger">Codigo is a required field</div>
                    )}

                  
                </GridItem>
             
               
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                <label  style={{color:"black"}} for="descripcion">Descripcion</label>
                  
                <input
                   type="text"
                   className="form-control"
                   name="descripcion"
                   placeholder="Descripcion"
                   ref={register({ required: true })}
                />
               {errors.descripcion && (
                   <div className="text-danger">Descripcion is a required field</div>
              )}

                </GridItem>
              
              </GridContainer>
              <GridContainer>
               
             
                
              </GridContainer>
             
            </CardBody>
            <CardFooter>
              <Button color="primary" type="submit" >Grabar</Button>
            </CardFooter>
           </form> 
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card profile>
            
            <CardBody profile>
              <ViewCate />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
export default Categorias

