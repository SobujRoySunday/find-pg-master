"use client"

import { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import axios from "axios";
import { LogoutButton } from "../components";
import Link from "next/link";

interface RoomType {
  id: string,
  title: string,
  description: string,
  rent: number,
  imageUrl: string
}

export default function HomePage() {
  const [rooms, setRooms] = useState([])

  async function getRooms() {
    try {
      const response = await axios.get('api/get-rooms')
      console.log(response);
      setRooms(response.data.rooms)
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRooms()
  }, [])

  return (
    <div className="w-screen min-h-screen flex justify-center">
      <div className="w-3/5 bg-gray-300 flex flex-col">
        <nav className="px-5 py-2 flex flex-row justify-between items-center">
          <h1 className="text-2xl text-gray-900 font-bold italic">FindPG</h1>
          <ul className="flex flex-row gap-2 items-center">
            <li>
              <Link className="px-5 py-2 bg-yellow-500 text-white rounded-lg" href="/add-room">Add room</Link>
            </li>
            <li>
              <LogoutButton>Logout</LogoutButton>
            </li>
          </ul>
        </nav>
        <hr />
        <div className="p-5">
          <h1 className="text-6xl font-light text-yellow-600 my-10">Available Rooms</h1>
          <div className="flex flex-wrap justify-center gap-5">
            {
              rooms.length ?
                rooms.map((room: RoomType) => {
                  return <RoomCard key={room.id} title={room.title} description={room.description} rent={room.rent} imageUrl={room.imageUrl} />
                }) : '0 rooms found'
            }
          </div>
        </div>
      </div>
    </div>
  )
}
