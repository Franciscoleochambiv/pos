import axios from "axios";



//let unidad="https://localhost";
//let unidad="https://adryan2.sytes.net:5000";
//let unidad="https://apisfsystem.herokuapp.com";
//let unidad="https://adryan2.sytes.net:7001";

import { unidad } from "../variables";



//router.get('/test', (req, res) => res.json({msg: 'Profile works!'}));


export const sendImages = (file) =>  {

    // console.log(name)
    console.log("estot en el actions")
     console.log(file.name)
     var nombre=file.name

    const form = new FormData()
    //form.append('name',name)
    form.append('file',file,'form-data')
    console.log(form)
  axios
    .post(unidad+"/api/upload/", form)
    .then(function (response) {
        // handle success
        console.log(response);
        //response.json()
        //response.send(archivo)
        

      
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      }) 
  //  .then(res.send(file))

      
    
};


