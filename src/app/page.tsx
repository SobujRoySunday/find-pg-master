import Link from "next/link";
import { Login } from "./components";

export default function Home() {
  return (
    <main className="w-screen min-h-screen flex justify-center items-center">
      <div className="w-3/5 grid grid-cols-1 lg:grid-cols-2 text-white gap-10">
        <div className="flex flex-col gap-4 justify-center">
          <h1 className="text-4xl font-thin leading-normal">Your Gateway to Convenient and Affordable PG Rooms</h1>
          <h3 className="tracking-widest leading-relaxed text-gray-300">Explore a wide range of PG options near you. Sign up to discover affordable and comfortable stays tailored to your needs.</h3>
        </div>
        <div className="flex justify-center gap-5 py-5">
          <Login />
        </div>
      </div>
    </main >
  )
}
