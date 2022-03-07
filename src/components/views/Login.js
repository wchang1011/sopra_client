import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {NavLink, useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormFieldInput = props => {
    return (
        <div className="register field">
            <label className="register label">
                {props.label}
            </label>
            <input
                className="register input"
                placeholder="enter here.."
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

const FormFieldPassword = props => {
    return (
        <div className="register field">
            <label className="register label">
                {props.label}
            </label>
            <input
                type = "password"
                className="register input"
                placeholder="enter here.."
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormFieldInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

FormFieldPassword.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

const Login = props => {
  const history = useHistory();
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({username, password});
      const response = await api.post('/login', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);
      console.log(user);
      // Store the token into the local storage.
      localStorage.setItem('token', user.token);
      localStorage.setItem('id', user.id);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push( `/game`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="nav">
              <NavLink
                  to="/home"
                  style={{
                      color: 'rgb(255,255,255)',
                      background: 'rgba(118,0,220,0)',
                      margin: 10,
                  }}
              >
                  Home
              </NavLink>
              <NavLink
                  to="/register"
                  style={{
                      color: 'rgb(255,255,255)',
                      background: 'rgba(118,0,220,0)',
                      margin: 10
                  }
                  }
              >
                  Register
              </NavLink>
              <NavLink
                  to="/login"
                  style={{
                      color: 'rgb(255,255,255)',
                      background: 'rgba(118,0,220,0)',
                      margin: 10
                  }
                  }
              >
                  Login
              </NavLink>
          </div>
        <h3 className="login title">Login Here.</h3>
        <div className="login form">
          <FormFieldInput
            label="Username"
            value={username}
            onChange={un => setUsername(un)}
          />
          <FormFieldPassword
            label="Password"
            value={password}
            onChange={n => setPassword(n)}
          />
          <div className="login button-container">
            <Button
              disabled={!username || !password}
              width="100%"
              onClick={() => doLogin()}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Login;
