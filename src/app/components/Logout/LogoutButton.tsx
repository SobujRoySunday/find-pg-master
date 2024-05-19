"use client"

import axios from "axios"
import { useRouter } from "next/navigation"

export default function LogoutButton({ children }: { children: any }) {
  const router = useRouter()

  async function logout() {
    try {
      const response = await axios.get('/api/logout')
      console.log(response);
      router.push('/')
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <button onClick={logout} className="px-5 py-2 bg-red-500 text-white rounded-lg border-0">
      {children}
    </button>
  )
}
