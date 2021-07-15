import React, { Component } from "react";



import { withRouter } from "react-router-dom";


//import { browserHistory } from 'react-router';


import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

//import TextInput from "@material-ui/core/TextInput";


import Table from "@material-ui/core/Table";
//import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { setCheckedOutItems,deleteCart } from "../../actions/ventasActions"
import CircularProgress from "@material-ui/core/CircularProgress";




import socketIOClient from "socket.io-client";




import axios from 'axios';



import  CulqiCheckout  from '../../culqi/checkout';
import { Culqi } from '../../culqi/context';

//import { CulqiProvider, Culqi } from "react-culqi";



//import {Link} from 'react-router';


//import { loadStripe } from "@stripe/stripe-js";


const ENDPOINT = "https://apichat200.herokuapp.com";
//const ENDPOINT = "http://localhost:3001";

const mapStateToProps = state => {
  //console.log(state)
  //console.log(state.cartItem.checkedOutItems)
  return {
    checkedOutItems: state.cartItem.checkedOutItems
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
        dni:"",
        email:"",
        messages: [],
        namex:"web",
        orden:"300",
        stadorden:false


    };
    // onStripeUpdate must be bound or else clicking on button will produce error.
    this.onStripeUpdate = this.onStripeUpdate.bind(this);
    // binding loadStripe as a best practice, not doing so does not seem to cause error.
    this.loadStripe = this.loadStripe.bind(this);
   this.onLogout = this.onLogout.bind(this);
   this.onChange = this.onChange.bind(this);
   this.onBusca = this.onBusca.bind(this);

   this.loadCulqi = this.loadCulqi.bind(this);
   
   //this.fetchDni = this.fetchDni.bind(this);
   
}







onLogout() {
  this.props.history.Push('/');
}



async fetchDni(data) {
  //console.log(data)

  const llamada2 = await fetch('https://dniruc.apisperu.com/api/v1/dni/'+data+'?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImdydXBvODBwckBnbWFpbC5jb20ifQ.cPdYTOafYcdlXPBGBrAUPl9FGTkHpc0dPW1FcH10Plg')
  const data2 = await llamada2.json()

  //let resultscat = await Api.fetch_dni();
 // c//onsole.log(resultscat)

  this.setState({
    clientedata: data2,
    //nom:"francisco",
    mostrar:false
    
    
  });


  //console.log(this.state.clientedata.dni)

  

  
}




loadStripe(onload) {
  if(! window.StripeCheckout) {
      const script = document.createElement('script');
      script.onload = function () {
          console.info("Stripe script loaded");
          onload();
      };
      script.src = 'https://checkout.stripe.com/checkout.js';
      document.head.appendChild(script);
  } else {
      onload();
  }
}


loadCulqi(onload) {
  if(! window.CulqiCheckout) {
      const script = document.createElement('script');
      script.onload = function () {
          console.info("Stripe script loaded");
          onload();
      };
      script.src = 'https://checkout.culqi.com/v3';
      document.head.appendChild(script);
  } else {
      onload();
  }
}




onStripeUpdate(e) {

  // const respuesta =  ()=>basketCheckout();

   //alert(respuesta);
  // console.log(this.state.nom)


//alert(this.state.dni.length);

var mensaje=0;

if (this.state.dni.length==0){
     mensaje="1";
}
if(this.state.nom.length==0){
     mensaje="1";
}   
if(this.state.email.length==0){
      mensaje="1";

}
if(this.state.dire.length==0){
  mensaje="1";
}
if(this.state.telf.length==0){
  mensaje="1";
}

if (mensaje=="1"){
   alert("Ingrese todos los datos requeridos ");

}


else{
 



   
  this.stripeHandler.open({
      name: 'Stripe',
      description: 'Sf System',
      panelLabel: 'Aceptar',
      allowRememberMe: false,
  });



 // alert("limpiar la pantalla")
 
  

  e.preventDefault();
}  
}

componentWillUnmount() {
  if(this.stripeHandler) {
      this.stripeHandler.close();
      //this.Culqi.close();

      
  }
}

onChange(e) {


  this.setState({ [e.target.name]: e.target.value });


 //console.log([e.target.value])
 
}

onBusca() {
 // this.setState({ [e.target.name]: e.target.value });
  // console.log(this.state.dni.length)
   let longi=this.state.dni.length;
   if (longi==8){
    // console.log("nmero de dni")
     this.fetchDni(this.state.dni)
   }
   else{
    this.setState({
     mostrar:true,
     nom:""
      
      
    });

   }

}


