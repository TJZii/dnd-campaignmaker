import React, {useState} from 'react'

const SongForm = ({addSong}) => {
    const [name, setName] = useState("")
    const [artist, setArtist] = useState("")
    const [url, setUrl] = useState("")
  
    const handleSubmit = (e) => {
      e.preventDefault()
      addSong({
          name: name,
          artist: artist,
          url: url
      })
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input 
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />      
        <br/>
        <br/>
        <label>Artist: </label>
        <input 
          type="text"
          id="artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />      
        <br/>
        <br/>
        <label>Video URL: </label>
        <input 
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />      
        <br/>
        <input type="submit"/>
      </form>
    )
  }
export default SongForm