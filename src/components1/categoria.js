import React, { useState} from 'react';

import { useForm } from 'react-hook-form';
//simport {Button} from 'primereact/button';

import  {getCurrentCategoria,addCategoria}  from "../actions/categoriaActions";
import { useDispatch } from "react-redux";

import { Button } from 'react-materialize';


import ViewCate from "./extra/ViewCate";

import { Link } from 'react-router-dom';



 const Catego= ()=> {

    const {register, errors, handleSubmit} = useForm();
    const [Entradas, setEntradas] = useState([])


    //console.log("carga asdasdasdas")


    const dispatch =useDispatch();


    //componentDidMount() {
     //   this.props.getCurrentCategoria();
      // }
     // useEffect(() => {
      //  let datos=getCurrentCategoria;
       // console.log(datos.data)
      //});
       
    

    

    
    const onSubmit = (data,e) => {
        console.log(data)
        setEntradas([
            ...Entradas,
            data
        ])

       console.log(data)
        dispatch(addCategoria(data))

  
        e.target.reset();
    }
    const datavisible =() =>{
        let data2= dispatch(getCurrentCategoria())

    

    }

    
        return (
            <div>

              <div className="col-md-6">
              
              <Link to="/blog" className="btn btn-info btn-light mb-3 float-left light-blue darken-2">
                
                Ir a Blog
              </Link>
            </div>
                  <div className="container " >


       
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row ">
                            <div className="form-group col-md-6">                               
                                <input className="form-control"
                                        placeholder="id"
                                        name ="codigo"
                                        ref={register({
                                            required: {
                                                value: true, 
                                                message: 'Nombre es requerido'
                                                }, 
                                            maxLength: {
                                                value: 20, 
                                                message: 'No más de 20 carácteres!'
                                                },
                                            minLength: {
                                                value: 1, 
                                                message: 'Mínimo 1 carácteres'
                                                }
                                        })}                                                                
                                    />
                                     {
                                        <span className="text-danger text-small d-block mb-2">
                                            {errors.codigo && errors.codigo.message}
                                        </span>
                                      }

                            </div>
                           
                    </div>
                  
                       
                        <div className="form-group">                            
                            <textarea className="md-textarea form-control" rows="2"
                                   placeholder="Descripcion o detalle  del producto "
                                   name="descripcion"
                                   ref={register({
                                    required: {
                                        value: true, 
                                        message: 'Nombre es requerido'
                                        }, 
                                    
                                    minLength: {
                                        value: 3, 
                                        message: 'Mínimo 3 carácteres'
                                        }
                                })}
                                
                                />
                                {
                                    <span className="text-danger text-small d-block mb-2">
                                        {errors.description && errors.description.message}
                                    </span>
                                 }
                            

                            
                        </div>                        
                                         
                    <button type="submit" className="btn btn-info  mt-4 01579b light-blue darken-2">Grabar</button>
                    </form>
                    </div>


               <div className="col-mb-8  ">


                   
       
                     <div className="p-col-12 p-md-12">

                       
                           <ViewCate />
                               
                    </div>

            </div>
   </div>    
        );
    };

export default  Catego ;
  