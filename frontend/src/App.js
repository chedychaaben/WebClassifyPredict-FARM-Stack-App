import React, { Component } from 'react';
// Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Components
import Header from './components/Header';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp';

// Redux 
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    return (
      <Router>
        <Header />
        <>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/">
            { this.props.isLoggedIn ? 
              <HomePage />
              :
              <Redirect to="/login" />
            }
          </Route>
        </Switch>
        </>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App); // Pass all store props and actions to watever child on the app