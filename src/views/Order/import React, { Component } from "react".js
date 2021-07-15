import React, { Component } from "react";



import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";


import { connect } from "react-redux";
import Button from "@material-ui/core/Button";



import Table from "@material-ui/core/Table";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";




import { setCheckedOutItems,deleteCart } from "../../actions/ventasActions";





import socketIOClient from "socket.io-client";




import axios from 'axios';

import { CulqiProvider, Culqi } from "react-culqi";

import {NumerosaLetras} from "./funciones1.js";




const ENDPOINT = "https://apichat200.herokuapp.com";



const ENDPOINT1 = "https://adryan2.sytes.net:3001";

//const ENDPOINT1 = "https://apipancho.herokuapp.com";

const ENDPOINT2 = "https://adryan2.sytes.net:3500";


const ENDPOINT3 = "https://localhost:3010";


const mapStateToProps = state => {
  return {
    checkedOutItems: state.cartItem.checkedOutItems
    //checkedOutItems: state.checkedOutItems
  };
};



// This component shows the items user checked out from the cart.
class ConnectedOrder extends Component {

  constructor() {
    super();
    this.state = {
        loading: true,
        stripeLoading: true,
        nom:"",
        telf:"",
        dire:"",
        clientedata:"",
        mostrar:true,
        boto:false,
        dni:"",
        email:"",
        messages: [],
        namex:"web",
        items1:{},
        unumero:"",
        idventatot:"",
        rbusca:false,
        idcliente:"",
        estadop:"",
        paseo:"0",
        age:"0",
        bstripe:"0",
        adcli:"0",
        loading1:false
        //isOpen: true  


    };
    // onStripeUpdate must be bound or else clicking on button will produce error.
    
    // binding loadStripe as a best practice, not doing so does not seem to cause error.
    
   this.onLogout = this.onLogout.bind(this);
   this.onChange = this.onChange.bind(this);
   this.onBusca = this.onBusca.bind(this);


   this.onBusca1 = this.onBusca1.bind(this);

   //this.ongrabaCliente = this.ongrabaCliente.bind(this);
   //ongrabaCliente()

   
   this.seleccion = this.seleccion.bind(this);

   this.PEnter = this.PEnter.bind(this);

   
   
   //this.fetchDni = this.fetchDni.bind(this);
   
}


PEnter(event){ 
    if (event.key === 'Enter') {
      let longi=this.state.dni.length;
      this.setState({
       loading1:true
   
      });
   
      this.fetchRuc(this.state.dni)  
      this.setState({
        boto:false
      });
   
      
    }
}



seleccion(event) {
  event.preventDefault();
  let op =event.target.value;
  this.fetchnumero(op)
  this.setState({
    age: op,
    boto:false
  });
};




onLogout() {
  this.props.history.Push('/');
}



async fetchDni(data) {
  //console.log(data)


  this.setState({
    adcli:"0"

   }) 

  const llamada2 = await fetch('https://dniruc.apisperu.com/api/v1/dni/'+data+'?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImdydXBvODBwckBnbWFpbC5jb20ifQ.cPdYTOafYcdlXPBGBrAUPl9FGTkHpc0dPW1FcH10Plg')
  const data2 = await llamada2.json()

  //let resultscat = await Api.fetch_dni();
 // c//onsole.log(resultscat)
 let array2={};
 
//alert("estyoy en dni")
//setTimeout(() => {  alert("World!"); }, 2000);

 if (data2==undefined){

  this.setState({
    adcli:"0",
    loading1:false,          
    estadop:"DNI no Encontrado"

   })

 }
 else{

 // console.log(data2[0])
   array2={
     PVCL_RazonSocial:data2.nombres,

   }
   this.fetchcodigo();
     

  this.setState({
    clientedata: array2,
    nom:data2.nombres+" "+data2.apellidoPaterno+" "+data2.apellidoMaterno,
    dire:"",
    email:"",
    telf:"",
    dni:data2.dni,
    //idcliente:"1",
    mostrar:false,
    rbusca:true,
    paseo:1,
    adcli:"1"

   // isOpen:false  
    
    
  });



 }


  
  
}



async fetchRucsunat(data) {

  this.setState({
    adcli:"0"

   }) 


  const llamada2 = await fetch(ENDPOINT1+'/api/shoping1/sunat/'+data)
  const data2 = await llamada2.json()

  //let resultscat = await Api.fetch_dni();
 // c//onsole.log(resultscat)

        console.log(data2)

        if (data2[0]==undefined){

          this.setState({
            adcli:"0",
            loading1:false,          
            estadop:"Ruc no Encontrado"
        
           })
        

        }

        else{


           this.fetchcodigo();
          // alert(this.state.idcliente)




          this.setState({
            clientedata: data2[0],
            //nom:"francisco",
            //mostrar:false
            nom:data2[0].c2,
            dire:data2[0].c6+" "+data2[0].c7+" "+data2[0].c10+" "+data2[0].nombre+" "+data2[0].departamento,
            email:"",
            telf:"",
            dni:data2[0].c1,
           // idcliente:"1",
            mostrar:false,
            rbusca:true,
            paseo:1,         //   isOpen:false
            adcli:"1"
            
            
          });


          //grabar el cliente en la tabla



       }
  
}


async fetchRuc(data) {
  const llamada2 = await fetch(ENDPOINT1+'/api/shoping1/cliente/'+data)
  const data2 = await llamada2.json()

  //let resultscat = await Api.fetch_dni();
  console.log(data2[0])

if (data2[0]==undefined){
  this.setState({
    rbusca:false,
    nom:"",
    dire:"",
    email:"",
    telf:"",  
    idcliente:"",  
    estadop:"Buscando en otros Origenes"
  })

      if (data.length==8){
         this.fetchDni(data)


      }
      else if(data.length==11){
       this.fetchRucsunat(data)
        
      }
      else{

        alert("El Dni debe tener 8 caracteres y el ruc 11")
        this.setState({
          loading1:false,
          
        estadop:"El dato Ingresado para la busqueda es invalido"
      })

        
      }


}

else{


  this.setState({
    clientedata: data2[0],
     nom:data2[0].PVCL_RazonSocial,
     dire:data2[0].PVCL_Direccion,
     email:data2[0].PVCL_Email,
     telf:data2[0].PVCL_Telefono,
     dni:data2[0].PVCL_NroDocIdentidad,
     idcliente:data2[0].PVCL_Id,
     mostrar:false,
     rbusca:true,
     paseo:"0"
  });  
  
}    
    
  
  console.log(data2[0])

  
  
}


//http://adryan2.sytes.net/shopingweb/api2.php?codigo=20455772011




async fetchnumero(data) {
  //console.log(data)
  //alert(data)

if(data==0){
  

}
else{
  const llamada2 = await fetch(ENDPOINT1+'/api/shoping1/numero/'+data)
  const data2 = await llamada2.json()
  let numero1=parseInt(data2[0].Numero)+1;
  this.setState({
    unumero:parseInt(data2[0].Numero)+1
    
  });

  
  if(data=="1"){
    if (this.state.dni.length==11){
      alert("se genero el Numero de Factura "+numero1)      
    } 
    else{
      alert("Para la factura debe ingresar un RUC valido ")  

      this.setState({
      //  dni:""        
       })   
      // this.onChange();    
    }
   
  }
  else if(data=="3"){
    alert("se genero el Numero de Boleta "+numero1)

  }
  else{
    alert("se genero el Numero de Pedido "+numero1)

  }




}
  

  //console.log("busacamos el ultimo numero ")
  
//  console.log(data2[0].Numero)

  
}


async fetchcodigo() {
  //console.log(data)
  //alert("generamos el codigo")

  const llamada2 = await fetch(ENDPOINT1+'/api/shoping1/codcli')
  const data2 = await llamada2.json()

  console.log(data2[0])


  this.setState({

    idcliente:parseInt(data2[0].id)+1
    
  });
  

  //alert(this.state.idcliente)
  //console.log("busacamos el ultimo numero ")
  
//  console.log(data2[0].Numero)

  
}




async fetchidventa9000(data) {


  try {
  const response =  await axios.get(ENDPOINT1+'/api/shoping1/idventa/'+data)
  console.log(response.data[0].DVC_ID)
  this.setState({
    idventatot:response.data[0].DVC_ID
    
  });



  return response.data[0].DVC_ID;
  
  /*.then(function (response) {
    // handle success
    console.log(response);
  })
*/
  }

  catch (error) {
    console.log(error);

}
}



//async fetch 





async fetchidventa400(id,data) {


  console.log("estos on los datos que pasamos a idventa")
  console.log(data)


  let numero = parseInt(id)-1;

  const llamada2 = await fetch(ENDPOINT1+'/api/shoping1/idventa',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'id='+"'"+id+"'"+'&'+'items='+"'"+data+"'"
    //body: 'id='+numero+'&items='+data
})

const data2 = await llamada2.json()
 
