"use client"
import React from 'react'
import { useAuthContext } from '../context/AuthContext';

const Profile = () => {
     const { authUser } = useAuthContext();

  return (
    <div className='w-full h-screen bg-gray-200'>
        <h2 className='font-bold text-gray-600 '>profile</h2>
        <div className='bg-gray-100 p-6 rounded-2xl my-4'>
            {authUser?.user.email}
        </div>

    </div>
  )
}

export default Profile