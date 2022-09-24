import "./style/App.css"
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
  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />
    }

    return <Spinner message="Please accept location request" />
  }

  render() {
    return <div className="border red">{this.renderContent()}</div>
  }
}

ReactDOM.render(<App />, document.querySelector("#root"))
