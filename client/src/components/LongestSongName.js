import React, {useState, useEffect } from 'react'
import ReactPlayer from 'react-player';

const LongestSongName = (props) => {
    const [longestSong, setSongs] = useState({})


    useEffect(()=> {
            fetch('/longestSong')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setSongs(data)
            })
            .then(
                console.log(longestSong),
                console.log(longestSong.playlist),
                // console.log(longestSong.playlist.name)
            )
    }, [])


    return (
        <div>
            <h1>"{longestSong.name}" by {longestSong.artist}</h1>
            <ReactPlayer url={longestSong.url}/>
            <h2>This is the longest song name that any user has added to a playlist!</h2>
            <br></br>
            {/* <h3>Song added to a playlist named {longestSong.playlist.name} by a user</h3> */}
        </div>
    )
}
export default LongestSongName;