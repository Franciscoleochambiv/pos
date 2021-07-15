import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardMedia from '@material-ui/core/CardMedia';
import CardFooter from "../../components/Card/CardFooter.js";
import  { useDispatch,useSelector } from 'react-redux'
import { addArticulosql} from '../../actions/articuloActions'
import { getCurrentClientesql } from "../../actions/clienteActions";
import {
  getCurrentLineasql
} from "../../actions/lineaActions";

import {
  getCurrentCategoriasql
} from "../../actions/categoriaActions";

import {
  getCurrentUmedidasql
} from "../../actions/umedidaActions";

import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import NumberFormat from "react-number-format";
import axios from "axios";
import ViewArticuloHooks from './ViewArticuloHooks';

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


function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      // isNumericString
    />
  );
}


const Articulo = () => {
  const classes = useStyles();
  const ruta="http://adryan2.sytes.net:7002/upload/";





//let unidad="https://localhost";
//let unidad="https://adryan2.sytes.net:5000";
//let unidad="https://apisfsystem.herokuapp.com";
let unidad="https://adryan2.sytes.net:7001";


     const dispatch = useDispatch()
     const tip = useSelector (store => store.articulofile.articulofiles)   
     const cliente = useSelector (store => store.clientefile.clientefiles)   
     const linea = useSelector (store => store.lineafile.lineafiles)   
     const categoria = useSelector (store => store.categoriafile.categoriafiles)   
     const umedida = useSelector (store => store.umedidafile.umedidafiles)   

     const [ file,setFile ]= useState("");
    
     const [ pathImage,setPathImage ]= useState(ruta+"upload.png");

     const [ nimagen,setNimagen ] = useState(ruta+"upload.png");

     


     //const [count, setCount] = useState(0);

     const [prove, setProve] = useState({
      codigo:1, 
      descripcion: "Varios"

     });
     const [line, setLine] = useState({
       codigo:1,
       descripcion:"Marca"
     });
     const [cate, setCate] = useState({
       codigo:1,
       descripcion:"Categoria"
     });

     const [uni, setUni] = useState({
      codigo:1,
      descripcion:"NIU"
    });

     //const {register, errors, handleSubmit} = useForm();
    // const inputRef = useRef();

 
   
    const handleChange = event => {
      //setValues(parseFloat(event.target.value));
      setDatos({
        ...datos,
        [event.target.name]:parseFloat(event.target.value)
      })
    };
    


    const sendImage = (e) => {
            e.preventDefault()      
            const form = new FormData()            
            form.append('file',file,'form-data')
            console.log(form)
            axios
                  .post(unidad+"/api/upload/", form)
                  .then(function (response) {                                          
                      setNimagen(ruta+response.data)
                      
                    })
                    .catch(function (error) {
                      console.log(error);
                    }) 
          
        
          setFile("")  
          setPathImage("http://adryan2.sytes.net:7002/upload.png")     

    }

    const onFileChange = (e) =>{
        if(e.target.files && e.target.files.length > 0) {
             const file = e.target.files[0]        
             if(file.type.includes("image")){
                 const reader = new FileReader()
                 reader.readAsDataURL(file)
                 
                 reader.onload = function load() {
                     setPathImage(reader.result)  

                 }
                 setFile(file)
              
              }
              else{
                  console.log("ha ocurrido un error")
               
              }

        } 

    }

     
     const nlen=tip.length;
      let ndata=0;

      if (nlen>0){      
        ndata=parseInt(tip[0].codigo)+1      

      }
      const [datos,setDatos]=useState({
        codigo:ndata,
        descripcion:'',
        costo:0,
        precio:0,
        proveedor:'',
        linea:'',
        grupo:'',
        imagen:'',
        codigostock:'',
        precio1:0,
        precio2:0,
        stockm:0,
        UM_ID:"1",
        detalle:'',
        fecha_cad:'',
 
      })
      

      useEffect(() => {
       // setCount(ndata)
        dispatch(getCurrentClientesql())
        dispatch(getCurrentLineasql())
        dispatch(getCurrentCategoriasql())
        dispatch(getCurrentUmedidasql())
         },[dispatch])
       
  
    const   handleInputChange=(event)=>{
       setDatos({
         ...datos,
         [event.target.name]:event.target.value
       })

      


     }

     const enviarDatos=(event) =>{
            event.preventDefault();                      
            let incodigo=datos.codigo.toUpperCase();
              incodigo=incodigo.trim();  

            /*  
            let solucion = tip.filter(
              (task) =>{
                let poetName = (task.codigo.toString()).toUpperCase();  
                poetName=poetName.trim();              
                //let poetName1=datos.codigo;
                    return  poetName.indexOf(incodigo) !== -1;                  
              }   
             )
            */ 

            let solucion = tip.filter(task => (task.codigo.toString()).toUpperCase() === incodigo ); 
             
            if (solucion.length > 0){
              alert("El codigo Ya existe ")
              return
            
            }
            else{
          
                    //let data2={codigo:count}
                    dispatch(addArticulosql(datos,prove,line,cate,nimagen,uni))
                    setProve({
                      codigo:1, 
                      descripcion: "Varios"
                
                    });
                    setLine({
                      codigo:1,
                      descripcion:"Marca"
                    });
                    setCate({
                      codigo:1,
                      descripcion:"Categoria"
                    });
                    setUni({
                      codigo:1,
                      descripcion:"UNI"
                    });
                    setNimagen(ruta+"upload.png")
                    
                    setDatos({
                      costo:0,
                      precio:0,
                      precio1:0,
                      precio2:0,
                      stockm:0,
                      
                    })

                    event.target.reset();

                }       
        

     }
     
  
  return (
    <div>
        
    
      <GridContainer>
        <GridItem  xs={6} sm={6} md={6}>
        
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Articulos</h4>
              <p className={classes.cardCategoryWhite}>Complete la Información</p>
            </CardHeader>
            <form onSubmit={enviarDatos}>
               
                <TextField
                  type="text"
                  label="Codigo"
                  id="codigo"
                                                   
                  className={classes.textField}
                  helperText="Codigo del Articulo"
                  margin="dense"
                  variant="outlined"
                  name="codigo"                  
                  inputProps={{ autoFocus: true }}
                  
                  onChange={handleInputChange}
                 // onFocus={() => setCount(ndata)}
                  
                  />

              <TextField
                  type="text"
                  label="Codigo Stock"
                  id="codigostock"                  
                  className={classes.textField}
                  helperText="Stock Minimo"
                  margin="dense"
                  variant="outlined"
                  required
                  name="codigostock"
                  onChange={handleInputChange}
                />     
   
                
              <TextField
                type="text"
                id="descripcion"
                label="Descripción del Articulo"
                required
                name="descripcion"
                onChange={handleInputChange}
                style={{ margin: 8,width:"95%"}}
                placeholder="Descripcion"
                helperText="Nombre de la Descripcion"
                fullWidth
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              <TextField
                type="text" 
                id="imagen"
                label="Imagen"
                name="imagen"
                value={nimagen}
                //value={file.name}
                required
                onChange={handleInputChange}
                style={{ margin: 8,width:"95%"}}
                placeholder="Imagen"
                helperText="Imagen"
                fullWidth
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />

                    <TextField
                      type="file"
                      id="imagen"
                      className={classes.textField}
                      margin="dense"
                      variant="outlined"
                      name="imagen"                  
                      onChange={onFileChange}
                    />
                    <Card>
                          <CardMedia
                          className={classes.media}
                          image={pathImage}
                          title="Contemplative Reptile"
                        />
                         <Button 
                      size="sm"  
                      color="info"
                      onClick={sendImage}
                      
                      >
                      Subir Imagen
                    </Button>

                    </Card>

             
             
                 <TextField
                type="text" 
                id="detalle"
                multiline
                rowsMax={3}
                label="Detlle"
                name="detalle"
                onChange={handleInputChange}
                style={{ margin: 8,width:"95%"}}
                placeholder="Detalle"
                helperText="detalle"
                fullWidth
                margin="dense"
                required
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />

               <TextField
               type="text" 
               value={datos.costo.toFixed(2)}
               
                id="costo"
                label="Costo"
                name="costo"
                onChange={handleChange}               
                placeholder="Costo"
                helperText="Costo"
                required
                className={classes.textField}                
                margin="dense"


                InputProps={{
                  inputComponent: NumberFormatCustom
                }}

                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
               <TextField
                 type="text" 
                 value={datos.precio.toFixed(2)}
                id="precio"
                label="Precio"
                name="precio"
                onChange={handleChange}
                className={classes.textField}                
                placeholder="Precio"
                helperText="Precio"                
                required
                margin="dense"
                InputProps={{
                  inputComponent: NumberFormatCustom
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />

              <TextField
                type="text" 
                id="precio1"
                value={datos.precio1.toFixed(2)}
                label="Precio Distribuidor"
                name="precio1"
                className={classes.textField}                
                onChange={handleChange}                
                placeholder="Precio Distribuidor"
                helperText="Precio Distribuidor"                
                required
                margin="dense"
                InputProps={{
                  inputComponent: NumberFormatCustom
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />

            <TextField
                type="text" 
                id="precio2"
                value={datos.precio2.toFixed(2)}
                label="Precio x Mayor"
                name="precio2"
                className={classes.textField}                
                onChange={handleChange}                
                placeholder="Precio Mayor"
                helperText="Precio Mayor"                
                required
                margin="dense"
                InputProps={{
                  inputComponent: NumberFormatCustom
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              

                <TextField
                  type="text" 
                  label="Stock Minimo"
                  id="stockm"                  
                  value={datos.stockm.toFixed(2)}
                  className={classes.textField}
                  helperText="Stock Minimo"
                  margin="dense"
                  variant="outlined"
                  required
                  name="stockm"
                  onChange={handleChange}
                  InputProps={{
                    inputComponent: NumberFormatCustom
                  }}
                />   
                 <Autocomplete
                  id="uni"
                  options={umedida}
                  name="uni"
                  freeSolo      
                  value={uni}
                  onChange={(event, newValue) => {
                    setUni(newValue);
                  }}      
                  //getOptionSelected={(option, value) => option.descripcion === value.descripcion}      
                  getOptionLabel={(option) => option.descripcion}
                  //getOptionLabel={option => option.descripcion?option.descripcion:option}
                  style={{ width:"95%" }}
                  renderInput={(params) => <TextField {...params}    className={classes.textField} margin="dense" label="Unidad de Medida" variant="outlined" />}
                  />  

                 


                <Autocomplete
                  id="prove"
                  options={cliente}
                  name="prove"
                 
                  freeSolo      
                  value={prove}
                  onChange={(event, newValue) => {
                    setProve(newValue);
                  }}      
                  //getOptionSelected={(option, value) => option.descripcion === value.descripcion}      
                  getOptionLabel={(option) => option.descripcion}
                  //getOptionLabel={option => option.descripcion?option.descripcion:option}
                  style={{ width:"95%" }}
                  renderInput={(params) => <TextField {...params}    className={classes.textField} margin="dense" label="Cliente Proveedor" variant="outlined" />}
                  />

                  <Autocomplete
                  id="line"
                  options={linea}
                  name="line"
                  freeSolo      
                  value={line}
                  onChange={(event, newValue) => {
                    setLine(newValue);
                  }}      
                  //getOptionSelected={(option, value) => option.descripcion === value.descripcion}      
                  getOptionLabel={(option) => option.descripcion}
                  style={{ width:"95%" }}
                  renderInput={(params) => <TextField {...params}    className={classes.textField} margin="dense" label="Lineas /Marcas" variant="outlined" />}
                  />
                  <Autocomplete
                  id="cate"
                  options={categoria}
                  name="cate"
                  freeSolo      
                  value={cate}
                  onChange={(event, newValue) => {
                    setCate(newValue);
                  }}      
                 // getOptionSelected={(option, value) => option.descripcion === value.descripcion}      
                  getOptionLabel={(option) => option.descripcion}
                  style={{ width:"95%" }}
                  renderInput={(params) => <TextField {...params}    className={classes.textField} margin="dense" label="Categorias" variant="outlined" />}
                  />  

               
                 <TextField
                
                  type="date"
                  id="fecha_cad"                  
                  className={classes.textField}
                  helperText="Fecha"
                  margin="dense"
                  variant="outlined"
                  name="fecha_cad"
                  required
                  onChange={handleInputChange}
                /> 
           
            <CardFooter>
              <Button color="primary" type="submit" >Grabar</Button>
            </CardFooter>
           </form> 
          </Card>

        </GridItem>
      
      
      </GridContainer>



      <GridContainer>
      <GridItem xs={12} sm={6} md={12}>

          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Articulos Edición /Eliminación</h4>
              <p className={classes.cardCategoryWhite}>Listado Edición /Eliminación</p>
            </CardHeader>

            <ViewArticuloHooks />
            
            
            
          </Card>
        </GridItem>

      </GridContainer>




    </div>
  );
}
export default Articulo

