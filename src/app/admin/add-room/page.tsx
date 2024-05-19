"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"

export default function AddRoomPage() {
  const router = useRouter()
  const [room, setRoom] = useState({
    title: "",
    description: "",
    imageUrl: "",
    rent: 0
  })

  async function onAdd() {
    try {
      await axios.post('/api/add-room', room)
      router.push('/home')
    } catch (error: any) {
      console.log(error)
    }
  }
  return (
    <div>Add new room
      <div>
        <div>
          <label>Title:</label>
          <input type="text" value={room.title} onChange={(e) => setRoom({ ...room, title: e.target.value })} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={room.description} onChange={(e) => setRoom({ ...room, description: e.target.value })} required />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={room.imageUrl} onChange={(e) => setRoom({ ...room, imageUrl: e.target.value })} required />
        </div>
        <div>
          <label>Rent:</label>
          <input type="number" value={room.rent} onChange={(e) => setRoom({ ...room, rent: Number(e.target.value) })} required />
        </div>
        <div>
          <button onClick={onAdd}>Add</button>
        </div>
      </div>
    </div>
  )
}
