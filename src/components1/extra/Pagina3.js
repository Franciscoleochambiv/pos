import React, { Component } from "react";
import ReactPaginate from 'react-paginate';
//import { Button,Icon} from  'react-materialize';

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

  
return (
  <React.Fragment>
    <div>You selected:  {this.state.selectedPage}</div>
  
    <div >
      <Pagination handlePageClick={this.handlePageClicked} />
    </div>
  </React.Fragment>
 );

 }
} 

export default Pagina3;