componentDidMount() {

  //console.log("motramops la proiedad hystiory")
 // console.log(this.props.history)
 let historia =this.props.history;




   this.loadStripe(() => {

    let totalPrice1 = this.props.checkedOutItems.reduce((accumulator, item) => {
      return accumulator + item.precio * item.quantity;
    }, 0);
    totalPrice1=(totalPrice1/3.5).toFixed(2)

    

    let totalPrice2=totalPrice1*100;
   // console.log("vamos a enviar el total dela comrap")  
   // console.log(totalPrice2)

      this.stripeHandler = window.StripeCheckout.configure({
          key: 'pk_test_V3wwavZxY5oaELRLH3WwXMV600lIcw7q12',
          //key: 'pk_live_VJEFQHQ7ddJCU9scSJ3BOBgW00ISCs1hSw',
          image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
          locale: 'auto',
          type:"card",
          charge:"1099",
          token: (token) => {
              this.setState({ loading: true });
              // use fetch or some other AJAX library here if you dont want to use axios
              // const { data } = await axios.post("/api/charge", { id, amount: 1099 });





              axios.post('https://apisfsystem.herokuapp.com/api/shoping1/card', {

            // axios.post('http://localhost:3001/api/shoping1/card', {
                  stripeToken: token.id,
                  amount: totalPrice2,
                  id:token.id,
                  nom:this.state.nom,
                  dire:this.state.dire,
                  telf:this.state.telf,
                  email:this.state.email,
                  dni:this.state.dni,
                  items:this.props.checkedOutItems
                  
                  //checkedOutItems
                  //historia:historia
              })              
              .then(res =>  
                // alert("Proceso Exitoso"),
               //   alert(this.state.nom),
               this.socket.emit('message', { name: this.state.nom, message: 'Pedido en La Web' }),
                 this.props.dispatch(deleteCart([])),
                historia.push("/")
                
                


              )
                  //this.setState({ isLoading: false });
                   //this.props.history.push('/');
              
              //)
              .catch(err =>
                 console.log(err)
              );
              
            //  historia.push("/")  

          }
      });
      this.setState({
          stripeLoading: false,
          // loading needs to be explicitly set false so component will render in 'loaded' state.
          loading: false,
      });
  });

 // this.props.history.push('/')

 //var allowedOrigins = "http://localhost:63342";
//var client = io('http://127.0.0.1:15674/stomp', {
  //  origins: allowedOrigins // I think it should be written like this right? Otherwise there would be syntax error
//
//<h1>Hello World</h1>
//<input
 //   type="text"
  //  placeholder='Enter a message'
   // onKeyUp={this.handleSubmitm}/>
//{messages}


//});


///var allowedOrigins = "http://localhost:3001";
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


 aleatorio=(a,b)  => {
  return Math.round(Math.random()*(b-a)+parseInt(a));
  }



orden = () => {

  let registro = Date.now();



  let vfecha=registro+ 24*60*60;
  let fecha=vfecha.toString();
  fecha=fecha.substr(0,10);
  let fecha1=parseInt(fecha)+ 24*60*60;
  console.log(fecha1);
  let npedido=Math.round(Math.random()*(99999999-10)+parseInt(10));

  
  

  axios.post('https://api.culqi.com/v2/orders', {
    "amount": 1000,
    //"id": "ord_live_xjmEW4dIyJM9G4cl",
    "id": "ord_live_xjmEW4dIyJM9G4cl",
    "currency_code": "PEN", 
    "description": "Venta desde react ", 
    "object":"order",
    "order_number": "pedido-"+npedido, 
    "client_details": {
      "first_name": "francisco", 
      "last_name": "chambi ", 
      "email": "grupo80pr@gmail.com", 
      "phone_number": "+51945145288"
    }, 
    "expiration_date": fecha1,
    //"1603828542",
    "confirm": false
      
    }
    ,{headers:{
                      
      "Accept": "application/json",
      "authorization": "Bearer sk_test_t58X2Ftu1iNNwGnq"
    // "authorization": "Bearer sk_live_mUtqkRNdpGcxZKlo"

    }}
    )     
    .then(res =>  
      (       
      //  alert("Orden gemerada"),
      //  alert(JSON.stringify(res.data.id)),
       this.setState({
         orden:res.data.id
        
      })              
      ///return res.data.id

      ))
      //return this.state.orden
      

    
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
    //nrOfItemsInCard: state.cartItem.cartItems.length,

    //console.log(this.props)
    let totalPrice = this.props.checkedOutItems.reduce((accumulator, item) => {
      return accumulator + item.precio * item.quantity;
    }, 0);

    let totalPriceculqi=totalPrice*100; 


    const messages = this.state.messages.map((message, index) => {
      return <li key={index}>
        <b>{message.from}: {message.body}</b>
      </li>
    });
    
    let  dashboardContent;
    let  dashboardContentp;
    let mensa="";
    let paso="1";   
    let habilitar=0; 


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
      
     






    if (paso=="1"){

            //  let idor=this.orden();
              console.log(this.state.orden)

              var lolo = this.state.orden

               if (lolo=="300"){

                dashboardContent = (
                  
          
                  <CircularProgress className="circular" />
        

                )



               }
               else{
                dashboardContent = (
                  
                  <CulqiCheckout 
                 publicKey='pk_test_O59G9vGlAQH9jBaw'
                 // publicKey='pk_live_eQF8fdTUL6NxHYeu'      
                  amount={totalPriceculqi}
                  title="Mi Pago"
                  description="Venta "
                  currency='PEN'
                  order={lolo}

              
                  
                  
                  
                  onToken={token => {
                    //alert("token")
                    //alert(JSON.stringify(token))
                    //alert(this.state.nom)
                    //alert(this.state.dire)
                    //alert(this.state.telf)

                    console.log("token received", token.id);
                    

                    axios.post('https://api.culqi.com/v2/charges', {
                      source_id: token.id,
                      amount: totalPriceculqi,
                      currency_code: "PEN",
                      email: token.email,           
                      antifraud_details:{
                        first_name:this.state.nom,
                        //last_name:this.state.nom,
                        address:this.state.dire,
                        phone:this.state.telf
                      
                        

                      }
                        },{headers:{
                          
                          "Accept": "application/json",
                         "authorization": "Bearer sk_test_t58X2Ftu1iNNwGnq"
                         // "authorization": "Bearer sk_live_mUtqkRNdpGcxZKlo"

                        }}
                        )              
                        .then(res =>  
                          ( 
                            axios.post('https://apisfsystem.herokuapp.com/api/shoping1/card1', {

                            //   axios.post('http://localhost:3001/api/shoping1/card1', {                                    
                                    amount:totalPriceculqi ,
                                    id:token.id,
                                    nom:this.state.nom,
                                    dire:this.state.dire,
                                    telf:this.state.telf,
                                    email:this.state.email,
                                    dni:this.state.dni,
                                    items:this.props.checkedOutItems
                                })              
                                .then(res =>  
                                  
                                 // onCulqiEvent = "string ",
                                 // onClose(),
                                 
                                   this.socket.emit('message', { name: this.state.nom, message: 'Pedido en La Web' }),
                                   this.props.dispatch(deleteCart([])),
                                   this.props.history.push("/")
                  
                                )
                             




                           )
                           //,
                           
                         //  this.socket.emit('message', { name: this.state.nom, message: 'Pedido en La Web' }),
                          // this.props.dispatch(deleteCart([])),
                           //this.props.history.push("/")
                           
                        )  



                  }}

                  onOrder={order => {
                    alert("tenemos la opcion token")
                    alert(order)
                    
                  }}
        




                  onError={error => {
                    console.error("something bad happened", error);
                    alert(error)
                  }}
                  // Uncomment `options` to see customizations take place
                  options={{
                    
                  }}


                >
                  <div>
                    <Culqi>
                      {({ openCulqi, setAmount, amount }) => {
                        return (
                          <div>
                            <h3>Monto a Pagar: {amount/100}</h3>


                            <Button
                                color="primary"
                                variant="outlined"
                                disabled={totalPrice === 0}
                                onClick={
                                

                                  openCulqi
                                
                                }
                                style={{ margin: 5, marginTop: 30 }}
                              >
                                Pagos Nacionales
                              </Button>
                              
    


                          
                          </div>
                        );
                      }}
                    </Culqi>
                  </div>
                </CulqiCheckout >
         );
         } 



    }
    else{

      dashboardContent = (
          
          
                <Button
                color="primary"
                variant="outlined"
                disabled={paso === "0"}
               
                style={{ margin: 5, marginTop: 30 }}
              >
                Pagos Nacionales
              </Button>

              
      )



    }

     

    

    return (
      <div style={{ padding: 10 }}>


    



        <div style={{ fontSize: 24, marginTop: 10 }}>
           Resumen del Pedido
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.checkedOutItems.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.descripcion}</TableCell>
                  <TableCell>{item.precio}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div
          style={{
            color: "#504F5A",
            marginLeft: 5,
            marginTop: 50,
            fontSize: 22
          }}
        >
          Total Precio S/. {totalPrice} 

          <div
              style={{
                marginLeft: 5,
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
            Dolares Precio  $  {(totalPrice/3.5).toFixed(2)} 
              
            </div>

          


        </div>


        <div class="form-row">
            <div class="col">
                
                  <label for="exampledni">DNI</label>
                  <input 
                      name ="dni"
                      onChange={this.onChange}                
                      type="text" className="form-control" id="exampledni" aria-describedby="emailHelp" placeholder="Numero Dni"/>
                      <small id="emailHelp" className="form-text text-muted">Documento de Identidad</small>
             </div>




               <Button
          color="primary"
          variant="outlined"
          disabled={habilitar === 0}
          onClick={this.onBusca}
          style={{ margin: 5, marginTop: 30 }}
        >
          Buscar
        </Button>



            


            
      

            
             <div className="col">
                   
        

                      {this.state.mostrar ? (
                        <div className="form-row">
                        <label for="examplena">Nombres y Apell</label>
                        <input 
                          name ="nom"
                          onChange={this.onChange}
                        type="text" className="form-control" id="examplena" aria-describedby="emailHelp" placeholder="Nombres y Apellidos"/>
                        <small id="emailHelp" className="form-text text-muted">Nombres y Apellidos</small>
                      </div>

                      ): (
                            

                        <div className="form-row">
                        <label for="examplena">Nombres y Apellidos</label>
                        <input 
                        name ="nom"
                        value={this.state.clientedata.nombres+" "+this.state.clientedata.apellidoPaterno+" "+this.state.clientedata.apellidoMaterno}
                        type="text" className="form-control" id="examplena" aria-describedby="emailHelp" placeholder="Nombres y Apellidos"/>
                        <small id="emailHelp" className="form-text text-muted">Nombres y Apellidos</small>
                      </div>



                              
                      )}


            </div>

                      



             <div className="col">
                  <label for="exampleInputEmail1">Email address</label>
                  <input 
                  name ="email"
                  onChange={this.onChange}            
                  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                  
                  
                  
                  />
                  
                  <small id="emailHelp" className="form-text text-muted">Correo Electronico</small>
              </div>
            
        </div>

         
         


          <div class="form-row">
            <div class="col">          
                  <label for="exampledi">Dirección</label>
                  <input 
                    name ="dire"
                    onChange={this.onChange}
                  
                  type="text" className="form-control" id="exampledi" aria-describedby="emailHelp" placeholder="Direccion"/>
                  <small id="emailHelp" className="form-text text-muted">Direccion</small>
            </div>

          <div className="col">
            <label for="examplete">Telefono</label>
            <input 
              name ="telf"
              onChange={this.onChange}            
              type="text" className="form-control" id="exampledi" aria-describedby="emailHelp" placeholder="Telefono"/>
              <small id="emailHelp" className="form-text text-muted">Telefono</small>
          </div>
        </div>   
          
        {dashboardContent} 



        <Button
          color="primary"
          variant="outlined"
          disabled={totalPrice === 0}
          onClick={

                this.orden
          
          }
          style={{ margin: 5, marginTop: 30 }}
        >
          Generar Orden Pago Efectivo
        </Button>

        
        <Button
          color="primary"
          variant="outlined"
          disabled={totalPrice === 0}
          onClick={

                this.onStripeUpdate
          
          }
          style={{ margin: 5, marginTop: 30 }}
        >
          Pagos Internacionales Stripe
        </Button>


        



        <Button
          color="secondary"
          variant="outlined"
          disabled={totalPrice === 0}
          onClick={() => {

                this.props.dispatch(setCheckedOutItems([]));

             
          }}
          style={{ margin: 5, marginTop: 30 }}
        >
          Descartar
        </Button>

        
      </div>
    );
  }
}
const Order = withRouter(connect(mapStateToProps)(ConnectedOrder));

export default Order;
