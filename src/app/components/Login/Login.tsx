"use client"

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { handleChange } from '@/app/utils'

const Login = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  async function onLogin(e: { preventDefault: () => void }) {
    e.preventDefault()

    try {
      const response = await axios.post('/api/login', user)
      console.log(response);
      router.push('/home')
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <form className="w-80 flex flex-col justify-center items-center shadow-xl bg-[#00000044] gap-5 p-5 rounded-lg">
      <h1 className="text-4xl text-primary">Login</h1>
      <div className="flex flex-col gap-2 w-full">
        <div>
          <label className="label">
            <p className="text-xs text-gray-300">Email</p>
          </label>
          <input className="input input-ghost w-full" type="email" name="email" value={user.email} onChange={(e) => { handleChange(e, setUser) }} required />
        </div>
        <div>
          <label className="label">
            <p className="text-xs text-gray-300">Password</p>
          </label>
          <input className="input input-ghost w-full" type="password" name="password" value={user.password} onChange={(e) => { handleChange(e, setUser) }} required />
          <div>
            <Link className="hover:link text-xs text-gray-300" href='/signup'>Create an account?</Link>
          </div>
        </div>
      </div>
      <button className="btn btn-primary w-full" onClick={onLogin}>Login</button>
    </form>
  )
}

export default Login