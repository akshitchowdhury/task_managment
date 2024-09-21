import React, { useEffect, useState } from 'react'

const UserTrack = () => {
  
    const [trackList,setTrackList] = useState([])
  const users  = async()=> {
    const response = await fetch('https://api.escuelajs.co/api/v1/users')
    const data = await response.json()
    
    setTrackList(data)
}
useEffect(()=>{
    users()
},[])
    return (
    <div>
        {
            trackList.map((user)=>(
                <div>
                    <h1>{user.name}</h1>
                </div>
            ))
        }
    </div>
  )
}

export default UserTrack
