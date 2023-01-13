import React, {useEffect, useState} from 'react'
import { Query } from '../../DMS/Query'
import {useSession} from "next-auth/react"
import Router from "next/router"
import Link from 'next/dist/client/link'
import ZoomableImages from '../../components/reciclables/zoomableImages'
import { ClockLoader } from 'react-spinners'

type User = {
    name?: string,
    email?:string,
    image?:string,
    role?:string
  }

type Vacuna = {
    id:number,
    NumeroDeVaca:number,
    Evidencia:string,
    Fecha?:Date
}

export default function Evidencia() {
    const [Vacunas, setVacunas] = useState<any>(undefined)

    const { data: session, status } = useSession({
      required: true,
      onUnauthenticated() {
        // The user is not authenticated, handle it here.
        Router.push("/auth/signin")
      },
    }) 
    useEffect(() => {
      let user: User = session?.user as User
      if(user?.role == "Admin"){
        Query(`Select * `,"Ganado", "Vacunas").then(data=>{setVacunas(data)})
      }

    }, [session])

    console.log(Vacunas)

    
  return (
    <div className='flex flex-col '>
        {!Vacunas && <div className='flex justify-center items-center align-middle h-[100vh]'>
          <ClockLoader color='#3482F6' loading={true} size={250}></ClockLoader>
          </div>}
        {Vacunas?.map((Vacuna:Vacuna)=>{
          let date:Date|undefined
          if(Vacuna.Fecha !== undefined){
             date = new Date(Vacuna.Fecha)
          }else{
            date = undefined
          }
          return (
            <div key={Vacuna.id} className='border-2 m-2 p-2 rounded-lg flex justify-between flex-wrap '>
              <div className='w-full md:w-1/2 p-1 border-2'>
                <h1 className='text-[2rem] text-center rounded-lg'>Datos del Registro</h1>
                <div>
                Folio:
                {Vacuna.id}
                </div>
                <div>
                  Numero de Vada: {Vacuna.NumeroDeVaca}
                </div>
                <div>
                  Fecha: {date !== undefined ? `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`:"Sin Fecha"}
                </div>
                         

              </div>
              <div className='md:w-1/2 flex justify-center w-full'>
               <ZoomableImages src={Vacuna.Evidencia} width={400} height={30} alt="Imagen de evidencia" ></ZoomableImages>
              </div>
            </div>
          )
        })}
    </div>
  )
}
