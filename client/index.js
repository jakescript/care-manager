import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"

class App extends React.Component{
    constructor(){
        super()
        this.state = {
          users: []
        }
    }

    async componentDidMount(){
      const r = (await axios.get("/api/users")).data
      this.setState({users: r})
    }

    render(){
        return(
            <div>
              <h1> Users </h1>
                {this.state.users.map(u => {
                  return(
                    <div>
                      <a href={"/users/" + u.id}> <h2 key={u.id}>{u.name}</h2> </a>
                      <p>{u.role}</p>
                    </div>
                  )
                })}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector("#app"))
