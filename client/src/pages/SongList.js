import React, {useState, useEffect } from 'react'
import Song from '../components/Song'
import SongForm from '../components/SongForm'

const SongList = () => {
    const [songs, setSongs] = useState([])
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
                    setSongs(data)
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
            setSongs([...songs, data])
            setFlag(false)
        })
    }

    // const deletePlaylist = (playlistTarget) => {
    //     fetch(`/playlists/${playlistTarget}`, {
    //         method: "DELETE",
    //         headers: {
    //         'Content-type': 'application/json'
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(setPlaylists([playlists.filter(p => p.id !== playlistTarget)]))
    //     .catch(error => console.log(error))
    // }
    

    const listPlaylists = songs.map(s =>    <div key={s.id}>
                                                    <li>
                                                        <h2>
                                                            {s.name}
                                                            
                                                        </h2>
                                                    </li>
                                                    <button >Delete</button>
                                                    <br/>
                                                </div>)
// onClick={() => deletePlaylist(p.id)}

    if(error === ''){
        return (
            <div>
                <ul>
                    {listPlaylists}
                    <br/><br/><br/>
                    {formFlag ?
                        <SongForm addPlaylist={addPlaylist}/>
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
export default SongList