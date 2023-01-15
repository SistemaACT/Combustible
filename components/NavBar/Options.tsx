import React from 'react'
import {useSession} from "next-auth/react"
import Link from "next/link"
import {GiGasPump, GiCow} from "react-icons/gi"
import {HiDocumentMagnifyingGlass, HiUserPlus, HiHome} from "react-icons/hi2"
import {useRouter} from "next/router"
import {GoSignOut} from "react-icons/go"
import {IoIosPeople} from "react-icons/io"

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
          <Link href="https://sistemaact.github.io/SistemaACTropico/">
            <div className="hover:bg-gray-100 m-2 flex p-2 border-2 rounded-lg justify-center items-center space-x-2">
              <IoIosPeople className="text-[2em] text-green-700"></IoIosPeople>
              <p className="text-[1.5em]">Asistencia </p>
            </div>
          </Link>
        }
        {(user?.email === "jesusgg.b1@gmail.com" || user?.email === "jgobra@prodigy.net.mx") && 
          <Link href="/Rancho">
            <div className="hover:bg-gray-100 m-2 flex p-2 border-2 rounded-lg justify-center items-center space-x-2">
              <GiCow className="text-[2.5em] text-black"></GiCow>
              <p className="text-[1.5em]">Rancho </p>
            </div>
          </Link>
        }
        
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
