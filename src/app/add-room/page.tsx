"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { handleChange } from "../utils"
import Link from "next/link"
import { CldUploadWidget } from "next-cloudinary"

export default function AddRoomPage() {
  const router = useRouter()
  const [room, setRoom] = useState({
    title: "",
    description: "",
    rent: 0,
    imageUrl: "",
    addr1: "",
    addr2: "",
    author: ""
  })

  console.log(room);


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

  async function onAdd(e: { preventDefault: () => void }) {
    e.preventDefault()
    try {
      const response = await axios.post('/api/add-room', room)
      console.log(response);
      router.push('/home')
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setRoom(prevRoom => ({ ...prevRoom, author: user }))
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
      <form className="w-80 bg-slate-300 shadow-xl rounded-lg flex flex-col items-center p-5 gap-2">
        <h1 className="text-gray-800 text-4xl mb-3">List your room</h1>
        <div className="flex flex-col gap-1 w-full">
          <label className="text-xs text-gray-600">Title</label>
          <input className="rounded input input-accent" name="title" type="text" value={room.title} onChange={(e) => { handleChange(e, setRoom) }} required />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="text-xs text-gray-600">Description</label>
          <input className="rounded input input-accent" name="description" type="text" value={room.description} onChange={(e) => { handleChange(e, setRoom) }} required />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="text-xs text-gray-600">Rent</label>
          <input className="rounded input input-accent" name="rent" type="number" value={room.rent} onChange={(e) => { handleChange(e, setRoom) }} required />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="text-xs text-gray-600">Address Line 1</label>
          <input className="rounded input input-accent" name="addr1" type="text" value={room.addr1} onChange={(e) => { handleChange(e, setRoom) }} required />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="text-xs text-gray-600">Address Line 2</label>
          <input className="rounded input input-accent" name="addr2" type="text" value={room.addr2} onChange={(e) => { handleChange(e, setRoom) }} required />
        </div>
        <CldUploadWidget uploadPreset="cqaussj8" onSuccess={(result: any) => {
          setRoom(prev => ({ ...prev, imageUrl: result.info.secure_url }))
        }}>
          {({ open }) => {
            return (
              <button className="bg-yellow-600 text-white px-5 py-2 w-full rounded" onClick={(e) => {
                e.preventDefault()
                open()
              }}>
                Upload an Image
              </button>
            );
          }}
        </CldUploadWidget>
        {room.imageUrl === "" ? <p className="text-red-600 text-xs">*You must upload a cover image*</p> : null}
        <button disabled={room.author === ""} className={`${room.author === "" ? "bg-green-300 cursor-not-allowed" : "bg-green-500"} w-full text-white rounded px-5 py-2`} onClick={onAdd}>Add</button>
        <Link className="text-sm text-gray-500 hover:link" href={"/home"}>Go home</Link>
      </form>
    </div>
  )
}
