import React from 'react'

async function UserProfile({params}:any) {
  const id = await params.id
  return (
    <div key={id}>UserProfile {id}</div>
  )
}

export default UserProfile