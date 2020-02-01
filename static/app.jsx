class App extends React.Component{
  
  state={
    items:[],
    recent:[]
  //   recent: [
  //     {id: "9", title: "No. 9", details: "Golang is now one of the most popular languages for development in the industry. More and more organisations are migrating to use Golang because of its ease of use, concurrency patterns and awesome online community. Go is extremely simple, and has very limited keywords. It is extremely opinionated, and has readily available patterns to achieve certain tasks. One of them is handling panic and recovering from it gracefully. Let us take a look at it. ", likes:10, image:"https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api", url: "https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api", liked:false},
  //     {id: "8", title: "No. 8", details:"", likes:0, image:"https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api", url: "https://tse3.mm.bing.net/th?id=OIP.jy4Ho-AVDIf__a3RJAEsVwHaIc&pid=Api"},
  //     {id: "7", title: "Nov. 7", details:"Today we are launching go.dev, a new hub for Go developers! There you will find a wealth of learning resources to get started with the language, featured use cases, and case studies of companies using Go.", image:"https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api",likes:0, url: "https://tse2.mm.bing.net/th?id=OIP.pFaeNO48gYlRMQii977cQgHaET&pid=Api"},
  //     {
  //       id:"5", title:"eris", details:"Named after the Greek goddess of strife and discord, this package is intended to give you more control over error handling via error wrapping, stack tracing, and output formatting. Basic error wrapping was added in Go 1.13, but it omitted user-friendly Wrap methods and built-in stack tracing. Other error packages provide some of the features found in eris but without flexible control over error output formatting. This package provides default string and JSON formatters with options to control things like separators and stack trace output. However, it also provides an option to write custom formatters via eris.Unpack.",likes:5,image:"https://tse2.mm.bing.net/th?id=OIP.EwgonFYrdaUF5ofu4YNougHaD4&pid=Api", url:"https://github.com/rotisserie/eris"
  //     },
  //   ],
    
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
        </div>
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
      <div className="container">
        <h1 className="h1"
          style={{margin:"5px auto 40px auto"}}
        >
          BREAKING GO NEWS
        </h1>
        <div id="breakingFeed" >
          {recent.length > 0 ? 
            recent.map((item)=>(
              <RecentItem item={item}/>))
            :"" 
          }
        </div>

        <h1 
          className="h1"
          style={{margin:"40px auto"}}
        >
          POPULAR STORIES
        </h1>
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
      <div className="itemContainer">
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
    const { id, title, details, url, image, likes} = this.props.item;
    return(
      <div className="itemContainer">
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
       },
      fetch(`/up/${id}`,{
        method: 'PUT'
      })
      .then(res => res.json())
      .then(res => console.log("res:",res))
      .catch(console.log()),
      );
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