  //console.log("obtenemos el dato de id ")
    //console.log(data2[0].DVC_ID)
  
}



ongrabaCliente(){
 //llamda del api para la grabacion del cliente
// alert("grabamos al cliente")
 
}


fetchidventa(id,data,age) {
  console.log("estos on los datos que pasamos a idventa")
  console.log(data)


  let numero = parseInt(id);


  axios.post(ENDPOINT1+'/api/shoping1/idventa', {            
            id:numero,            
            items:this.props.checkedOutItems,
            age:age
        })              
    .then(res =>  
      console.log("que paso")

    )
}

  






async fetchidaumenta(data,age) {
  //console.log(data)

 // alert(age)

  axios.post(ENDPOINT1+'/api/shoping1/idaumenta', {            
    id:data,            
    age:age
})              
.then(res =>  
console.log("que paso")

)

.catch(function(err) {
  //console.error(err);
});
  
}



onChange(e) {


  this.setState({ 
    [e.target.name]: e.target.value
    //paseo:"0"
   });



 //console.log([e.target.value])
 
}

onBusca() {
   let longi=this.state.dni.length;
   this.setState({
    loading1:true

   });

   this.fetchRuc(
                      
    this.state.dni)  
   this.setState({
     boto:false
   });

}



onBusca1() {

//  alert(this.state.age);



  var mensaje=0;

if (this.state.dni.length==0){
  mensaje="1";
    
}
if(this.state.nom.length==0){
     mensaje="1";
}   

if(this.state.dire.length==0){
  mensaje="1";
}


if(this.state.email.length==0){
  mensaje="1";

}


if(this.state.telf.length==0){
  mensaje="1";
}

if (this.state.age==1){
  if (this.state.dni.length==11){
    mensaje="0";
  }
 else{
  mensaje="1";
 }

}  




if (mensaje=="1"){
   alert("Ingrese todos los datos requeridos ");

}

else{

     this.setState({
      boto:true

       
     });
 
  }

 
 }



 
 


