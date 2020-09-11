import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import home from "./pages/home";
import signup from "./pages/signup";
import login from "./pages/login";
import Navbar from "./components/Navbar";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import jwtDecode from "jwt-decode";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import AuthRoute from "./util/AuthRoute";
import themeFile from "./util/theme";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
import axios from "axios";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import user from "./pages/user";
const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <Route exact path="/users/:handle" component={user} />
                <Route
                  exact
                  path="/users/:handle/scream/:screamId"
                  component={user}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
