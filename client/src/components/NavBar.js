import React from "react";
// import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
// import styled from "styled-components";
// import { Button } from "../styles";

const NavBar = (props) => {

  if(props.loggedIn){
    return (
      <div>
        <h1>Hello {props.user.name}! Welcome to your playlist hub!</h1> 
        <Link to="/"><button>Home</button></Link>
        <Link to="/playlists"><button>Your Playlists</button></Link>
        <Link to="/longestSong"><button>Longest Song Name</button></Link>
        <br/>
        <br/>
        <button onClick={props.logoutUser}>Log Out</button>
      </div>
    )
  } else {
    return (
      <div>

        <h1>Please log in or create an account.</h1>
        <br/>
        
        <Link to="/login"><button>Log In</button></Link>
        <br/>
        <Link to="/signup"><button>Create Account</button></Link>
      </div>
    )
  }
}

export default NavBar;
