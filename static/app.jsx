class App extends React.Component{
  
  state={
    items:[],
    // sort:"recent",
  //   items: [
  //     {id: "1", title: "Simple Guide to Panic Handling and Recovery in Golang", details: "Golang is now one of the most popular languages for development in the industry. More and more organisations are migrating to use Golang because of its ease of use, concurrency patterns and awesome online community. Go is extremely simple, and has very limited keywords. It is extremely opinionated, and has readily available patterns to achieve certain tasks. One of them is handling panic and recovering from it gracefully. Let us take a look at it. ", likes:10, image:"https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api", url: "https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api"},
  //     {id: "2", title: "Why Learn Go?", details:"", likes:0, image:"https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api", url: "https://tse3.mm.bing.net/th?id=OIP.jy4Ho-AVDIf__a3RJAEsVwHaIc&pid=Api"},
  //     {id: "3", title: "go.dev", details:"Today we are launching go.dev, a new hub for Go developers! There you will find a wealth of learning resources to get started with the language, featured use cases, and case studies of companies using Go.", image:"https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api",likes:0, url: "https://tse2.mm.bing.net/th?id=OIP.pFaeNO48gYlRMQii977cQgHaET&pid=Api"},
  //     {id: "4", title: "lorum sempram", details: "Golang is now one of the most popular languages for development in the industry. More and more organisations are migrating to use Golang because of its ease of use, concurrency patterns and awesome online community. Go is extremely simple, and has very limited keywords. It is extremely opinionated, and has readily available patterns to achieve certain tasks. One of them is handling panic and recovering from it gracefully. Let us take a look at it. ", likes:10, image:"https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api", url: "https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api"},
    
  //   {
  //     id:"5", title:"eris", details:"Named after the Greek goddess of strife and discord, this package is intended to give you more control over error handling via error wrapping, stack tracing, and output formatting. Basic error wrapping was added in Go 1.13, but it omitted user-friendly Wrap methods and built-in stack tracing. Other error packages provide some of the features found in eris but without flexible control over error output formatting. This package provides default string and JSON formatters with options to control things like separators and stack trace output. However, it also provides an option to write custom formatters via eris.Unpack.",likes:5,image:"https://tse2.mm.bing.net/th?id=OIP.EwgonFYrdaUF5ofu4YNougHaD4&pid=Api", url:"https://github.com/rotisserie/eris"
  //   },
  //   {
  //     id:"6", title:"Handling timezones in Go", details:"Many beginner developers get confused in dealing with timezones. This article explains: How to store them in DB & How to parse them in Go",likes:5,image:"https://tse3.mm.bing.net/th?id=OIP.yDRgCcndS1hPqCRGsp9GsQHaHa&pid=Api", url:"https://medium.com/@kamal.g.namdeo/handling-timezone-in-go-723b1e38639c"
  //   },

  // ]
  }

  componentDidMount = function(){
    if (this.state.sort == "popular"){
      fetch(`/api/`)
      .then(res => res.json())
      .then((items) => {this.setState({items: items.data})})
      .catch(console.log)
    }
    else {
      fetch(`/recent/`)
      .then(res => res.json())
      .then((items) => {this.setState({items: items.data})})
      .catch(console.log)
    }
    
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // set state to back up in local storage 
    this.setState(JSON.parse(localStorage.getItem('backup')))
  }

  saveStateToLocalStorage() {
    localStorage.setItem('backup', JSON.stringify(this.state))
  }


  setSort = function(e, sort){
    e.preventDefault();
    console.log(sort, "clicked")
    this.setState({sort})
    
  }



//   fetch(`/api/${id}`,{
//     method: 'PUT'
// })
//   .then(res => res.json(), window.location.reload(false))
//   .catch(console.log)


  render(){
    return(
      <div id="main">
        <div>
          <img 
            className="gopher"
            src="../static/newsGopher.png" 
            style={{
              display: "block",
              top:"0",
              width:"37vmin",
              paddingRight:"0",
              margin:"0 auto",
            }}
          />
          <div
           style={{
             textAlign:"center",
              margin:"0 auto",
              color:"black",
            }}
          >
            <h1>
              <span 
              onClick={e => this.setSort(e, "popular")}
              className="sort"
              >
                Popular 
              </span>
              <span>  |  </span>
              <span 
              onClick={e => this.setSort(e, "recent")} 
              className="sort"
              >
                Recent
              </span>
            </h1>
          </div>
        </div>
        <Home items={this.state.items} />
      </div>
    )
  }
}

class Home extends React.Component{
  render(){
    var {items} = this.props
    return (
      <div className="container">
        <div id="feed" >
          {items.length > 0 ? 
            items.map((item)=>(
              <Item item={item}/>))
            :"" 
          }
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

// function setSort (e, sort) {
//   e.preventDefault();
//   console.log(sort, "clicked")
  
//   fetch(`/api/${id}`,{
//     method: 'PUT'
// })
//   .then(res => res.json(), window.location.reload(false))
//   .catch(console.log)

// this.setState({sort:"weird"})
// }

function upvote(e, id) {
  e.preventDefault();
  console.log(id, "clicked")
  fetch(`/up/${id}`,{
    method: 'PUT'
})
  .then(res => res.json())
  .then(res => console.log(res))
//   // .then((items) => this.setState({items: items.data}))
  .catch(console.log)
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
);
