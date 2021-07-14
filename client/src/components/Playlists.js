// import { c } from 'keyboard-key'
import React, {useState, useEffect } from 'react'
import PlaylistForm from './PlaylistForm'
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import SongForm from './SongForm';

const Playlists = (props) => {
    const [playlists, setPlaylists] = useState([])
    const [songs, setSongs] = useState([])
    const [error, setError] = useState("")
    const [playlistFormFlag, setPlFlag] = useState(false)
    const [songFormFlag, setSongFlag] = useState(false)
    const [currentListing, setListing] = useState(-1)

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
                    setSongs([])
                    setListing(-1)
                    setSongFlag(false)
                }
            } else {
                setError("Not Authorized")
            }
        })
    }, [])

    const returnView = () => {
        fetch('/playlists')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data){
                if(data.error){
                    setError(data.error)
                } else {
                    setPlaylists(data)
                    setSongs([])
                    setListing(-1)
                    setSongFlag(false)
                }
            } else {
                setError("Not Authorized")
            }
        })
    }

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
        })
    }

    const addSong = (song) => {
        fetch(`/playlists/${currentListing}/songs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(song)
        })
        .then(res =>res.json())
        .then(data => {
            console.log(data)
            setSongs([...songs, data])
            setSongFlag(false)
        })
    }

    const playlistView = (targetList) => {
        fetch(`/playlists/${targetList}/songs`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data){
                if(data.error){
                    setError(data.error)
                } else {
                    setSongs(data)
                    setListing(targetList)
                }
            } else {
                setError("Not Authorized")
            }
        })
    }

    const deleteSong = (songTarget) => {
        fetch(`/playlists/${currentListing}/songs/${songTarget}`, {
            method: "DELETE"
        })
        .then(() => {
            let newlist = songs.filter(s => s.id !== songTarget)
            setSongs(newlist)
        })
        .catch(error => console.log(error))
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
        <button onClick={() => playlistView(p.id)}>View/Edit Playlist</button>
        <button onClick={() => deletePlaylist(p.id)}>Delete</button>
        <br/>
    </div>)

    const listSongs = songs.map(s => <div key={s.id}>
        <h2>
            {s.name} - {s.artist} - 
            <button onClick={() => deleteSong(s.id)}>Delete</button>
            <br/>
            <ReactPlayer url={s.url}/>
        </h2>
    </div>)




    if(error === ''){
        if(currentListing === -1){
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
            return (
                <div> 
                    <br/>
                    <button onClick={returnView}>Return to Playlists</button>
                    <ul>

                        {listSongs}
                        <br/><br/><br/>
                        {songFormFlag ?
                            <SongForm addSong={addSong}/>
                            :
                            <button onClick={()=> setSongFlag(true)}>Add Song</button> 
                        }
                    </ul>
                    
                </div>
            )
        }
    } else {
        return(
            <h3>Not Authorized - Please create a profile or log in.</h3>
        )
    }

}
export default Playlists