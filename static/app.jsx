class App extends React.Component{
  state={
    items:[]
    // items: [
    //   {id: "1", title: "Simple Guide to Panic Handling and Recovery in Golang", details: "Golang is now one of the most popular languages for development in the industry. More and more organisations are migrating to use Golang because of its ease of use, concurrency patterns and awesome online community. Go is extremely simple, and has very limited keywords. It is extremely opinionated, and has readily available patterns to achieve certain tasks. One of them is handling panic and recovering from it gracefully. Let us take a look at it. ", likes:10, image:"https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api", url: "https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api"},
    //   {id: "2", title: "Why Learn Go?", details:"", likes:0, image:"https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api", url: "https://tse3.mm.bing.net/th?id=OIP.jy4Ho-AVDIf__a3RJAEsVwHaIc&pid=Api"},
    //   {id: "3", title: "go.dev", details:"Today we are launching go.dev, a new hub for Go developers! There you will find a wealth of learning resources to get started with the language, featured use cases, and case studies of companies using Go.", image:"https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api",likes:0, url: "https://tse2.mm.bing.net/th?id=OIP.pFaeNO48gYlRMQii977cQgHaET&pid=Api"},
    //   {id: "4", title: "lorum sempram", details: "Golang is now one of the most popular languages for development in the industry. More and more organisations are migrating to use Golang because of its ease of use, concurrency patterns and awesome online community. Go is extremely simple, and has very limited keywords. It is extremely opinionated, and has readily available patterns to achieve certain tasks. One of them is handling panic and recovering from it gracefully. Let us take a look at it. ", likes:10, image:"https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api", url: "https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api"},
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
            width:"29%",
            backgroundColor: "white",
            float:"left",
            minWidth:"250px",
            margin:"2%"

          }} >
          <img className="image" src={image} alt="" 
              style={{ 
              width:"100%",
              overflow:"hidden",
              padding:"0"
              }}
          />
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


