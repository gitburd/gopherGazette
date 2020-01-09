class App extends React.Component{
  
  state={
    items:[]
  }

  componentDidMount = function(){
    fetch('/api')
    .then(res => res.json())
    .then((items) => {this.setState({items: items.data})})
    .catch(console.log)
  }

  render(){
    return(
      <div id="main">
        <Home items={this.state.items} />
      </div>
    )
  }
}

class Home extends React.Component{
  render(){
    var {items} = this.props
    return (
      <div>
        <div className="container">
        <div id="feed" >
          {items.length > 0 ? 
            items.map((item)=>(
              <Item item={item}/>))
            :"" 
          }
          </div>
        </div>
      </div>
    )
  }    
}
   
class Item extends React.Component{
  render(){
    const { id, title, details, url, image, likes} = this.props.item;
    return(
      <div>
        <div className="item" 
          style={{ 
            margin:"10px",
            float:"left",
            clear:"both"
          }} >
          <img className="image" src={image} alt="" 
              style={{ 
              width:"100%",
              overflow:"hidden",
              }}
          />
          <hr/>
          <div 
          className="title"
          style={{
            padding:"15px",
          }}
          > 
            <a href={url} target="_blank">
              <div>
                {title} 
              </div>
            </a>
          </div>
          <div
            style={{
            padding:"15px",
            textAlign: "justify",
            textJustify: "inter-word"
            }}
          >
          {details}  
          </div>
            
            <div className="like_button_container" data-commentid="1">
              <a href="">
              <img 
                  className="heart"
                  src="../static/heart.png" 
                  onClick={e => upvote(e, id)}
                  style={{
                    width:"5vmin",
                    padding:"5px",
                  }}
                />
              </a>
                {likes}
            </div>
            
        </div>
            
      </div>
    )
  }
}

function upvote (e, id) {
  e.preventDefault();
  console.log(id, "clicked")
  fetch(`/api/${id}`,{
    method: 'PUT'
})
  .then(res => res.json(), window.location.reload(false))
  .catch(console.log)
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
);
