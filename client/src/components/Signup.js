import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Error, Input, FormField, Label, Textarea } from "../styles";

const Signup = ({loginUser}) => {

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        password: password,
        passwordConfirmation: passwordConfirmation
      })
    })
    .then(res => res.json())
    .then(user => loginUser(user))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name: </label>
      <input 
        type="text"
        id="name"
        value={name}
        autoComplete="off"
        onChange={(e) => setName(e.target.value)}
      />      
      <br/>
      <label>Password: </label>
      <input 
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />   
      <br/>
      <label>Confirm Password: </label>
      <input 
        type="password"
        id="password_confirmation"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />   
      <br/>
      <input type="submit"/>
    </form>
  )
}
export default Signup