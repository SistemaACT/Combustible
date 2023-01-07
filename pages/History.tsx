import React, {useEffect, useState} from 'react'
import { Query } from '../DMS/Query'
import {useSession} from "next-auth/react"
import Router from "next/router"
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
      if(user.role == "Admin"){
        Query(`Select * `,"Control del Combustible", "Control").then(data=>{setCargas(data)})
      }
      else if(session?.user){
      Query(`Select * Where H='${user.email!}'`,"Control del Combustible", "Control").then(data=>{setCargas(data)})
      }
    }, [session])


    
  return (
    <div className='flex flex-col'>
        {!Cargas && <>Tu historial se esta cargando favor de esperar</>}
        {Cargas?.map((Carga:Carga)=>{
          return (
            <div key={Carga.Folio} className='border-2 m-2 p-2 rounded-lg flex justify-between'>
              <div>
                <h1>Datos del Registro</h1>
                <div>
                Folio:
                {Carga.Folio}
                </div>
                <div>
                  Operador: {Carga.Operador}
                </div>
                <div>
                  Fecha: {`${Carga.UltimoCambio}`}
                </div>
                <div>
                  Vehiculo: {Carga.Vehiculo}
                </div>
              </div>
              <div>
                <h1>Datos de carga</h1>
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
              <Image src={Carga.Evidencia} width={200} height={20} alt="foto de evidencia"/>
              
            </div>
          )
        })}
    </div>
  )
}
