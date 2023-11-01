// function login

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react'

function Login() {

const [user, setUser] = useState({
    email:"",
    password:"",

});

const navigate = useNavigate()

const submitLogin = () => {
    axios
    .post("http://localhost:5000/login", user)
    .then((response) => {
        response.status === 200
        ? navigate("/MovieList")
        :console.log("failed to connect");
    })
    .catch((error) => {
        console.log("error",error);
        alert("verify your info")

     });
     
    }; 

  return (
    <div
    style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center",}}>
      
      <h2>Enter your login informations</h2>
      <input
      name="email"
      type="email"
    //   la ligne suivante par choix
    value={user.email}

      placeholder="enter your email"
      on onChange={(event) => setUser({...user, email: event.target.value})}
    //   on change pour lire la valeur entrante dans l'input
/>

      <input
      name="password"
      type="password"
      placeholder="enter your password"
      onChange={(event) => setUser({...user, password: event.target.value})}
/>


<button onClick={() => submitLogin()}>Login</button>
    </div>
  );
  }

export default Login
