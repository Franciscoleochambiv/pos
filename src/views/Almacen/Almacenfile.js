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
import { addAlmacensql } from '../../actions/almacenActions'

import { useForm } from 'react-hook-form'
import ViewAlmacen from './ViewAlmacen';

//import { Link } from 'react-router-dom';


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

const Almacen = () => {
  const classes = useStyles();

     const dispatch = useDispatch()
     const tip = useSelector (store => store.almacenfile.almacenfiles)     
     const [Entradas, setEntradas] = useState([])
     const {register, errors, handleSubmit} = useForm();

    const onSubmit = (data,e) => {
     // console.log(data)
        setEntradas([
            ...Entradas,
            data
        ])

        dispatch(addAlmacensql(data))
        e.target.reset();

    }    

 const nlen=tip.length;
 let ndata=0;


if (nlen>0){
 // alert(JSON.stringify(cate[0].codigo))
  ndata=parseInt(tip[0].codigo)+1

}
  

  //const ultimo = cate.filter(categoriafile => categoriafile.pop);
 // alert(ultimo)
  //currentTodos.map(l1 => (
  // / l1.codigo
 //  ))


  return (
    <div>
      <GridContainer>

        
        <GridItem xs={6} sm={6} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Almacen </h4>
              <p className={classes.cardCategoryWhite}>Complete la Información</p>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
            <CardBody> 
              <GridItem xs={6} sm={6} md={12}>
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

                    
                    
                      <label  style={{color:"black"}} >Empresa</label>
                        
                      <input
                        value='1'
                        type="text"
                        className="form-control"
                        name="empresa"
                        placeholder="Empresa"
                        ref={register({ required: true })}
                        readOnly
                      />
                    {errors.empresa && (
                        <div className="text-danger">Empresa is a required field</div>
                    )}

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


                    <label  style={{color:"black"}} >Dirección</label>
                        
                        <input
                          type="text"
                          className="form-control"
                          name="direccion"
                          placeholder="Direccion"
                          ref={register({ required: true })}
                        />
                      {errors.direccion && (
                          <div className="text-danger">Direccion is a required field</div>
                      )}
                      

                    
              </GridItem>       
              <GridItem xs={6} sm={6} md={12}>
                  <label  style={{color:"black"}} >Provincia</label>                  
                  <input
                     type="text"
                     className="form-control"
                     name="provincia"
                     placeholder="Provincia"
                     ref={register({ required: true })}
                  />
                 {errors.provincia && (
                     <div className="text-danger">Provincia is a required field</div>
                 )}  
                 <label  style={{color:"black"}} >Ciudad</label>                      
                 <input
                      type="text"
                      className="form-control"
                      name="ciudad"
                      placeholder="Ciudad"
                      ref={register({ required: true })}
                    />
                  {errors.ciudad && (
                      <div className="text-danger">Ciudad is a required field</div>
                  )}                   
                  <label  style={{color:"black"}} >Distrito      </label>                    
                  <input
                      type="text"
                      className="form-control"
                      name="distrito"
                      placeholder="Ciudad"
                      ref={register({ required: true })}
                    />
                  {errors.distrito && (
                      <div className="text-danger">Distrito is a required field</div>
                  )}
                  <label  style={{color:"black"}} >Telefono </label>                      
                  <input
                        type="text"
                        className="form-control"
                        name="tel"
                        placeholder="Telefono"
                        ref={register({ required: true })}
                      />
                    {errors.tel && (
                        <div className="text-danger">Telefono is a required field</div>
                    )}

              </GridItem>             
            </CardBody>
            <CardFooter>
              <Button color="info" type="submit" >Grabar</Button>
            </CardFooter>
           </form> 
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card profile>    
            
            <CardBody profile>
              <ViewAlmacen />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
export default Almacen

