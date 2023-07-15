import React, {useState, useEffect} from 'react'
import { RunScript } from '../../DMS V2/Mutations'
import { type } from 'os'
import { ClockLoader } from 'react-spinners'
import { stat } from 'fs'
import Pedido from '../../components/pedidos/Pedido'


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


export default function Pedidos() {
    const [data, setData] = useState<undefined | [Producto]>(undefined)
    const [areas,setAreas] = useState<any>(undefined)
    useEffect(()=>{
        RunScript("getPedidos",[]).then((e)=>{setData(e.pedidos as [Producto]); setAreas(e.areas)})
      },[])



  return (
    <div>
        {!data && <div className='flex justify-center items-center align-middle h-[100vh]'>
          <ClockLoader color='#3482F6' loading={true} size={250}></ClockLoader>
          </div>}
        {data &&
         <div className='w-full'>
            {data.map((producto)=>{
                return(
                <Pedido key={producto.Id} Areas={areas} producto={producto}></Pedido>
                )
            })}
         </div>
        }
        
    </div>
  )
}

