import React from 'react'
import {useSession} from "next-auth/react"
import Link from "next/link"
import {GiGasPump, GiCow} from "react-icons/gi"
import { HiHome} from "react-icons/hi2"
import {useRouter} from "next/router"
import {GoSignOut} from "react-icons/go"
import {IoIosPeople} from "react-icons/io"
import Admin from './Options/Admin'
import Operador from './Options/Operador'
import Owner from './Options/Owner'

type User = {
    name?: string,
    email?:string,
    image?:string,
    role?:string
  }

export default function Options() {
    const { data: session } = useSession({
        required: true,
      }) 
    
      const user:User = session?.user as User

    const Router = useRouter();

    if(user?.role === "Rancho"){
      console.log("here")
      return (        <Link href="/api/auth/signout">
      <div className="flex hover:bg-gray-100 m-2 p-2 border-2 rounded-lg justify-center items-center space-x-2">
        <GoSignOut className="text-[2em] text-red-500"></GoSignOut>
        <p className="text-[1.5em]">Cerrar Session</p>
      </div>
    </Link>)
    }
    
  return (
    <>
        {Router?.pathname !== "/" &&
              <Link href="/">
              <div className="flex hover:bg-gray-100 m-2 p-2 border-2 rounded-lg justify-center items-center space-x-2">
                <HiHome className="text-[2em] text-green-700"></HiHome>
                <p className="text-[1.5em]">Inicio</p>
              </div>
            </Link>
        }
        {user?.role === "User" && <Operador></Operador>}
        {user?.role === "Admin" && <Admin></Admin>}
        {user?.role === "Owner" && <Owner></Owner>}
        <Link href="/api/auth/signout">
              <div className="flex hover:bg-gray-100 m-2 p-2 border-2 rounded-lg justify-center items-center space-x-2">
                <GoSignOut className="text-[2em] text-red-500"></GoSignOut>
                <p className="text-[1.5em]">Cerrar Session</p>
              </div>
            </Link>

      </>
  )
}
