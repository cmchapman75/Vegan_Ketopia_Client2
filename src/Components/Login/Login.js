import React from "react";
import { Link } from "react-router-dom";
import AuthHelper from "../../Helpers/Auth";
import UserContext from "../../Contexts/UserContext";
import "./Login.css";

class LoginForm extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { }
    },
    onLoginSuccess: () => { }
  };

  state = { error: null };

  static contextType = UserContext;

  loginSubmit = e => {
    e.preventDefault();
    this.setState({ error: null });
    const { username, password } = e.target;
    AuthHelper.login({
      username: username.value,
      password: password.value
    })
      .then(res => {
        username.value = "";
        password.value = "";
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="login">
        <div role="alert" className="login-fail-error">
          {error && <p className="red" id="error-message">{'Incorrect username or password. Please try again.'}</p>}
        </div>
        <header className="Login-Header"></header>
        <form
          className="login-form"
          onSubmit={this.loginSubmit}
        >
          <label
            htmlFor="username"
            className="username-fields-label">
            Username:
            </label>
          <input
            id="username"
            className="inputSmall"
            required
            name="username"
            placeholder="Username"
            onChange={this.userNameChanged}
          />
          <br />
          <label
            htmlFor="password"
            className="password-fields">
            Password:
          </label>
          <input
            id="password"
            className="inputSmall"
            required
            name="password"
            type="password"
            placeholder="Password"
          />
          <h4 id="guestlogin">Are you a guest, please log in with 'Guestuser' and the password of !1asdf@@@M</h4>

          <div className="btn-row">
            <input
              type="submit"
              className="medButton"
              value="Submit"
            />
            <br />
            <Link to="/register">
              <button className="medButton">Create an account</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
