import React, { useState } from 'react'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import  { useDispatch,useSelector } from 'react-redux'
import { addCategoriasql } from '../../actions/categoriaActions'

import { useForm } from 'react-hook-form'
//import ViewVenta from './ViewCate';




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

const Ventafile = () => {
  const classes = useStyles();

  const dispatch = useDispatch()
     const cate = useSelector (store => store.categoriafile.categoriafiles)     
     const [Entradas, setEntradas] = useState([])
     const {register, errors, handleSubmit} = useForm();

    const onSubmit = (data,e) => {
      //console.log(data)
        setEntradas([
            ...Entradas,
            data
        ])

        dispatch(addCategoriasql(data))
        e.target.reset();

    }    

 const nlen=cate.length;
 let ndata=0;


if (nlen>0){
 // alert(JSON.stringify(cate[0].codigo))
  ndata=parseInt(cate[0].codigo)+1

}
  

  //const ultimo = cate.filter(categoriafile => categoriafile.pop);
 // alert(ultimo)
  //currentTodos.map(l1 => (
  // / l1.codigo
 //  ))


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Categorias</h4>
              <p className={classes.cardCategoryWhite}>Complete la Información</p>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                <label  style={{color:"black"}} >Codigo</label>

                <input
                    value={ndata}
                    type="Number"
                    className="form-control"
                    name="codigo"
                    placeholder="Enter Codigo"
                    ref={register({ required: true })}
                    readOnly
                  />
                  {errors.codigo && (
                       <div className="text-danger">Codigo is a required field</div>
                    )}

                  
                </GridItem>
             
               
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                <label  style={{color:"black"}} >Descripcion</label>
                  
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
              <Button color="success" type="submit" >Grabar</Button>
            </CardFooter>
           </form> 
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card profile>
            
            <CardBody profile>
           
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
export default Ventafile

