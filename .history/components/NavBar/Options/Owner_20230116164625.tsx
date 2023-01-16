import React from 'react'
import Admin from './Admin'
import Link from "next/link"
import { GiCow } from 'react-icons/gi'

export default function Owner() {
  return (
    <>
        <Admin></Admin>
        <Link href="/Rancho">
            <div className="hover:bg-gray-100 m-2 flex p-2 border-2 rounded-lg justify-center items-center space-x-2">
              <GiCow className="text-[2.5em] text-black"></GiCow>
              <p className="text-[1.5em]">Rancho </p>
            </div>
          </Link>
    </>
  )
}
