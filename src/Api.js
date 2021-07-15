//import { sampleProducts } from "./Data";


//let unidad="https://apisfsystem.herokuapp.com";
//let unidad="https://adryan2.sytes.net:7001";


import { unidad } from "./variables";

//let unidad=servidor

export const fetch_data = async () =>{
     const llamada = await fetch(unidad+'/api/shoping1/productos')
     const data = await llamada.json()
     //console.log(data);
     
     return data;
};

/*
export const fetch_datacate = async () =>{
  const llamada2 = await fetch('http://adryan2.sytes.net:3001/api/categoria/view')
  const data2 = await llamada2.json()
 // console.log(data);
  return data2;
};

*/


///
//
// Methods of this class are used to simulate calls to server.
//
class Api {
  getItemUsingID(id) {


    return new Promise( (resolve, reject) => {
      setTimeout( async () => {

        let informacion=  await fetch_data();
        //let res = sampleProducts.filter(x => x.id === parseInt(id, 10));
        let res = informacion.filter(x => x.id === parseInt(id, 10));
        resolve(res.length === 0 ? null : res[0]);
      }, 500);
    });
  }



  fetch_datacate = async () =>{
    //const llamada2 = await fetch('http://adryan2.sytes.net:3001/api/categoria/view')
    //const llamada2 = await fetch('https://adryan2.sytes.net:5000/api/shoping1/categorias')


    const llamada2 = await fetch(unidad+'/api/shoping1/categorias')

    const data2 = await llamada2.json()
   // console.log("funcion de  categorias")
   // console.log(data2);
    return data2;
  };
  
/*
  fetch_dni = async () =>{
    //const llamada2 = await fetch('http://adryan2.sytes.net:3001/api/categoria/view')
    const llamada2 = await fetch('https://dniruc.apisperu.com/api/v1/dni/30961113?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImdydXBvODBwckBnbWFpbC5jb20ifQ.cPdYTOafYcdlXPBGBrAUPl9FGTkHpc0dPW1FcH10Plg')
    const data2 = await llamada2.json()
   // console.log("funcion de  categorias")
   // console.log(data);
   //console.log(parameter1)
    return data2;
  };
*/

  




  sortByPrice(data, sortval) {
    if (sortval !== "lh" && sortval !== "hl") return data;

    let items = [...data];

    if (sortval === "lh") {
      items.sort((a, b) => a.precio - b.precio);
    } else {
      items.sort((a, b) => b.precio - a.precio);
    }

    return items;
  }

  searchItems({
    category = "popular",
    term = "",
    sortValue = "lh",
    itemsPerPage = 4,
    usePriceFilter = "false",
    minPrice = 0,
    maxPrice = 1000,
    page = 1
  }) {
    
    // Turn this into a boolean
    usePriceFilter = usePriceFilter === "true" && true;
    
    return new Promise((resolve, reject) => {

     setTimeout(async () => {

        let informacion=  await fetch_data();
       // console.log("datos de la consulta de la api")
       // console.log(informacion);

        //let data = sampleProducts.filter(item => {


          let data = informacion.filter(item => { 
          if (
            usePriceFilter &&
            (item.precio < minPrice || item.precio > maxPrice)
          ) {
            return false;
          }

          if (category === "popular") {
            return item.popular;
          }

          if (category !== "AALL CATEGORIAS" && category !== item.categoria)
            return false;

          if (term && !(item.descripcion.toLowerCase()+item.codigo.toLowerCase()).includes(term.toLowerCase()))
            return false;

          return true;
        });

        let totalLength = data.length;

        data = this.sortByPrice(data, sortValue);

        data = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

        resolve({ data, totalLength });
      }, 100);
    });
  }




}

export default new Api();
