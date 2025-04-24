"use client"
import React from 'react'
import { useAuthContext } from '../context/AuthContext';

const Profile = () => {
     const { authUser } = useAuthContext();

  return (
    <div className='w-full h-screen bg-gray-200'>
        <h2 className='font-bold text-gray-600 '>profile</h2>
        <div className='bg-gray-100 p-6 rounded-2xl my-4'>
            {authUser?.email}
        </div>

    </div>
  )
}

export default Profile

// {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmNkNWM0M2IxOGEzOGE4YzAxOTdkYiIsImVtYWlsIjoibXloQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQ1NDM4Njg4LCJleHAiOjE3NDgwMzA2ODh9.1T0rkcnp8qamW9pkLIf-9vPs97Ip6jNPuvRzD2lipmQ","email":"myh@gmail.com","role":"user"}