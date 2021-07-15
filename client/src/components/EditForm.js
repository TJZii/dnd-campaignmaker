import React, {useState} from 'react'

const EditForm = ({editTitle}, {thisID}) => {
    const [name, setName] = useState("")
    const [id, setID] = useState("")
  
    const handleSubmit = (e) => {
      e.preventDefault();
      editTitle({
          name: name,
          playlist_id: id
      })
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <label>Playlist Name: </label>
        <input 
          type="text"
          id="name"
          value={name}
          autoComplete="off"
          onChange={(e) => {
              setID(thisID)
              setName(e.target.value)}}
        />      
        <br/>
        <input type="submit"/>
      </form>
    )
  }
  export default EditForm