componentDidMount() {


 let historia =this.props.history;

 this.socket = socketIOClient(ENDPOINT);
  //,{origins: allowedOrigins})
    this.socket.on('message', message => {
      this.setState({ 
        messages: [message, ...this.state.messages],        
      
      })
    })
    




}








 formatPrice = ({ amount, currency, quantity }) => {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  amount = zeroDecimalCurrency ? amount : amount / 100;
  const total = (quantity * amount).toFixed(2);
  return numberFormat.format(total);
};



handleSubmitm = event => {
  const body = event.target.value
  if (event.keyCode === 13 && body) {
    const message = {
      body,
      from: 'Me'
    }


    this.setState({ messages: [message, ...this.state.messages]})

    //io.sockets.emit( 'message', { name: data.name, message: data.message } );
    this.socket.emit('message', { name: 'pancho', message: 'web' })
    event.target.value = ''
  }
}










  render() {

    function mathRound2 (num, decimales = 2) {
      //Respuesta de Rubén modificada por mí para el caso general y números negativos
      var exponente = Math.pow(10, decimales);
      return (num >= 0 || -1) * Math.round(Math.abs(num) * exponente) / exponente;
    }



    function zfill(number, width) {
      var numberOutput = Math.abs(number); /* Valor absoluto del número */
      var length = number.toString().length; /* Largo del número */ 
      var zero = "0"; /* String de cero */  
      
      if (width <= length) {
          if (number < 0) {
               return ("-" + numberOutput.toString()); 
          } else {
               return numberOutput.toString(); 
          }
      } else {
          if (number < 0) {
              return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
          } else {
              return ((zero.repeat(width - length)) + numberOutput.toString()); 
          }
      }
  }
  



    let totalPrice = this.props.checkedOutItems.reduce((accumulator, item) => {
      return accumulator + item.precio * item.quantity;
    }, 0);

    let totalPriceculqi=totalPrice*100; 



    //console.log(this.props.checkedOutItems)

    let totalfactura=(mathRound2(totalPrice)).toFixed(2);         
    let totaligv=(mathRound2(totalPrice)-mathRound2(totalPrice/1.18)).toFixed(2); 
    let totalvventa=(mathRound2(totalPrice/1.18)).toFixed(2); 

    





    //llenar el objeto
    var items2=[];

    this.props.checkedOutItems.map((item, index) => {

     items2[index]={
                  unidad_de_medida:"NIU",
                  quantity: item.quantity,
                  unit_price:(mathRound2(item.precio)).toFixed(2),         
                  tax:(mathRound2((item.precio*item.quantity)-(item.precio*item.quantity/1.18))).toFixed(2),
                  item_tax:(mathRound2(item.precio*item.quantity/1.18)).toFixed(2),
                  product_name:item.descripcion,
                  real_unit_price:(mathRound2(item.precio/1.18)).toFixed(2)
        }
       }
    )

    //console.log(items2)


    

    const messages = this.state.messages.map((message, index) => {
      return <li key={index}>
        <b>{message.from}: {message.body}</b>
      </li>
    });
    
    let  dashboardContent;
    let  dashboardContent3;
    let mensa="";
    let paso="1";   
    let habilitar=1; 
    var f=new Date();
    var fecha= f.getFullYear()+ "-" + zfill((f.getMonth() +1),2) + "-" + zfill(f.getDate(),2);

   // alert(fecha);



     if (this.state.dni.length==0){
          paso="0";
     }

     if(this.state.nom.length==0){
          paso="0";
      }   
      if(this.state.email.length==0){
            paso="0";
      
      }
      if(this.state.dire.length==0){
          paso="0";
      }
      if(this.state.telf.length==0){
        paso="0";
      }
      else{
        mensa="Ingrese los datos requeridos";
      }
      
  

    //if (this.state.isOpen){

    //alert(this.state.age)


    console.log(this.state.age)


    
      if (this.state.boto){

         console.log("esto e spaseo  2")
         console.log(this.state.paseo)
        // let datacodcli='1';

         //if (this.state.paseo==1){
          if (this.state.adcli=="1"){
          axios.post(ENDPOINT1+'/api/shoping1/codcli', {           
                    nom:this.state.nom,
                    dire:this.state.dire,
                    telf:this.state.telf,
                    email:this.state.email,
                    dni:this.state.dni                  
                })              
                .then(res =>  
                 
                  //datacodcli=(res.data[0].id)+1
                //  this.fetchcodigo()
                console.log("qwqw")



                )
                .catch(err =>
                  console.log(err)
                 )

             
         }
         else{
         // datacodcli=this.state.idcliente;


         }

        
                console.log("aqui estanos con el nuevo valor")
                 if(this.state.age=="0") {
                          alert("Debe Seleccionar un tipo de Documento")    

                 }


                 else{ 
                     let inilet="";
                     if (this.state.age=="1"){
                           inilet="F"
                     }
                     else if  (this.state.age=="3"){   
                      inilet="B"
                     }
                     else  {
                      inilet="P"
                     }


                  
                //desde aqui procedimiento de grabacion del comprobante 
              
                  axios.post(ENDPOINT1+'/api/shoping1/card3', {

                  //   axios.post('http://localhost:3001/api/shoping1/card1', {                                    
                          amount:totalPriceculqi ,
                          id:this.state.unumero,
                          nom:this.state.nom,
                          dire:this.state.dire,
                          telf:this.state.telf,
                          email:this.state.email,
                          dni:this.state.dni,
                          items:this.props.checkedOutItems,
                          idcliente:this.state.idcliente,
                          paseo:this.state.paseo,
                          age:this.state.age
                      })              
                      .then(res =>  

                         
                             this.fetchidventa(this.state.unumero,this.props.checkedOutItems,this.state.age),
                             this.fetchidaumenta(this.state.unumero,this.state.age),
                             
                              axios.post(ENDPOINT2+'/api/notes', {                                                                       
                                        items:items2,
                                        title :"10309611131-0"+this.state.age+"-"+inilet+"008"+"-"+this.state.unumero,
                                        content:"za",
                                        author:"FRANCISCO LEO CHAMBI VILCA",
                                        date:fecha,
                                        serie:inilet+"008",
                                        numero:this.state.unumero,
                                        fecha_de_emision:fecha ,
                                        total_letras:NumerosaLetras(totalPrice)+ " SOLES",
                                        rucemisor:"10309611131",
                                        proveedor:"sfsystemblog.herokuapp.com",
                                        razonemisor:"FRANCISCO LEO CHAMBI VILCA",
                                        provincia:"AREQUIPA",
                                        ciudad:"AREQUIPA",
                                        distrito:"CERRO COLORADO",
                                        diremisor:"AV GARCILAZO DE LA VEGA 806 URB MARISCAL C.",
                                        cliente_numero_de_documento:this.state.dni,
                                        cliente_denominacion:this.state.nom,
                                        cliente_direccion:this.state.dire,
                                        total_igv:totaligv,
                                        total_gravada:totalvventa,
                                        total:totalfactura,
                                        tipo_de_comprobante:"0"+this.state.age,
                                        porcentaje_de_igv:"18",
                                        moneda:"PEN",
                                        email:this.state.email    
                                       
                                    })              
                                    .then(res =>

                                    

                                      //this.props.history.push("/")
                                      this.props.history.push("/pdf/"+"10309611131-0"+this.state.age+"-"+inilet+"008"+"-"+this.state.unumero+".pdf"),
                                      this.socket.emit('message', { name: this.state.nom, message: 'Factura en La Web' }),                      
                                      this.props.dispatch(deleteCart([])),                                      
                                      this.props.history.push("/prod")

                                    )
                                    .catch(err =>
                                       console.log(err)
                                      )


                      )

                      ///hasta aqui

                 
           
          }


     }


    if (paso=="1"){
                
                if (this.state.age==1){
                      if (this.state.dni.length==11){
                        paso="1";
                      }
                      else{
                        paso=0;
                      }                
                }  


                else if(this.state.age=="0") {

                  paso=0   

                  }
                else{
                  
                   }   //FIEN DEL ELSE DE CULQUI         





    }
    else{

      dashboardContent = (                    
              <h1>vacio</h1>
      )
      

    
    }

     
   let mbusca;
   
   if (this.state.rbusca){

   
      mbusca=(

        <div className="form-row c" >
            <div className="col-12 cabeceracolornaranja" >

              
                <h5>Nombre/Razon Social {this.state.nom}</h5>
                <h5>Direccion {this.state.dire}</h5>  
                <input 
                    name ="dire"
                    onChange={this.onChange}
                  
                  type="text" className="form-control" id="exampledi" aria-describedby="emailHelp" placeholder="Direccion"/> 


             
                <h5>Email {this.state.email}</h5>                  
                <input 
                    name ="email"
                    onChange={this.onChange}            
                    type="email" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"                  
                   />   
  
                <h5>Telefono  {this.state.telf}</h5>
                <input 
                name ="telf"
                onChange={this.onChange}            
                type="text" className="form-control" id="exampledi" aria-describedby="emailHelp" placeholder="Telefono"
                />

                <h5></h5>
  
  
  
                
            </div>
           
  
        </div>             
  
       )



 



     

   }
  else{
    mbusca=(
        <div className="form-row" style={{backgroundColor:"red",color:"white"}}>
            <div className="col">

            
            {this.state.loading1 ? ( 

              <CircularProgress className="circular" />
            
              
              ):             
             (

                  <h5>No se Encontraron Datos   : {this.state.estadop}</h5>


             )}

          



                
            </div>
      </div>      
    )       

  }

    
    
 
    

    return (
      <div style={{ padding: 10 }}>

          {mbusca}

      
          <div className="cardnuevo cabeceracolor">
           <Table>
           <TableRow>
              
                  <TableCell>Lista de Productos</TableCell>
                  
                  
           </TableRow>             
            </Table>  
            
          </div>      

        <div  className="prod-container1 cardnuevo " style={{ fontSize: 12, marginTop: 10 }}>
          
        
        <Table>
        
            <TableRow>
          
              <TableCell style={{ fontSize: 14, color: 'black' }}>Item</TableCell>
              <TableCell style={{ fontSize: 14, color: 'black' }}>Precio</TableCell>
              <TableCell style={{ fontSize: 14, color: 'black' }}>Cantidad</TableCell>
              <TableCell style={{ fontSize: 14, color: 'black' }}>Total</TableCell>
              
            </TableRow>
              
         
          <TableBody>
            {this.props.checkedOutItems.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.descripcion}</TableCell>
                  <TableCell>{item.precio}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.quantity*item.precio}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        </div>  
        Total Precio S/. {totalPrice} 

       
       

        <div class="form-row">
            <div class="col">
                
                  <label for="exampledni">DNI/RUC</label>
                  <input 
                      name ="dni"
                      onChange={this.onChange}    
                      onKeyPress={this.PEnter}                     
                      type="text" className="form-control" id="exampledni" aria-describedby="emailHelp" placeholder="Numero Dni"/>
                      <small id="emailHelp" className="form-text text-muted">Documento de Identidad</small>

             </div>




               <Button
                  color="primary"
                  variant="outlined"
                  disabled={habilitar === 0}
                 
                  onClick={

                    this.onBusca

                    
                  
                  }
                  style={{ margin: 5, marginTop: 30 }}
                   >
                  Buscar
              </Button>

              <select  style={{ margin: 5, marginTop: 30 }}  value={this.age} onChange={this.seleccion}>
                               <option  style={{"colo":"red"}}value="0">
                               Seleccione
                               </option>
                               <option value="1">
                               Facturas
                               </option>
                               <option value="3">
                               Boletas
                               </option>
                               <option value="5">
                               Pedidos
                               </option>
                               
                               
                           </select>           

            
            
        </div>
        <div className="cardnuevo ">
        <Table>
           <TableRow>              
              <TableCell>            
                {dashboardContent} 
              </TableCell>
              <TableCell>            
                 


               </TableCell>    
               <TableCell>            
                  <Button
                    color="primary"
                    variant="outlined"
                    disabled={totalPrice === 0 } 
                    onClick={

                      this.onBusca1
                    
                    }
                   
                  >
                    Efectivo
                  </Button>
                </TableCell>        
                <TableCell>            
                    <Button
                      color="secondary"
                      variant="outlined"
                      disabled={totalPrice === 0}
                      onClick={() => {

                            this.props.dispatch(setCheckedOutItems([]))
                            this.props.dispatch(deleteCart([]))
                            this.props.history.push("/")

                        
                      }}
                    
                    >
                      Descartar
                    </Button>
                 </TableCell>            
        </TableRow>      
      </Table> 
     </div> 
        
      </div>
    );
  }
}
const Order = withRouter(connect(mapStateToProps)(ConnectedOrder));

export default Order;
//<CircularProgress className="circular" />
// <div
//style={{
 // color: "#504F5A",
 // marginLeft: 5,
 // marginTop: 50,
 // fontSize: 22
//}}
//>
//Total Precio S/. {totalPrice} 

//<div
 //   style={{
  //    marginLeft: 5,
   //   fontWeight: "bold",
    //  whiteSpace: "nowrap",
     // overflow: "hidden",
     // textOverflow: "ellipsis"
   // }}
 // >
 // Dolares Precio  $  {(totalPrice/3.5).toFixed(2)} 
    
 // </div>




//</div>