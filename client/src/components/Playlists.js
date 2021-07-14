// import { c } from 'keyboard-key'
import React, {useState, useEffect } from 'react'
import PlaylistForm from './PlaylistForm'
import { Link } from 'react-router-dom';

const Playlists = (props) => {
    const [playlists, setPlaylists] = useState([])
    const [error, setError] = useState("")
    const [formFlag, setFlag] = useState(false)

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
            setFlag(false)
        })
    }
    

    const listPlaylists = playlists.map(p =>    <div key={p.id}>
                                                    <Link  to={`playlistlist/${p.name}`}>
                                                        <h2>
                                                            {p.name}
                                                            <br/>
                                                            Songs: {p.songs.length}
                                                        </h2>
                                                    </Link>
                                                    <button>Delete</button>
                                                    <br/>
                                                </div>)


    if(error === ''){
        return (
            <div>
                <ul>
                    {listPlaylists}
                    <br/><br/><br/>
                    {formFlag ?
                        <PlaylistForm addPlaylist={addPlaylist}/>
                        :
                        <button onClick={()=> setFlag(true)}>Add Playlist</button> 
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