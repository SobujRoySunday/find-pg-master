import React from 'react'

const Contact = ({phone, email, setContactDisplay}) => {
  return (
    <div className='absolute top-0 left-0 bg-[#000000dd] w-screen h-screen flex justify-center items-center'>
      <div className='relative bg-gray-200 p-10 rounded-lg shadow-xl flex flex-col justify-center items-center gap-2'>
        <div className='flex flex-col items-center justify-center'>
        <h3 className='italic font-semibold text-xl'>Contact Number</h3>
        <p>{phone}</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
        <h3 className='italic font-semibold text-xl'>Email ID</h3>
        <p>{email}</p>
        </div>
        <div className='cursor-pointer font-bold absolute top-1 right-4' onClick={()=>{setContactDisplay(false)}}>X</div>
      </div>
    </div>
  )
}

export default Contact