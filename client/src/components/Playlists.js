import React, {useState, useEffect } from 'react'
import PlaylistForm from './PlaylistForm'
import { Link } from 'react-router-dom';
import EditForm from './EditForm';

const Playlists = (props) => {
    const [playlists, setPlaylists] = useState([])
    const [error, setError] = useState("")
    const [playlistFormFlag, setPlFlag] = useState(false)
    const [editFormFlag, setEditFlag] = useState(false)
    const [thisID, setID] = useState("")
    
    useEffect(()=> {
        fetch('/playlists')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data){
                if(data.error){
                    setError(data.error)
                } else {
                    setPlaylists(data)
                }
            } else {
                setError("Not Authorized")
            }
        })
    }, [])

    const addPlaylist = (playlist) => {
        fetch('/playlists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playlist)
        })
        .then(res =>res.json())
        .then(data => {
            console.log(data)
            setPlaylists([...playlists, data])
            setPlFlag(false)
            setEditFlag(false)
        })
    }


    const editTitle = (e) => {
        fetch(`/playlists/${thisID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(e)
        })
        .then(res => res.json())
        .then(update => {
            console.log(update)
            let newlist = playlists.filter(p => p.id !== thisID)
            setPlaylists([...newlist, update])
            setPlFlag(false)
            setEditFlag(false)
            
        })
    }


    const deletePlaylist = (playlistTarget) => {
        fetch(`/playlists/${playlistTarget}`, {
            method: "DELETE"
        })
        .then(() => {
            let newlist = playlists.filter(p => p.id !== playlistTarget)
            setPlaylists(newlist)
        })
        .catch(error => console.log(error))
    }
    

    const listPlaylists = playlists.map(p =>  <div key={p.id}>
        <h1>
            {p.name}
            <br/>
            Songs: {p.songs.length}
        </h1>
        {editFormFlag ?
            <EditForm editTitle={editTitle} thisID={p.id}/>
            :
            <button onClick={() => {setEditFlag(true); setID(p.id);}}>Edit Name</button>
        }
        <Link to={`/playlists/${p.id}/songs`}><button onClick={() => props.readyPing(p.id)}>View Playlist</button></Link>
        <button onClick={() => deletePlaylist(p.id)}>Delete</button>
        <br/>
    </div>)




    if(error === ''){
            return (
                <div>
                    <ul>
                        {listPlaylists}
                        <br/><br/><br/>
                        {playlistFormFlag ?
                            <PlaylistForm addPlaylist={addPlaylist}/>
                            :
                            <button onClick={()=> setPlFlag(true)}>Add Playlist</button> 
                        }
                    </ul>
                </div>
            )
    } else {
        return(
            <h3>Not Authorized - Please create a profile or log in.</h3>
        )
    }

}
export default Playlists