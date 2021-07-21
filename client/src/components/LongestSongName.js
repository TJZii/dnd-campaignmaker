import React, {useState, useEffect } from 'react'

const LongestSongName = (props) => {
    const [songs, setSongs] = useState([])

    useEffect(()=> {
        fetch('/longestSong')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data){
                setSongs(data.name)
        }})
    }, [])


    return (
        <div>
            <h1>"{songs}"</h1>
            <h2>This is the longest song name that any user has added to a playlist!</h2>
        </div>
    )
}
export default LongestSongName;