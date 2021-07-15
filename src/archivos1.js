import React, { Component } from 'react';

import { unidad2 } from "./variables";



class Archivos1 extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    isCompMounted:false,
    file: './tempo.pdf'
  }





  componentDidMount() {
    this.isCompMounted = true;
    //this.fetchProductAndRelatedItems(this.props.match.params.id);


    const url=unidad2+this.props.match.params.id;

    
    //"http://adryan2.sytes.net:7002/backenweb/"+this.props.match.params.id;

    ///http://localhost:7002/backenweb/10309611131-01-F001-2521.pdf
    window.open(url, '_blank');
   // console.log(url);
    //alert(url)
  }

 
  //componentDidMount(){
   // const url = 'http://adryan2.sytes.net/tiendap30/archivos/pedidos/10309611131-05-P001-1.pdf';
    //window.open(url, '_blank');
  
//  }

  render() {
    
  
    return (
      <div>
        
        {this.props.history.push("/admin/totdocu")}
      </div>
     

    );
  }
}
export default Archivos1;