import React from 'react'
import Link from "next/link"
import {GiSyringe} from "react-icons/gi"
import {FaHatCowboySide} from "react-icons/fa"
import {IoMdPhotos} from "react-icons/io"

export default function index() {
  return (
    <div>
        <Link href="https://ranchosanlorenzo.web.app/">
            <div className="hover:bg-gray-100 m-2 flex p-2 border-2 rounded-lg justify-center items-center space-x-2">
              <FaHatCowboySide className="text-[2em] text-green-700"></FaHatCowboySide>
              <p className="text-[1.5em]">Comandos anteriores</p>
            </div>
        </Link>
        <Link href="/Rancho/Vacunas">
            <div className="hover:bg-gray-100 m-2 flex p-2 border-2 rounded-lg justify-center items-center space-x-2">
              <GiSyringe className="text-[2em] text-green-700"></GiSyringe>
              <p className="text-[1.5em]">Vacunas</p>
            </div>
        </Link>
        <Link href="/Rancho/Evidencia">
            <div className="hover:bg-gray-100 m-2 flex p-2 border-2 rounded-lg justify-center items-center space-x-2">
              <IoMdPhotos className="text-[2em] text-green-700"></IoMdPhotos>
              <p className="text-[1.5em]">Evidencia de Vacunas</p>
            </div>
        </Link>


    </div>
  )
}
