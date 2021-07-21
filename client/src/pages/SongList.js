import React, {useState, useEffect } from 'react'
import ReactPlayer from 'react-player';
import SongForm from '../components/SongForm';
import { Link, useHistory } from 'react-router-dom';

const SongList = (props) => {
    const [songs, setSongs] = useState([])
    const [error, setError] = useState("")
    const [songFormFlag, setSongFlag] = useState(false)
    const [target, setTarget] = useState(props.targetPlaylist)
    const history = useHistory();

    useEffect(()=> {
        fetch(`/playlists/${target}/songs`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data){
                if(data.error){
                    setError(data.error)
                    history.push('/playlists')
                } else {
                    setSongs(data)
                }
            } else {
                setError("Not Authorized")
            }
        })
    }, [])

    const addSong = (song) => {
        fetch(`/playlists/${target}/songs`, {
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

    const deleteSong = (songTarget) => {
        fetch(`/playlists/${target}/songs/${songTarget}`, {
            method: "DELETE"
        })
        .then(() => {
            let newlist = songs.filter(s => s.id !== songTarget)
            setSongs(newlist)
        })
        .catch(error => console.log(error))
    }

    const listSongs = songs.sort((a, b) => a.name.localeCompare(b.name)).map(s => <div key={s.id}>
        <h2>
            {s.name} - {s.artist} - 
            <button onClick={() => deleteSong(s.id)}>Delete</button>
            <br/>
            <ReactPlayer url={s.url}/>
        </h2>
    </div>)

    return (
        <div> 
            <br/>
            <Link to="/playlists"><button>Return to Playlists</button></Link>
            <ul>
                {songFormFlag ?
                    <SongForm addSong={addSong}/>
                    :
                    <button onClick={()=> setSongFlag(true)}>Add Song</button> 
                }
                <br/><br/><br/>
                {listSongs}
            </ul>
            
        </div>
    )
}
export default SongList