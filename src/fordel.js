/*

Before working with these services, we need to install Axios with command:
npm install axios

Authentication service
The service uses Axios for HTTP requests and Local Storage for user information & JWT.
It provides following important functions:

login(): POST {username, password} & save JWT to Local Storage
logout(): remove JWT from Local Storage
register(): POST {username, email, password}
getCurrentUser(): get stored user information (including JWT)
*/

//=====================================================

//services/auth.service.js

import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;

//==============================================================
// Data service
// We also have methods for retrieving data from server. 
//In the case we access protected resources, 
//the HTTP request needs Authorization header.

// Let’s create a helper function called authHeader() inside auth-header.js:

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}
//The code above checks Local Storage for user item. If there is a logged in user with accessToken (JWT), return HTTP Authorization header. Otherwise, return an empty object.

//Note: For Node.js Express back-end, please use x-access-token header like this:

// export default function authHeader() {
//   const user = JSON.parse(localStorage.getItem('user'));

//   if (user && user.accessToken) {
//     // for Node.js Express back-end
//     return { 'x-access-token': user.accessToken };
//   } else {
//     return {};
//   }
// }
//Now we define a service for accessing data in services/user.service.js:

import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;
//You can see that we add a HTTP header with the help of authHeader() function when requesting authorized resource.

//================================================================================

// Create React Pages for Authentication
// In src folder, create new folder named components and add several files as following:

//  components

//  Login.js

//  Register.js

//  Profile.js

// Form Validation overview
// Now we need a library for Form validation, so we’re gonna add react-validation library to our project.
// Run the command: npm install react-validation validator

// To use react-validation in this example, you need to import following items:

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { isEmail } from "validator";
// We also use isEmail() function from validator to verify email.

// This is how we put them in render() method with validations attribute:

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

render() {
  return (
  ...
    <Form
      onSubmit={handleLogin}
      ref={form}
    >
      ...
      <Input
        type="text"
        className="form-control"
        ...
        validations={[required, email]}
      />

      <CheckButton
        style={{ display: "none" }}
        ref={checkBtn}
      />
    </Form>
  ...
  );
}
//We’re gonna call Form validateAll() method to check validation functions in validations. Then CheckButton helps us to verify if the form validation is successful or not. So this button will not display on the form.

form.validateAll();

if (checkBtn.context._errors.length === 0) {
  // do something when no error
}
// If you need Form Validation with React Hook Form 7, please visit:
// React Form Validation with Hooks example

// Or Formik and Yup:
// React Form Validation example with Hooks, Formik and Yup
//=====================================================================================================
// Support Router functions
// From the react-router-dom v6, the support for history has been deprecated. So we need a wrapper (HOC) that can use new useful hooks.

// In src folder, create common/with-router.js file with following code:

import { useLocation, useNavigate, useParams } from "react-router-dom";

export const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
};


//==============================================================================================================================
// Login Page
// This page has a Form with username & password.
// – We’re gonna verify them as required field.
// – If the verification is ok, we call AuthService.login() method, then direct user to Profile page using useNavigate() hook, or show message with response error.

// components/Login.js

import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;