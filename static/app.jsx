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
    itemsPerPage:6,
    itemIdx : 0
  }
  
  onLeftClick = () => {
    if(this.state.itemIdx === 0){
      this.setState({itemIdx: 5}, clearInterval(this.interval))
    }else{
      let newIndex = this.state.itemIdx -1;
      this.setState({itemIdx: newIndex}, clearInterval(this.interval))  
    }
  }

  onRightClick = () => {
    
    if(this.state.itemIdx < 5){
      let newIdx = this.state.itemIdx + 1
      this.setState({itemIdx: newIdx}, clearInterval(this.interval)) 

    }
    else{
      this.setState({itemIdx: 0}, clearInterval(this.interval))
    }
  }

  autoScroll = () => {
    if(this.state.itemIdx < 5){
      let newIdx = this.state.itemIdx + 1
      this.setState({itemIdx: newIdx}) 

    }
    else{
      this.setState({itemIdx: 0})
    }
  }

  componentDidMount() {  
    this.interval = setInterval(this.autoScroll, 4500); 
  }

  render(){
    const {items, recent} = this.props
    
    const {currentPage, itemsPerPage, itemIdx} = this.state
    let pages = [];

    for(let i=1; i <= Math.ceil(items.length/itemsPerPage); i++){
      pages.push(i)
    } 
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem,indexOfLastItem)

    const paginate = (pageNumber) => this.setState({currentPage:pageNumber})

    return (
      <div style={{pading:"auto 20px"}}>
        <div className="box" >
        {recent && recent.length > 0 && 
        <>
          <h1 className='sec-title' style={{paddingBottom:'25px', backgroundColor:'transparent !important'}}>
          Breaking Go News
          <br/>
          <img 
            src="../static/left-arrow.png" 
            className='arrowIcon'
            onClick={this.onLeftClick}
          />
            
          <img 
            src="../static/right-arrow.png" 
            className='arrowIcon'
            style={{float:'right'}}
            onClick={this.onRightClick}
          />
          </h1>
          <br/>
          <div style={{width:'100%', alignContent:'center', display:'block', margin:'0 auto', clear:'both' }}>
            <RecentItem item={recent[itemIdx]} />
          </div>
          </>
          }
          
        </div>
        
        <div className="box" >

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
        {image && (
            <img className="image" src={image} alt={title}/>
          )}
          <div className="title" > 
            <a href={url} target="_blank">
              <div>
                {title} 
              </div>
            </a>
          </div>
          <div  className="details" style={{paddingLeft:'0px'}}>
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
  state = {
    likes: this.props.likes
  };

  addLike = (e, id) => {
    e.preventDefault();
    
    fetch(`/up/${id}`,{
      method: 'PUT'
    })
    .then(res => res.json())
    .catch(console.log())
  };

  render(){
    const {id, title, details, url, image, likes } = this.props.item;
    return(
      <div 
        className="itemContainer" style={{width:'70%', margin:'0 auto'}}
        onClick={e => this.addLike(e, id)}
      >
        <div className="recentItem">
          {image && (
            <img className="image" src={image} />
          )}
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
            <button className="button">
              <i className="fas fa-heart fa-lg" style={{ color: "#33c3f0" }}></i>
            </button>
            {likes} 
        </div> 
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
