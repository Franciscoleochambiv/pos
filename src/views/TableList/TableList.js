import React, { useState } from 'react'


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";


import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";


import  { useDispatch,useSelector } from 'react-redux'
import { addTiposql,getCurrentTiposql } from '../../actions/tipoActions'
import { useForm } from 'react-hook-form'

import Button from "../../components/CustomButtons/Button.js";
import ViewTip from './ViewTip';

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

export default function TableList() {
  const classes = useStyles();

  const dispatch = useDispatch()
  const tip = useSelector (store => store.tipofile.tipofiles)     
  const [Entradas, setEntradas] = useState([])
  const {register, errors, handleSubmit} = useForm();

  
  //useEffect(() => dispatch(getCurrentTiposql), []);

 const onSubmit = (data,e) => {
  // console.log(data)
     setEntradas([
         ...Entradas,
         data
     ])

     dispatch(addTiposql(data))
     e.target.reset();

 }    

const nlen=tip.length;
let ndata=0;


if (nlen>0){
// alert(JSON.stringify(cate[0].codigo))
ndata=parseInt(tip[0].codigo)+1

}


  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Tipos de Documento</h4>
            <p className={classes.cardCategoryWhite}>
              Documentos Registrados
            </p>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}> 
          <CardBody>
          <GridItem xs={12} sm={12} md={5}>
                <label  style={{color:"black"}} >Codigo</label>

                  <input
                      defaultValue={ndata}
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
            <GridItem xs={12} sm={12} md={5}> 
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
            

            
          </CardBody>
          <CardFooter>
          <Button color="primary" type="submit" >Grabar</Button>     


          </CardFooter>
             
          </form>    
        </Card>
      </GridItem>

      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Listado de Documentos</h4>
            <p className={classes.cardCategoryWhite}>
              Listado
            </p>
          </CardHeader>
          <CardBody>
               <ViewTip />
          
          </CardBody>
        </Card>
      </GridItem>


     
    </GridContainer>
  );
}
