class App extends React.Component{
  state={
    items:[]
  //   items: [
  //     {id: "1", title: "note1 1 1", details: "type type type", likes:0, image:"https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api", url: "https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api"},
  //     {id: "2", title: "the foundation", details:"information! learn my information!", likes:0, image:"https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api", url: "https://tse3.mm.bing.net/th?id=OIP.jy4Ho-AVDIf__a3RJAEsVwHaIc&pid=Api"},
  //     {id: "3", title: "Gotta Learn go", details:"not a scam. i promise. not click bate", image:"https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api",likes:0, url: "https://tse2.mm.bing.net/th?id=OIP.pFaeNO48gYlRMQii977cQgHaET&pid=Api"}
  // ]
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
            width:"100%",
            margin:"15px",
            float:"left",  
            backgroundColor: "white"
          }} >
          <img className="image" src={image} alt="" 
              style={{ 
                width:"18%",
                float:"left",
                paddingRight: "20px",
                paddingBottom: "0"
              }}
          />
          <div className="title"> 
            <a href={url} target="_blank">
              <div>
                {title} 
              </div>
            </a>
          </div>
            {details}  
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


