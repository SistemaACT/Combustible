import React , {FormEvent} from 'react'
import { Input, Select } from '../components/inputs'
import { UseInsert } from '../DMS/Mutations';
import { ProcessImage } from '../Utils/transform';
import toast from "react-hot-toast"
import {useSession} from "next-auth/react"
import Router from "next/router"

export default function Form() {

  const {data:session} = useSession({
    required: false,
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
      values.user = session!.user!.email as string
      const file = await ProcessImage(values.file as File)
      delete values.file
      const res = await UseInsert("Control del Combustible", "Control", Object.values(values),file)
      toast.success("Datos enviados correctamente", {
        id:toastId
      })
    }

  return (
    <form onSubmit={handleSubmit} className='flex justify-center'>
        <div className='w-full lg:w-1/4 rounded border-2 flex flex-col items-center'>
            <h1 className='text-[2em]'>Control de Combustible</h1> 
                <Input id="Pesos" placeholder='¿Cuantos pesos se cargaron?' label='Cantidad Monetaria de Carga' type='number'></Input>
                <Input id="Litros" placeholder='¿Cuantos litros se cargaron?' label='Cantidad en Litros' type='number'></Input>
                <Input id="Operador" placeholder='¿Ingrese el nombre del operador?' label='Operador' type='text'></Input>
                <Select id="Maquina" label="Maquina"> 
                    <option value=""></option>
                    <option value="John Deere 310k">John Deere 310k</option>
                    <option value="Case 580N">Case 580N</option>
                    <option value="Case 770">Case 770</option>
                    <option value="Titan">Titan</option>
                    <option value="Grua">Grua</option>
                    <option value="Motoconformadora">Motoconformadora</option>
                    <option value="Hilux">Hilux</option>
                    <option value="Pipa">Pipa</option>
                    <option value="Vibro Compactador">Vibro Compactador</option>
                    <option value="Ford 350">Ford 350</option>
                    <option value="Maquina de Soldar">Maquina de Soldar</option>
                    <option value="Compresor">Compresor</option>
                </Select>
                <Input id="Días" placeholder='¿Cuantos días se va a usar?' label='Dias de trabajo aproximado' type='number'></Input>
                <Input id="horometro" placeholder='Ingrese el valor del horometro' label='Horometro' type='number'></Input>
                <Input id="file" placeholder='Ingrese la imagen' accept=".jpg, .png" label='Imagen de carga' type='file'></Input>

                <button className=' rounded bg-blue-500 text-white w-full text-[1.25em] rounder p-2 my-2' type='submit'>Enviar</button>
        </div>
        
    </form>
  )
}
