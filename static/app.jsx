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
  render(){
    var {items} = this.props
    var {recent} = this.props
    return (
      <div className="container" style={{pading:"auto 40px"}}>
        <img 
            className="gopher"
            src="../static/gopher2.png" 
            style={{
              display: "block",
              top:"0",
              width:"37vmin",
              margin:"0 auto"
            }}
          />
         
          
        <h1 className='sec-title' style={{paddingBottom:'25px', backgroundColor:'transparent !important'}}>
          BREAKING GO NEWS
        </h1>
        <div id="breakingFeed" >
          {recent.length > 0 ? 
            recent.map((item)=>(
              <RecentItem item={item} key={item.id}/>))
            :"" 
          }
        </div>

        <img 
            className="gopher"
            src="../static/gopher2.png" 
            style={{
              display: "block",
              top:"0",
              width:"37vmin",
              margin:"0 auto", 
              paddingTop:'40px'
            }}
          />
         
         <h1 className='sec-title' style={{paddingBottom:'25px', backgroundColor:"transparent !important"}}>
          POPULAR STORIES
        </h1>
        <div id="feed" >
          {items.length > 0 ? 
            items.map((item)=>(
              <Item item={item} key={item.id}/>))
            :"" 
          }
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
  
ReactDOM.render(
  <App />,
  document.getElementById("app")
);
