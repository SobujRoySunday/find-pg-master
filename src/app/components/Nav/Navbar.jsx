import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AVATAR from '@/assets/user.png'
import {LogoutButton} from '../'


const Navbar = () => {
  return (
    <nav className="px-5 py-2 flex flex-row justify-between items-center w-full">
          <Link href="/" className="text-2xl text-gray-700 font-bold italic hover:text-gray-800">FindingHome</Link>
          <ul className="flex flex-row gap-3 items-center">
            <li>
              <Link href="/view">
                <Image src={AVATAR} alt="user avatar" height={50} />
              </Link>
            </li>
            <li>
              <Link className="px-3 py-1 bg-yellow-600 text-white rounded-lg" href="/add-room">New</Link>
            </li>
            <li>
              <LogoutButton>Logout</LogoutButton>
            </li>
          </ul>
        </nav>
  )
}

export default Navbar