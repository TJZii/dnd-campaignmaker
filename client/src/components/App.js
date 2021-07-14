import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "./Signup";
import Playlists from "./Playlists";

function App(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    fetch('/me')
    .then(res => {
      if(res.ok) {
        res.json()
        .then(u => {
          setLoggedIn(true)
          setUser(u)
        })
      }
    })
  }, [])

  const loginUser = (u) => {
    setLoggedIn(true)
    setUser(u)
    history.push('/')
  }

  const logoutUser = () => {
    fetch('/logout', {
      method: 'DELETE'
    })
    .then(() => {
      console.log("logged out")
      setLoggedIn(false)
      setUser({})
    })
    history.push('/')
  }

  return (
    <div className="App">
      <NavBar user={user} loggedIn={loggedIn} logoutUser={logoutUser}/>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/signup" render={routerProps => <Signup {...routerProps} loginUser={loginUser}/> }/>
        <Route exact path="/playlistlist" render={routerProps => <Playlists {...routerProps} user={user} loggedIn={loggedIn}/>}/>
        <Route exact path="/login" render={routerProps => <Login {...routerProps} loginUser={loginUser}/> }/>
      </Switch>
    </div>
  );
}

export default App;
