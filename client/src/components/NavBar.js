import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";

export const NavBar = () => {
  return (
    <div>
      
    </div>
  )
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
