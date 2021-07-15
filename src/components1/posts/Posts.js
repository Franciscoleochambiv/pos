import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';


import ReactPaginate from 'react-paginate';



class Posts extends Component {
  constructor(){
    super();
    this.state={
      search:'',
      currentPage: 1,
      todosPerPage:5,
      selectedPage: 1,    
      isOpen: false           
     
    };

    this.searchHandler=this.searchHandler.bind(this);

  }


  searchHandler(event){
    const lolo = event.target.value.toUpperCase();
    this.setState({search: lolo});
    this.setState({
      selectedPage: 1,
     currentPage: Number(1)
    })
   }



handleClick(event) {
this.setState({
  currentPage: Number(event.target.id)
});
}


handlePageClicked = data => {
let selected = data.selected;
this.setState({
  selectedPage: selected,
  currentPage: Number(selected+1)
})
};





  componentDidMount(){
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;




    const { currentPage, todosPerPage } = this.state;

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }


    let filteredContacts = posts.filter(
        (task) =>{
            let poetName = task.text.toUpperCase();
            let separador=" "; 
            let i;
            let poetName1=this.state.search.split(separador);
            let tpalabras=poetName1.length;    
            let datopa;  
            if (tpalabras>3){
                return  poetName.indexOf(this.state.search) !== -1;    

              }
            else{

                  for (i=0;i<tpalabras;i++) {
                    //console.log("recorriendo el aray")
                    //  console.log(poetName1[i]); 
                      datopa=poetName1[i];
                      //datopa=datopa+" "+datopa;
                      return poetName.indexOf(datopa) !== -1 ;
                    //  datopa=poetName1[i];
                    //  return poetName.indexOf(datopa) !== -1 ;
                  

                    }
                    return poetName;
                  }
            } //FIN EDL FUNCION MAP
        
      );

      const Pagination = (
        <ReactPaginate 
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(filteredContacts.length / todosPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={this.handlePageClicked}
          containerClassName={'pagination pagination justify-content-center ' }
          subContainerClassName={' page-item page-link badge badge-primary'}
          activeClassName={'active'}
          
          />      
      ) 


  //    let dashboardContent,dashboardContent1;
      const currentTodos = filteredContacts.slice(indexOfFirstTodo, indexOfLastTodo);
  


    let postContent;

    if(posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={currentTodos} />;
    }

    return (
      <div >                                      
          <div  >
            <div >
                   <div className="container"> 
                      <input type ="text"  name="buscar" className="form-control" placeholder="Buscar datos en los post" onChange={this.searchHandler} value={this.state.search}  /> 
                                
                   </div>    

              <PostForm />
              {postContent}

              <center>
                    <p>NUMERO DE COINCIDENCIAS EN EL POST ( {filteredContacts.length})</p>
               </center>     
                {Pagination}
                                                        
            </div>
      
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
