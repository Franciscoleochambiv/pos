import React, { Component } from "react";
//import ReactDOM from "react-dom";
//import ReactPaginate from 'react-paginate';
import Pagination from "react-paginate";
//require("bootstrap/less/bootstrap.less");
//import PropTypes from 'prop-types';
import { Button,Icon} from  'react-materialize';


class Pagina2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 15
     // currentTodos:''
    };


    //this.searchHandler=this.searchHandler.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
 
  handlePageChange() {
    alert("2");
    //console.log(`active page is ${pageNumber}`);
    this.setState({activePage: 2});
  }


  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }


 
  onUpdateClick(id){
   //this.props.updateCurrentTipos(id);
    // muestra();    
    //{<Stdocupdate />} 
   alert("actualizar");
   this.props.buscarCurrentTipos(id);
   
   //this.setState({
   // codigo: data.title,
   // description: data.description,
    //_id: data._id
  //});
   


  }

  onDeleteClick(id) {
    //this.props.getCurrentTipos();

    //this.props.deleteCurrentTipos(id);
    this.props.deleteCurrentTipos(id);
    //referscar la pagina
       // this.setState.tiposfile
  // this.props.getCurrentTipos();
   //this.props.history.push('/stdoc');
   

   //this.props;
    

  }

  

 
  render() {
    
    console.log("datos enviados desde viewtipos")
    //console.log(currentTodos)
    let dashboardContent;
   // const  currentTodos = this.props.currentTodos;
    //console.log(currentTodos/)

    

         dashboardContent = (
          
          this.props.currentTodos.map(l1 => (
                    <tr key={l1._id}>            
                       <td>{l1.codigo}</td>
                       <td>{l1.descripcion}</td>
                       <td>
                      
                
                          <Button onClick={this.onUpdateClick.bind(this,l1._id)}  className="btn btn-info 01579b light-blue darken-2"  >
                              
                              <Icon>
                              edit
                              </Icon>
                          </Button>
                          
                      </td>
                      <td>
                      
                          <Button  onClick={this.onDeleteClick.bind(this,l1._id)} className="btn btn-danger d50000 red accent-4"  >
                              
                              <Icon>
                              delete
                              </Icon>
                          </Button>
                      </td>
                    </tr>
                           ))     
                          );



    
    return (
      <div>
          
 
       {dashboardContent}


        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={15}
          totalItemsCount={450}
          pageRangeDisplayed={8}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}
 
export default Pagina2;
//ReactDOM.render(<App />, document.getElementById("root"));
 