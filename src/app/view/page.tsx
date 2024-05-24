'use client'

import React, { useState, useEffect } from 'react'
import { Navbar } from '../components'
import axios from 'axios';
import RoomCard from './RoomCard';
import { useRouter } from 'next/navigation';

const View = () => {
  const [user, setUser] = useState("");
  const [rooms, setRooms] = useState([]);
  const router = useRouter()

  const getCurrentUser = async () => {
    try {
      const authResponse = await axios.get('/api/get-current-user');
      const data = authResponse.data.userID.toString();
      return data;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  const getRooms = async () => {
    try {
      const response = await axios.get(`/api/get-rooms-user?u=${user}`);
      setRooms(response.data.rooms)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        setUser(data);
        getRooms()
      })
      .catch((error) => {
        console.log(error);
      })
  }, [user])

  return (
    <div className='w-screen min-h-screen flex flex-col items-center'>
      <div className='w-full h-full md:w-4/5 lg:w-3/5 bg-gray-300'>
        <Navbar />
        <hr />
        <div className='p-5'>
          <h3 className='text-xl mb-4'>Your active listings</h3>
          <div className="flex flex-wrap justify-center gap-5">
            {
              rooms.length ?
                rooms.map((room: any) => {
                  if (room.isBooked === false)
                    return <RoomCard key={room.id} data={room} text="Unlist" fn={() => {
                      location.reload()
                    }} />;
                }) : '0 rooms found'
            }
          </div>
        </div>
        <div className='p-5'>
          <h3 className='text-xl mb-4'>Your inactive listings</h3>
          <div className="flex flex-wrap justify-center gap-5">
            {
              rooms.length ?
                rooms.map((room: any) => {
                  if (room.isBooked === true)
                    return <RoomCard key={room.id} data={room} text="List" fn={() => {
                      location.reload()
                    }} />;
                }) : '0 rooms found'
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default View