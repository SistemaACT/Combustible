import React from 'react'
import Link from "next/link"
import Operador from './Operador'
import { IoIosPeople } from 'react-icons/io'
import { HiUserPlus } from 'react-icons/hi2'

export default function Admin() {
  return (
    <>
        <Operador></Operador>
        <Link href="https://sistemaact.github.io/SistemaACTropico/">
            <div className="hover:bg-gray-100 m-2 flex p-2 border-2 rounded-lg justify-center items-center space-x-2">
              <IoIosPeople className="text-[2em] text-green-700"></IoIosPeople>
              <p className="text-[1.5em]">Asistencia </p>
            </div>
        </Link>
        <Link href="/Registrar">
        <div className="hover:bg-gray-100 m-2 flex p-2 border-2 rounded-lg justify-center items-center space-x-2">
            <HiUserPlus className="text-[2em] text-green-700"></HiUserPlus>
            <p className="text-[1.5em]">Registrar Usuarios</p>
        </div>
        </Link>
    </>
  )
}
