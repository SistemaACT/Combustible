import React from 'react'
import Link from "next/link"
import {GiGasPump} from "react-icons/gi"
import {HiDocumentMagnifyingGlass} from "react-icons/hi2"

export default function Operador() {
  return (
    <>
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
    </>
  )
}
