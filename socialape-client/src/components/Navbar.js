import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import { connect } from "react-redux";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PostScream from "./PostScream";
import Notifications from "./Notifications";
class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar position="fixed">
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              {" "}
              <PostScream />
              <MyButton tip="Home">
                <Link to="/">
                  <HomeIcon color="primary" />
                </Link>
              </MyButton>
              <Notifications />
            </Fragment>
          ) : (
            <Fragment>
              {" "}
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}
Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});
export default connect(mapStateToProps)(Navbar);
