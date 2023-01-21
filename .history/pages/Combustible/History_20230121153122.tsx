import React, {useEffect, useState} from 'react'
import { Query } from '../../DMS/Query'
import {useSession} from "next-auth/react"
import Router from "next/router"
import Link from 'next/dist/client/link'
import ZoomableImages from '../../components/reciclables/zoomableImages'
import { ClockLoader } from 'react-spinners'
import Image from 'next/image'

type Carga ={
    Folio: number
    Monto:number
    Litros: number
    Operador: string
    Vehiculo: string
    Dias: string
    Horometro: number
    Evidencia: string
    Usuario: string
    UltimoCambio?: Date
    DiasTrabajados?:number
}

type User = {
  name?: string,
  email?:string,
  image?:string,
  role?:string
}

export default function History() {
    
    const [Cargas, setCargas] = useState<any>(undefined)

    const { data: session, status } = useSession({
      required: true,
      onUnauthenticated() {
        // The user is not authenticated, handle it here.
        Router.push("/auth/signin")
      },
    }) 
    useEffect(() => {
      let user: User = session?.user as User
      if(user?.role == "Admin" || user?.role == "Owner"){
        Query(`Select * `,"Control del Combustible", "Control").then(data=>{console.log(data);setCargas(data)})
      }
      else if(session?.user){
      Query(`Select * Where H='${user.email!}'`,"Control del Combustible", "Control").then(data=>{setCargas(data)})
      }
    }, [session])
    React.useEffect(()=>{
      getData()
  })

  async function getData(){
      const res = await fetch ("https://script.google.com/macros/s/AKfycbx4e8QBlg40ceM9_ncBpD0AqsVjDDyKit_oDWK4YqSePw9ec0RsRxMjCq9zNUS8khbtSQ/exec",
      {
          method:"POST",
          body:JSON.stringify({hello:"World"})
      }
      )
      console.log(await res.json())
  } 

    
  return (
    <div className='flex flex-col '>
      <Image alt="Image" width={200} height={20} src="https://drive.google.com/uc?export=view&id=1yCyrYMhPl_DtiKDTA022HwDsGh96DbzP"></Image>
        {!Cargas && <div className='flex justify-center items-center align-middle h-[100vh]'>
          <ClockLoader color='#3482F6' loading={true} size={250}></ClockLoader>
          </div>}
        {Cargas?.map((Carga:Carga)=>{
          let date:Date|undefined
          if(Carga.UltimoCambio !== undefined){
             date = new Date(Carga.UltimoCambio)
          }else{
            date = undefined
          }
          return (
            <div key={Carga.Folio} className='border-2 m-2 p-2 rounded-lg flex justify-between flex-wrap '>
              <div className='w-full md:w-1/2 p-1 border-2'>
                <h1 className='text-[2rem] text-center rounded-lg'>Datos del Registro</h1>
                <div>
                Folio:
                {Carga.Folio}
                </div>
                <div>
                  Operador: {Carga.Operador}
                </div>
                <div>
                  Fecha: {date !== undefined ? `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`:"Sin Fecha"}
                </div>
                <div>
                  Vehiculo: {Carga.Vehiculo}
                </div>
                          <div className='p-1 border-2 rounded-lg'>
                            <h1 className='text-[2rem] text-center'>Datos de carga</h1>
                            <div>
                              Monto: ${Carga.Monto}
                            </div>
                            <div>
                              Litros: {Carga.Litros}Lts
                            </div>
                            <div>
                              Horometro o Equivalente: {Carga.Horometro}
                            </div>
                          </div>

                          {!Carga.DiasTrabajados ? 
                            <Link href={`/Combustible/Evidencia/${Carga.Folio}`}>
                            <button className='bg-green-500 p-2 text-white rounded-md mt-2 w-full'>Entregar Evidencia</button>
                            </Link>
                          : 
                            <></>
                          }
              </div >
              <div className='md:w-1/2 flex justify-center w-full'>
               <ZoomableImages src={Carga.Evidencia} width={400} height={30} alt="Imagen de evidencia" ></ZoomableImages>
              </div>
            </div>
          )
        })}
    </div>
  )
}
