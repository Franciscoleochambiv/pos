import React, { Component } from "react";
import ReactPaginate from 'react-paginate';
import { Button,Icon} from  'react-materialize';

const Pagination = (props) => {
return (

<ReactPaginate
  previousLabel={'previous'}
  nextLabel={'next'}
  breakLabel={'...'}
  breakClassName={'break-me'}
  pageCount={10}
  marginPagesDisplayed={2}
  pageRangeDisplayed={2}
  onPageChange={props.handlePageClick}
  containerClassName={'pagination'}
  subContainerClassName={'pages pagination'}
  activeClassName={'active'}
  />

 )
}


class Pagina3 extends Component {
 state = {
  selectedPage: 0
 }

handlePageClicked = data => {
  let selected = data.selected;
  this.setState({
    selectedPage: selected
  })
  console.log(selected)
};

render() {

  let dashboardContent;
    dashboardContent = (
          
        this.props.currentTodos.map(l1 => (
                  <tr key={l1._id}>            
                     <td>{l1.codigo}</td>
                     <td>{l1.descripcion}</td>
                     <td>
                    
              
                        <Button   className="btn btn-info 01579b light-blue darken-2"  >
                            
                            <Icon>
                            edit
                            </Icon>
                        </Button>
                        
                    </td>
                    <td>
                    
                        <Button   className="btn btn-danger d50000 red accent-4"  >
                            
                            <Icon>
                            delete
                            </Icon>
                        </Button>
                    </td>
                  </tr>
                         ))     


                        

                         );
      

return (
  <React.Fragment>
    <div>You selected:  {this.state.selectedPage}</div>
     {dashboardContent}
    <div >
      <Pagination handlePageClick={this.handlePageClicked} />
    </div>
  </React.Fragment>
 );

 }
} 

export default Pagina3;