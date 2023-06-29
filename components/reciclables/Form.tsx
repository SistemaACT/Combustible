import React, {FormEvent, ReactNode, useState} from 'react'
import toast from "react-hot-toast"

type Props = {
    onSubmit:(e:object)=> Promise<object> ,
    children: ReactNode
    image:boolean
}

export function Form({onSubmit,children,image}:Props) {


    async function handleImage(e: FormEvent<HTMLFormElement>){

        console.log("there")
        const toastId = toast.loading('Cargando...');
        const formData = new FormData(e.currentTarget);
        const values = Object.fromEntries(formData);

        console.log(onSubmit(values))
        
        toast.success("Datos enviados correctamente", {
            id:toastId
          })

    }

    function handleObject(e: FormEvent<HTMLFormElement>){

    }


  return (
    <form onSubmit={(e) => { e.preventDefault(); image ? handleImage(e) : handleObject(e)}}>
        {children}
        <button type='submit' className='bg-green-500 p-2 text-white hover:bg-green-700 '>Enviar</button>
    </form>
  )
}

