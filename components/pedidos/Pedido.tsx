import React, { useState } from 'react'


type Producto = {
    "Id": string
    "Fecha de Requisicion": Date
    "Folio": string
    "Solicitante": string
    "Usar en": string
    "Status": string
    "id del producto": string
    "Material": string,
    "Unidad": string,
    "Cantidad": number,
    "Comentarios": string,
    "Tiempo de Espera": string
}

export default function Pedido({Areas, producto}:{Areas:[string],producto:Producto}) {

    const [area, setarea] = useState<string>("Chemours")

    function handleColor(status: string){
        if(status === "Aprobado" || status==="Aprobado Parcialmente"){
            return "bg-blue-300"
        }else if(status ==="Pendiente"){
            return "bg-yellow-300"
        }else if(status==="Entregado"){
            return "bg-green-300"
        }else if(status ==="Cancelado" || status === "No Aprobado"){
            return "bg-red-300"
        }else if (status ==="Enviado" || status === "Comprado"){
            return "bg-orange-300"
        }else{
            return "bg-purple-300"
        }
    }
    
    function handleEntergar(idRequisicion:string,idProducto:string,cantidad:number,area:string){

    }

    console.log(area)
  return (
    <div className='w-full rounded border flex justify-around p-2 text-center m-2 space-x-3 flex-wrap'>
                    <div className='w-1/2'>
                    <p>Requisicion Folio: {producto.Folio}</p>
                    <p>Solicita: {producto.Solicitante}</p>
                    <p>Para usar en: {producto['Usar en']}</p>
                    </div>
                    <div className='w-1/2'>
                    <p>Articulo o material: {producto.Material}</p>
                    <p>Cantidad: {producto.Cantidad}</p>
                    <p>Comentario: {producto.Comentarios}</p>
                    <p>Status: <p className={`${handleColor(producto.Status)} rounded p-2 m-2`}>{producto.Status}</p></p>
                    </div>
                    <div className='w-1/2 flex-col flex'>
                        <select className='border-2 rounded p-2 m-2 text-center' required onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setarea(e.target.value)}>
                            {Areas.map((lugar)=>{
                                return(<option key={lugar[0]} value={lugar[0]}>{lugar[0]}</option>)
                            })}
                        </select>
                        <button className='bg-green-500 rounded p-2 m-2 text-2xl text-white' onClick={()=>handleEntergar(producto.Id,producto['id del producto'],producto.Cantidad,area)}>Marcar como Entregado</button>
                    </div>
                </div>
  )
}
