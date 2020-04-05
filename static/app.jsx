class App extends React.Component{
  
  state={
    items:[],
    recent:[]
  }

  componentDidMount = function(){
    fetch(`/api/`)
    .then(res => res.json())
    .then((items) => {this.setState({items: items.data})})
    .catch(console.log)

    fetch(`/recent/`)
    .then(res => res.json())
    .then((recent) => {this.setState({recent: recent.data})})
    .catch(console.log)    
  }

  render(){
    return(
      <div id="main">
        <Home 
          items={this.state.items} 
          recent={this.state.recent}
        />
      </div>
    )
  }
}

class Home extends React.Component{
  state={
    currentPage:1,
    itemsPerPage:9
  }

  render(){
    const {items} = this.props
    const {recent} = this.props 
    const {currentPage, itemsPerPage} = this.state
    let pages =[];

    for(let i=1; i <= Math.ceil(items.length/itemsPerPage); i++){
      pages.push(i)
    } 
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem,indexOfLastItem)

    const paginate = (pageNumber) => this.setState({currentPage:pageNumber})

    return (
      <div style={{pading:"auto 40px"}}>

        <div className="box" >
          <img 
            className="gopher"
            src="../static/gopher2.png" 
            style={{
              display: "block",
              top:"0",
              width:"18vmin",
              margin:"0 auto"
            }}
          />
          
          <h1 className='sec-title' style={{paddingBottom:'25px', backgroundColor:'transparent !important'}}>
            BREAKING GO NEWS
          </h1>
          <div className="feed" >
            {recent && recent.map((item)=>(
                <RecentItem item={item} key={item.id}/>
              ))
            }
          </div>
        </div>
        
        
        <div className="box" style={{marginTop:'80px'}}>
          <img 
              className="gopher"
              src="../static/gopher2.png" 
              style={{
                display: "block",
                top:"0",
                width:"18vmin",
                margin:"0 auto", 
              }}
            />
  

         <h1 className='sec-title' >
          POPULAR STORIES
        </h1>
        <Pagination 
          pages = {pages}
          paginate={paginate}
          currentPage={currentPage}
        />
        <div className="feed" >
          {currentItems && currentItems.map((item)=>(
              <Item item={item} key={item.id}/>
            ))
          }
        </div>
        <Pagination 
          pages = {pages}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      </div>
    )
  }    
}
   
class Item extends React.Component{
  render(){
    const {title, details, url, image} = this.props.item;
    return(
      <div className="itemContainer" style={{padding:"20px"}}>
        <div className="item">
          <img className="itemImage" src={image} alt="" />
          <hr/>
          <div 
          className="title" > 
            <a href={url} target="_blank">
              <div>
                {title} 
              </div>
            </a>
          </div>
          <div  className="details">
            {details}  
          </div>
        </div> 
        <hr/>
        <LikeButton likes = {this.props.item.likes} id = {this.props.item.id}/>
      </div>
    )
  }
}

class RecentItem extends React.Component{
  render(){
    const {title, details, url, image} = this.props.item;
    return(
      <div className="itemContainer" style={{padding:"30px"}}>
        <div className="recentItem">
          <img className="recentImage" src={image} alt={title}/>
          <hr/>
          <div className="title"> 
            <a href={url} target="_blank">
              <div>
                {title} 
              </div>
            </a>
          </div>
          <div className="details">
            {details}  
          </div>
        </div> 
        <LikeButton likes = {this.props.item.likes} id = {this.props.item.id}/>
      </div>
    )
  }
}

class LikeButton extends React.Component {
  state = {
      id :this.props.id,
      likes: this.props.likes
    };
    addLike = (e, id) => {
      e.preventDefault();
      let newCount = this.state.likes + 1;
      this.setState({
        likes: newCount
      });
      fetch(`/up/${id}`,{
        method: 'PUT'
      })
      .then(res => res.json())
      .then(res => console.log("res:",res))
      .catch(console.log())
    };

  render() {
    if (this.state.likes === this.props.likes) {
      return (
        <div>
          <button 
            className="button"
            onClick={e => this.addLike(e, this.state.id)}
          >
            <i className="far fa-heart fa-lg" style={{ color: "#33c3f0" }}></i>
            {this.state.likes} 
          </button>
        </div>
      );
    }
    if (this.state.likes !== this.props.likes) {
      return (
        <div>
          <button className="button">
            <i className="fas fa-heart fa-lg" style={{ color: "#33c3f0" }}></i>
            {this.state.likes} 
          </button>
        </div>
      );
    }
  }
}

class Pagination extends React.Component {
  render(){
    const{paginate, pages, currentPage}= this.props

    return(
      <ul className='pagination' style={{
        margin:'0 auto',
        textAlign: 'center',
        width:'100%'}}>
        {pages.map(page=>(
          <li 
            key={page}
            onClick={()=> paginate(page)}
          >
            <h3 className={page === currentPage ? 'active':''}>{page}</h3> 
          </li>
        ))}
      </ul>
    )
  }
  
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
);
