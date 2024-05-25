"use client"

import { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import axios from "axios";
import { SearchInput, Navbar , Footer} from "../components";
import { useSearchParams } from "next/navigation";
import Contact from "./Contact";

interface RoomType {
  id: string,
  title: string,
  description: string,
  rent: number,
  imageUrl: string,
  addr1: string,
  addr2: string,
  author: {
    name: string,
    phone: string,
    email: string
  }
}

export default function HomePage() {
  const [rooms, setRooms] = useState([])
  const searchParams = useSearchParams()
  const [contactDisplay, setContactDisplay] = useState(false)
  const [myAuthor, setDisplayAuthor] = useState({
    name: "",
    email: "",
    phone: ""
  })

  async function getRooms(searchQuery: String) {
    try {
      const response = await axios.get(`/api/get-rooms?q=${searchQuery}`)
      console.log(response);
      setRooms(response.data.rooms)
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    const searchQuery = (searchParams.get('q') ? searchParams.get('q') : "") || "";
    getRooms(searchQuery)
  }, [searchParams])

  return (
    <div className="w-screen min-h-screen flex justify-center">
      <div className="w-full md:w-4/5 lg:w-3/5 bg-gray-300 flex flex-col">
        <Navbar />
        <hr />
        <div className="p-5">
          <SearchInput />
          <h1 className="text-6xl font-light text-yellow-600 my-10">Available Rooms</h1>
          <div className="flex flex-wrap justify-center gap-5">
            {
              rooms.length ?
                rooms.map((room: RoomType) => {
                  return <RoomCard key={room.id} title={room.title} description={room.description} rent={room.rent} imageUrl={room.imageUrl} addr1={room.addr1} addr2={room.addr2} author={room.author} setContactDisplay={setContactDisplay} setDisplayAuthor={setDisplayAuthor} />
                }) : '0 rooms found'
            }
          </div>
        </div>
        <Footer/>
      </div>
      {
        contactDisplay ? <Contact phone={myAuthor.phone} email={myAuthor.email} setContactDisplay={setContactDisplay} /> : null
      }
    </div>
  )
}
