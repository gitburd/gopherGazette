class Greeting extends React.Component {
  render() {
      return (<p>Hey ya'all, I'm a react</p>);
  }
}

class App extends React.Component{
  componentWillMount= function() {
  }

  state = {
      items: [
        {ID: "1", Title: "note1 1 1", Details: "type type type", Likes:0, Url: "https://tse1.mm.bing.net/th?id=OIP.Uzd2n_pZTnQkCK0_MHE81wHaEq&pid=Api"},
        {ID: "2", Title: "the foundation", Details:"information! learn my information!", Likes:0, Url: "https://tse3.mm.bing.net/th?id=OIP.jy4Ho-AVDIf__a3RJAEsVwHaIc&pid=Api"},
        {ID: "3", Title: "Gotta Learn go", Details:"not a scam. i promise. not click bate", Likes:0, Url: "https://tse2.mm.bing.net/th?id=OIP.pFaeNO48gYlRMQii977cQgHaET&pid=Api"}
      ]
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
            <div className="col-xs-12 jumbotron text-center" id="feed" >
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
  const { ID, Title, Details, Url, Likes} = this.props.item;
  return(
    <div>
      <div className="col-xs-12" style={{padding:'15px'}}>
        <div className="panel panel-default">
          <div className="panel-heading" className="title">
            {Title} 
          </div>
          <img className="item-image" src={Url} alt=""/>
          <div className="panel-body"> 
        
            {Details}
          </div>
          <div class="like_button_container" data-commentid="1">
            {/* <LikeBtn ID={ID}/> */}
          </div>
        </div>
      </div>
    </div>
  )
}
}

// class LikeBtn extends React.Component{
// constructor(props) {
//   super(props);
//   this.state = { liked: false };
// }
// render() {
//   if (this.state.liked) {
//     return 'You liked it!'  
//   }

//   return e(
//     'button',
//     { onClick: () => this.setState({ liked: true }) },
//     'Like'
//   );
// }
// }



ReactDOM.render(
  <App />,
  document.getElementById("app")
);


