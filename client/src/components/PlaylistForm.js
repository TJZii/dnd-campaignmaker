import React, {useState, useEffect } from 'react'

const PlaylistForm = (addPlaylist) => {
    const [name, setName] = useState("")
  
    const handleSubmit = (e) => {
      e.preventDefault()
      fetch("/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name
        })
      })
      .then(res => res.json())
      .then(data => {

      })
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
        <input type="submit"/>
      </form>
    )
  }
export default PlaylistForm