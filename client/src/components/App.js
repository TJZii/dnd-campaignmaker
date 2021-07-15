import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "./Signup";
import Playlists from "./Playlists";
import SongList from "../pages/SongList";

function App(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [targetPlaylist, setTargetPlaylist] = useState('')
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

  const readyPing = (id) => {
      setTargetPlaylist(id)
  }

  return (
    <div className="App">
      <NavBar user={user} loggedIn={loggedIn} logoutUser={logoutUser}/>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/signup" render={routerProps => <Signup {...routerProps} loginUser={loginUser}/> }/>
        <Route exact path="/playlists" render={routerProps => <Playlists {...routerProps} user={user} loggedIn={loggedIn} readyPing={readyPing}/>}/>
        <Route exact path="/login" render={routerProps => <Login {...routerProps} loginUser={loginUser}/> }/>
        {/* <Route path="/playlists/:playlist_id" render={routerProps => <SongList {...routerProps} user={user} loggedIn={loggedIn}/>}/> */}
        {/* <Route path={`/playlists/${targetPlaylist}/songs`} render={routerProps => <SongList {...routerProps} user={user} loggedIn={loggedIn} targetPlaylist={targetPlaylist}/>}/> */}
        <Route path={`/playlists/:playlist_id/songs`} render={routerProps => <SongList {...routerProps} user={user} loggedIn={loggedIn} targetPlaylist={targetPlaylist}/>}/>
      </Switch>
    </div>
  );
}

export default App;
