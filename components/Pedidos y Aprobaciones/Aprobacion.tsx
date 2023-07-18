import React, { useState } from 'react'
import { Input } from '../../components/reciclables/inputs'
import toast from 'react-hot-toast'
import { RunScript } from '../../DMS V2/Mutations'

export default function Aprobacion({pedidos, setData, data}:any) {

    const [cantidad, setCantidad] = useState<number>(0)
    const [disabled, setdisabled] = useState<boolean>(false)
    const [green, setGreen] = useState<string>("bg-green-500 hover:bg-green-700")
    const [red, setRed] = useState<string>("bg-red-500 hover:bg-red-700")
    
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

    async function handleAprobar(Aprobado:boolean){
        let toastId = toast.loading("Cargando")
        let res
        setdisabled(true)
        setGreen("bg-gray-300 hover:bg-gray-500")
        setRed("bg-gray-300 hover:bg-gray-500")
        if(Aprobado){
            res = await RunScript("registrarAprobacion",{Id:pedidos.Id,Status:"Aprobado",Cantidad:cantidad})
        }else{
            res = await RunScript("registrarAprobacion",{Id:pedidos.Id,Status:"No Aprobado",Cantidad:0})    
        }
        if(res.error === false){
            toast.success("Datos enviados correctamente", {
              id:toastId
            })
            }else{
              toast.error("Algo salio mal consultar al administrador",{
                id:toastId
              })
            }
        
        QuitarDeLista()

        
    }

    function QuitarDeLista(){
        let index = data.indexOf(pedidos)
        data.splice(index,1)
        setData(data)
    }

  return (
    <div className='border rounded p-2 m-2 flex justify-evenly flex-wrap'>

                    <div className='w-full md:w-4/12  p-2 '>
                        <div className='border-2 border-black flex justify-between bg-black text-white text-xl'>Folio: <div className='bg-white text-black w-1/2 px-2'>{pedidos.Folio}</div></div>
                        <div className='border-2 border-black flex justify-between bg-black text-white text-xl'>Fecha: <div className='bg-white text-black w-1/2 px-2'>{pedidos["Fecha de Requisicion"]}</div></div>
                        <div className='border-2 border-black flex justify-between bg-black text-white text-xl'>Solicita: <div className='bg-white text-black w-1/2 px-2'>{pedidos.Solicitante}</div></div>
                        <div className='border-2 border-black flex justify-between bg-black text-white text-xl'>Solicita: <div className='bg-white text-black w-1/2 px-2'>{pedidos["Usar en"]}</div></div>
                        
                    </div>
                    <div className='w-full md:w-7/12  p-2'>
                    <div className='border-2 border-black flex justify-between bg-black text-white text-2xl'>Status: <div className={`${handleColor(pedidos.Status)} text-black w-1/2 px-2`}>{pedidos.Status}</div></div>
                        <table className='p-2 border-2 w-full border-black'>
                            <thead>
                            <tr className='border border-black'>
                                <th className='border border-black'>Material</th>
                                <th className='border border-black'>Unidad</th>
                                <th className='border border-black'>Cantidad</th>
                                <th className='border border-black'>Comentario</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className='border border-black'>{pedidos.Material}</td>
                                <td className='border border-black'>{pedidos.Unidad}</td>
                                <td className='border border-black'>{pedidos.Cantidad}</td>
                                <td className='border border-black'>{pedidos.Comentarios}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div className='w-full flex flex-col'>
                            <Input id="Cantidad" placeholder='Cantidad Aprobada' type='number' label='Cantidad Aprobada' onChange={(e)=>{setCantidad(Number(e.target.value))}}></Input>
                        <div className='w-full flex justify-between'>
                        <button className= {'p-2 m-2 text-2xl rounded text-white w-5/12 '+green } onClick={()=>handleAprobar(true)} disabled={disabled}>Aprobar</button>
                        <button className={'p-2 m-2 text-2xl rounded text-white w-5/12 '+ red} disabled={disabled} onClick={()=>handleAprobar(false)}>Rechazar</button>
                        </div>
                        </div>
                    </div>

                </div>
  )
}
