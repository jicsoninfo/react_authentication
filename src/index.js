import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

//import {createRoot} from 'react-dom/client';
//import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';

// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);


// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <App />
    </Router>
 );


// git init
// git add .
// git commit -m "Add existing project files to Git"
// git remote add origin https://github.com/cameronmcnz/example-website.git
// git push -u -f origin master

// git status
//git add .
//git commit -m "message"
//git branch
//git push origin master

/*
//npx create-react-app react-hooks-jwt-auth
//npm install react-router-dom.
//npm install bootstrap@4.6.0.
//npm install axios

//npm install react-validation validator


We’re gonna use these modules:

React 18/17
react-router-dom 6.4.0
axios 0.27.2
react-validation 3.0.7
Bootstrap 4
validator 13.7.0


Last modified: September 22, 2022  bezkoder  React, Security
In this tutorial, we’re gonna build a React.js JWT Authentication: Login and Registration example with LocalStorage, 
React Router, Axios and Bootstrap (without Redux). I will show you:

JWT Authentication Flow for User Signup & User Login
Project Structure for React JWT Authentication (without Redux) with LocalStorage, React Router & Axios
Creating React Components with Form Validation
React Components for accessing protected Resources (Authorization)
Dynamic Navigation Bar in React App

*/