import React, {FormEvent} from 'react'
import { Input } from '../../components/reciclables/inputs'
import { ProcessImage } from '../../Utils/transform';
import toast from "react-hot-toast"
import {useSession} from "next-auth/react"
import Router from "next/router"
import { UseInsert } from '../../DMS/Mutations';

export default function Vacunas() {

    const {data:session} = useSession({
        required: true,
        onUnauthenticated() {
          // The user is not authenticated, handle it here.
          Router.replace("/api/auth/signin")
        },
      })
    

      async function handleSubmit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const toastId = toast.loading('Cargando...');
        const formData = new FormData(event.currentTarget);
        const values = Object.fromEntries(formData);
        const file = await ProcessImage(values.file as File)
        delete values.file
        const res = await UseInsert("Ganado", "Vacunas", Object.values(values),file)
       
        console.log(res)
       
        toast.success("Datos enviados correctamente", {
          id:toastId
        })
      }
      
      return (
      <form onSubmit={handleSubmit} className='flex justify-center'>
          <div className='w-full lg:w-1/4 rounded border-2 flex flex-col items-center'>
              <h1 className='text-[2em]'>Control de Vacunacion</h1> 
                  <Input id="Numero de Vaca" placeholder='¿Cual es el numero de la vaca?' label='Numbero de Vaca' type='number' min={0} max={1000}></Input>
                  <Input id="file" placeholder='Ingrese la imagen' accept=".jpg, .png" label='Imagen de Evidencia' type='file'></Input>
  
                  <button className=' rounded bg-green-500 hover:bg-green-600 text-white w-full text-[1.25em] rounder p-2 my-2' type='submit'>Enviar</button>
          </div>
          
      </form>
    )
}
