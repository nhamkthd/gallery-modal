import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import './style.css';
import history from "./common/history";
import Login from "./components/Login";
import DefaultLayout from "./components/layout/DefaultLayout";
import NoMatch from "./components/NoMatch";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  componentDidMount() {
    console.log("App component did mount!");
  }
  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong...!</div>;
    }
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/login" name="Login page" component={Login} />
            <Route path="/" name="Home" component={DefaultLayout} />
            <Route exact path="*" component={NoMatch} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
