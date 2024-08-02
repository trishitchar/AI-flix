import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const user = useSelector((store)=>store.user.user);
    if(!user) return null;

  return (
    <div>
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
    </div>
  )
}

export default Profile