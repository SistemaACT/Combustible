import React from 'react'
import {useSession} from "next-auth/react"
import Link from "next/link"
import {GiGasPump} from "react-icons/gi"
import {HiDocumentMagnifyingGlass, HiUserPlus, HiHome} from "react-icons/hi2"
import {useRouter} from "next/router"
import {GoSignOut} from "react-icons/go"

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
      <Link href="/Combustible/Form">
          <div className="flex hover:bg-gray-100 m-2 p-2 border-2 rounded-lg justify-center items-center space-x-2">
            <GiGasPump className="text-[2em] text-green-700"></GiGasPump>
            <p className="text-[1.5em]">Nueva Carga</p>
          </div>
        </Link>
        <Link href="/Combustible/History">
          <div className="hover:bg-gray-100 m-2 flex p-2 border-2 rounded-lg justify-center items-center space-x-2">
            <HiDocumentMagnifyingGlass className="text-[2em] text-green-700"></HiDocumentMagnifyingGlass>
            <p className="text-[1.5em]">Mi Historial</p>
          </div>
        </Link>
        {user?.role === "Admin" && 
          <Link href="/Registrar">
            <div className="hover:bg-gray-100 m-2 flex p-2 border-2 rounded-lg justify-center items-center space-x-2">
              <HiUserPlus className="text-[2em] text-green-700"></HiUserPlus>
              <p className="text-[1.5em]">Registrar Usuarios</p>
            </div>
          </Link>
        }
        <Link href="/api/auth/signout">
              <div className="flex hover:bg-gray-100 m-2 p-2 border-2 rounded-lg justify-center items-center space-x-2">
                <GoSignOut className="text-[2em] text-red-500"></GoSignOut>
                <p className="text-[1.5em]">Cerrar Session</p>
              </div>
            </Link>

      </>
  )
}
