"use client"

import { UserRoles } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import Link from "next/link"
import { handleChange } from "../utils"

export default function SignUpPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    role: UserRoles.CLIENT,
    phone: ""
  })

  async function onSignup(e: { preventDefault: () => void }) {
    e.preventDefault()

    try {
      const response = await axios.post('/api/signup', user)
      console.log(response);
      router.push('/')
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <main className="w-screen min-h-screen flex justify-center items-center">
      <form className="w-80 flex flex-col justify-center items-center shadow-xl bg-[#00000044] gap-5 p-5 rounded-lg">
        <h1 className="text-4xl text-primary text-center">Create new account</h1>
        <div className="flex flex-col gap-2 w-full">
          <div>
            <label className="label">
              <p className="text-xs text-gray-300">Name</p>
            </label>
            <input className="input input-ghost w-full text-gray-400" type="text" name="name" value={user.name} onChange={(e) => { handleChange(e, setUser) }} required />
          </div>
          <div>
            <label className="label">
              <p className="text-xs text-gray-300">Email</p>
            </label>
            <input className="input input-ghost w-full text-gray-400" type="email" name="email" value={user.email} onChange={(e) => { handleChange(e, setUser) }} required />
          </div>
          <div>
            <label className="label">
              <p className="text-xs text-gray-300">Mobile Number</p>
            </label>
            <input className="input input-ghost w-full text-gray-400" type="text" name="phone" value={user.phone} onChange={(e) => { handleChange(e, setUser) }} required />
          </div>
          <div>
            <label className="label">
              <p className="text-xs text-gray-300">Password</p>
            </label>
            <input className="input input-ghost w-full text-gray-400" type="password" name="password" value={user.password} onChange={(e) => { handleChange(e, setUser) }} required />
          </div>
          <div>
            <label className="label">
              <p className="text-xs text-gray-300">Retype Password:</p>
            </label>
            <input className="input input-ghost w-full text-gray-400" type="password" name="rePassword" value={user.rePassword} onChange={(e) => { handleChange(e, setUser) }} required />
          </div>
          <div>
            <Link className="text-xs text-gray-300 hover:link" href='/'>Already have an account?</Link>
          </div>
        </div>
        <button className="btn btn-primary w-full" onClick={onSignup}>Create</button>
      </form>
    </main>
  )
}
