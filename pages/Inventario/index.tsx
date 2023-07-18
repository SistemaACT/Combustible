import React from 'react'
import Link from "next/link"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {MdOutlineInventory} from "react-icons/md"
import {CiDeliveryTruck} from "react-icons/ci"

export default function Index() {
  return (
    <div>
        <Link href="/Inventario/AgregarProducto">
            <div className="hover:bg-gray-100 m-2 flex p-2 border-2 rounded-lg justify-center items-center space-x-2">
              <MdOutlineInventory className="text-[2em] text-green-700"></MdOutlineInventory>
              <p className="text-[1.5em]">Agregar Productos</p>
            </div>
        </Link>
        <Link href="/Inventario/Pedidos">
            <div className="hover:bg-gray-100 m-2 flex p-2 border-2 rounded-lg justify-center items-center space-x-2">
              <CiDeliveryTruck className="text-[2em] text-green-700"></CiDeliveryTruck>
              <p className="text-[1.5em]">Pedidos</p>
            </div>
        </Link>

        <Link href="/Inventario/Aprobaciones">
            <div className="hover:bg-gray-100 m-2 flex p-2 border-2 rounded-lg justify-center items-center space-x-2">
              <AiOutlineShoppingCart className="text-[2em] text-green-700"></AiOutlineShoppingCart>
              <p className="text-[1.5em]">Aprobaciones</p>
            </div>
        </Link>



    </div>
  )
}
