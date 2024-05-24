import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

const RoomCard = ({ data, text, fn }: any) => {
  const router = useRouter()

  const unlist = async () => {
    try {
      const response = await axios.patch('/api/toggle-room-state', { id: data.id })
      console.log(response);

      if (response)
        fn()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-full bg-gray-200 card card-normal p-5 flex flex-row'>
      <div className='w-2/5'>
        <Image src={data.imageUrl} alt={data.title} width={1280} height={720} className='rounded-lg' priority />
      </div>
      <div className='w-3/5 px-5 flex flex-col gap-1'>
        <h3 className='text-xl font-semibold'>{data.title}</h3>
        <p>{data.description}</p>
        <div>
          <label className='text-sm text-gray-400'>Address</label>
          <address>
            {data.addr1}<br />
            {data.addr2}
          </address>
        </div>
        <div className='flex flex-row gap-2 justify-start items-center'>
          <div className="badge badge-outline badge-md text-xs">Rent: {data.rent}/-</div>
          <button onClick={unlist} className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>{text}</button>
        </div>
      </div>
    </div>
  )
}

export default RoomCard