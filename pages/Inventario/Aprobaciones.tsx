import React, { useEffect, useState } from 'react'
import { RunScript } from '../../DMS V2/Mutations'
import { ClockLoader } from 'react-spinners'

import Aprobacion from '../../components/Pedidos y Aprobaciones/Aprobacion'

export default function Aprobaciones() {
    const [data, setData] = useState<any>(undefined)
    const [counter, setcounter] = useState<any>(0)
    useEffect(()=>{
        RunScript("getAprobaciones",[]).then((e)=>{setData(e)})
    },[])

    function handleChangeData(newData:any){
        console.log("here")
        setData(newData)
        setcounter(counter+1)

    }

  return (
    <div>
        {!data && <div className='flex justify-center items-center align-middle h-[100vh]'>
          <ClockLoader color='#3482F6' loading={true} size={250}></ClockLoader>
        </div>}
        {data !== undefined &&
         <div>

            {data.map((pedidos:any)=>{return (
                <Aprobacion key={pedidos.Id} pedidos={pedidos} setData={handleChangeData} data={data}></Aprobacion>
        )})}
        </div>}
    </div>
  )
}
