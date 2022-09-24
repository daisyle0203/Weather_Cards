import React from "react"
import ReactDOM from "react-dom"
import SeasonDisplay from "./SeasonDisplay"
import Spinner from "./Spinner"

class App extends React.Component {
  state = { lat: null, errorMessage: "" }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      // If we want to update state, we use setState
      (position) => {
        this.setState({ lat: position.coords.latitude })
      },
      (err) => this.setState({ errorMessage: err.message })
    )
  }

  // render method that App borrows from react component
  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />
    }

    return <Spinner />
  }
}

ReactDOM.render(<App />, document.querySelector("#root"))
