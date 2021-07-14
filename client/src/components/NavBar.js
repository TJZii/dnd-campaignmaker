import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";

export const NavBar = (props) => {

  console.log(props.loggedIn)

  if(props.loggedIn){
    return (
      <div>
        <h1>Hello {props.user.name}</h1>
      
        <br/>


        {/* <Link to="/logout"><button>Log Out</button></Link> */}

      </div>
    )
  } else {
    return (
      <div>
        <br/>
        
        <Link to="/login"><button>Log In</button></Link>

        <br/>

        <Link to="/signup"><button>Create Account</button></Link>
      </div>
    )
  }
}

// function NavBar({ user, setUser }) {
  // function handleLogoutClick() {
  //   fetch("/logout", { method: "DELETE" }).then((r) => {
  //     if (r.ok) {
  //       setUser(null);
  //     }
  //   });
  // }

  // return (
  //   <Wrapper>
  //     <Logo>
  //       <Link to="/">Personalized Song List</Link>
  //     </Logo>
  //     <Nav>
  //       <Button as={Link} to="/new">
  //         Add a song
  //       </Button>
  //       <Button variant="outline" onClick={handleLogoutClick}>
  //         Logout
  //       </Button>
  //     </Nav>
  //   </Wrapper>
  // );
// }

// const Wrapper = styled.header`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 8px;
// `;

// const Logo = styled.h1`
//   font-family: "Permanent Marker", cursive;
//   font-size: 3rem;
//   color: deeppink;
//   margin: 0;
//   line-height: 1;

//   a {
//     color: inherit;
//     text-decoration: none;
//   }
// `;

// const Nav = styled.nav`
//   display: flex;
//   gap: 4px;
//   position: absolute;
//   right: 8px;
// `;

export default NavBar;
