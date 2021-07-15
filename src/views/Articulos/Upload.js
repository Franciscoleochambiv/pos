import React, { useState} from "react";
import {sendImages} from "../../actions/uploadActions";
//import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});



const Upload=({setImages,Images}) => {
    const classes = useStyles();
    const [ name,setName ]= useState("");
    const [ file,setFile ]= useState("");
    const [ pathImage,setPathImage ]= useState("https://localhost:7001/api/upload/upload.png");


    


    const sendImage = (e) => {
          e.preventDefault()
          sendImages(file)    
          setFile("")  
          setPathImage("https://localhost:7001/api/upload/upload.png")     

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


    console.log(file.name)
    return(
         <form>
             
             <Card className={classes.root}>
      <CardActionArea>


      <TextField
                  type="file"
                  id="imagen"
                  
                  className={classes.textField}
                  
                  margin="dense"
                  variant="outlined"
                  name="imagen"                  
                
                  
                  onChange={onFileChange}
                  
                  
                  />

        <CardMedia
          className={classes.media}
          image={pathImage}
          title="Contemplative Reptile"
        />


       
      </CardActionArea>
      <CardActions>
       
        <Button 
           size="small"  
           color="primary"
           onClick={sendImage}
           
           >
          Enviar
        </Button>
      </CardActions>
     </Card>
            
         </form>


    )

}

export default Upload