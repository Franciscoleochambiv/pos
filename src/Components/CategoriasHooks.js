import React, { useState } from 'react'
import  { useDispatch,useSelector } from 'react-redux'
import { addCategoria } from '../actions/categoriaActions'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import ViewCate from "./ViewCate.js";
//import { CenterContentWrapper } from "../components/container";
//import  Footer from "../components/footer";
//import { Title, Typography } from '../components/typography';
//import { CenteredContainer,Container,Wrapper } from '../styles/estilos';



const Categorias = () => {
     const dispatch = useDispatch()
     const cate = useSelector (store => store.categoriafile.categoriafiles)     
     const [Entradas, setEntradas] = useState([])
     const {register, errors, handleSubmit} = useForm();

    const onSubmit = (data,e) => {
        setEntradas([
            ...Entradas,
            data
        ])

        dispatch(addCategoria(data))
        e.target.reset();

    }    

    const ndata=cate.length+1


    return (  
        <div style = {{padding: "24px",
            flexgrow:"1",
            display: "flex",
            flexdirection: "column",
            overflowy: "auto",
            margin:"auto"
            }} >

    
			      
                  <div className="row mb-3">
                    < div className="col-md-6 mx-auto">
                        <div className="container">                                                                                    
			       <div className="card" style={{ width: "28rem" }}> 
                                 <div className="card-body">
                                        <h5 className="card-title">Categorias</h5>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form-group">
                                                 <label  style={{color:"black"}} for="codigo">Codigo</label>
                                                 <input
                                                      value={ndata}
                                                      type="Number"
                                                      className="form-control"
                                                      name="codigo"
                                                      placeholder="Enter Codigo"
                                                      ref={register({ required: true })}
                                                  />
                                                 {errors.codigo && (
                                                      <div className="text-danger">Codigo is a required field</div>
                                                  )}
                                            </div>
                                            <div className="form-group">
                                                 <label  style={{color:"black"}} for="descripcion">Descripcion</label>
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
                                            </div>
                                            <button type="submit" className="btn btn-info  mt-4 01579b light-blue darken-2">Grabar</button>                                            
                                        </form>                                                    
                                    </div> 
                            </div>  
                         </div>                       
                    </div>   
                    <div className="col-md-6 mx-auto">                     
                          <ViewCate />
                    </div>
                  </div>                     
                  </div>                     
                           
    	 
          		
    )    
}

export default Categorias

