import React, {ChangeEvent, ReactNode} from 'react'

type Props={
    id: string
    placeholder: string
    label: string
    type: string
    accept?: string
}

type Select = {
    children: ReactNode
    id: string
    label:string
}

export function Input({id, placeholder, label, type, accept}:Props) {
  return (
    <div className='w-full flex-col flex p-2 text-[1.25em]'>
        <label>{label}</label>
        <input required className='border-2' id={id} name={id} placeholder={placeholder} type={type} accept={accept}></input>
    </div>
  )
}

export function Select({id, children, label}:Select){
    return(
        <div className='w-full flex-col flex p-2 text-[1.25em]'>
            <label>{label}</label>
            <select required className='border-2' id={id} name={id}>{children}</select>
        </div>
    )
}