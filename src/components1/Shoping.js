import React, { useState} from 'react';

import { useForm } from 'react-hook-form';
//simport {Button} from 'primereact/button';

import  {getCurrentShoping,addShoping}  from "../actions/shopingActions";
import { useDispatch } from "react-redux";

import { Button } from 'react-materialize';


import ViewShoping from "./extra/ViewShoping";

import { Link } from 'react-router-dom';

 const Shoping= ()=> {

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
        dispatch(addShoping(data))

  
        e.target.reset();
    }
    const datavisible =() =>{
        let data2= dispatch(getCurrentShoping())

    

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
                                        name ="id"
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
                                            {errors.id && errors.id.message}
                                        </span>
                                      }

                            </div>
                           
                    </div>
                    <div className="form-group">                        
                            <input className="form-control"
                                   placeholder="Descripcion"
                                   name="name"
                                   ref={register({
                                    required: {
                                        value: true, 
                                        message: 'Nombre es requerido'
                                        }, 
                                    maxLength: {
                                        value: 200, 
                                        message: 'No más de 200 carácteres!'
                                        },
                                    minLength: {
                                        value: 5, 
                                        message: 'Mínimo 5 carácteres'
                                        }
                                })}
                                
                                />
                                {
                                    <span className="text-danger text-small d-block mb-2">
                                        {errors.name && errors.name.message}
                                    </span>
                                 }
                        </div>
                        <div className="form-group">                            
                            <input className="form-control"
                                   placeholder="Categoria"
                                   name="category"
                                   ref={register({
                                    required: {
                                        value: true, 
                                        message: 'Nombre es requerido'
                                        }, 
                                    maxLength: {
                                        value: 30, 
                                        message: 'No más de 30 carácteres!'
                                        },
                                    minLength: {
                                        value: 3, 
                                        message: 'Mínimo 3 carácteres'
                                        }
                                })}
                                
                                />
                                {
                                    <span className="text-danger text-small d-block mb-2">
                                        {errors.category && errors.category.message}
                                    </span>
                                 }


                            
                        </div>       
                        <div className="form-group">                            
                            <textarea className="md-textarea form-control" rows="2"
                                   placeholder="Descripcion o detalle  del producto "
                                   name="description"
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
                        <div className="form-row">
                            <div className="form-group col-md-6">                                    
                                       <input className="form-control"
                                        placeholder="Precio"
                                        name="price"
                                        ref={register({
                                            required: {
                                                value: true, 
                                                message: 'Precio es requerido'
                                                }, 
                                            maxLength: {
                                                value: 30, 
                                                message: 'No más de 30 carácteres!'
                                                },
                                            minLength: {
                                                value: 1, 
                                                message: 'Mínimo 1 carácteres'
                                                }
                                        })}
                                        
                                        />
                                        {
                                            <span className="text-danger text-small d-block mb-2">
                                                {errors.price && errors.price.message}
                                            </span>
                                        }

                            </div>
                            <div className="form-group col-md-4">                                    
                                    <input className="form-control"
                                   placeholder="True o False"
                                   name="popular"
                                   ref={register({
                                    required: {
                                        value: true, 
                                        message: 'Nombre es requerido'
                                        }, 
                                    maxLength: {
                                        value: 5, 
                                        message: 'No más de 5 carácteres!'
                                        },
                                    minLength: {
                                        value: 4, 
                                        message: 'Mínimo 4 carácteres'
                                        }
                                })}
                                
                                />
                                {
                                    <span className="text-danger text-small d-block mb-2">
                                        {errors.popular && errors.popular.message}
                                    </span>
                                 }


                            </div>
                            <div className="form-group col-md-8">
                                <textarea className="md-textarea form-control" rows="1"
                                   placeholder="Imagen Url"
                                   name="imageUrls"
                                   ref={register({
                                    required: {
                                        value: true, 
                                        message: 'Nombre es requerido'
                                        }, 
                                    maxLength: {
                                        value: 500, 
                                        message: 'No más de 500 carácteres!'
                                        },
                                    minLength: {
                                        value: 10, 
                                        message: 'Mínimo 10 carácteres'
                                        }
                                })}
                                
                                />
                                {
                                    <span className="text-danger text-small d-block mb-2">
                                        {errors.imageUrls && errors.imageUrls.message}
                                    </span>
                                 }     
                                
                            </div>
                        </div>                  
                    <button type="submit" className="btn btn-info  mt-4 01579b light-blue darken-2">Grabar</button>
                    </form>
                    </div>


               <div className="col-mb-8  ">


                   
       
                     <div className="p-col-12 p-md-12">

                        <ViewShoping />

                    </div>

            </div>
   </div>    
        );
    };

export default  Shoping ;
  