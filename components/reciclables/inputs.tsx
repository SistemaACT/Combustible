import React, {ChangeEvent, ReactNode} from 'react'

type Props={
    id: string
    placeholder: string
    label: string
    type: string
    accept?: string
    step?:number
    min?:number
    max?:number
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void
}

type Select = {
    children: ReactNode
    id: string
    label:string
    onChange?: (e:React.ChangeEvent<HTMLSelectElement>)=>void
}

export function Input({id, placeholder, label, type, accept, step, min, max}:Props) {
  return (
    <div className='w-full flex-col flex p-2 text-[1.25em]'>
        <label>{label}</label>
        <input required className='border-2' id={id} name={id} placeholder={placeholder} type={type} accept={accept} step={step} min={min} max={max}></input>
    </div>
  )
}

export function Select({id, children, label, onChange}:Select){
    return(
        <div className='w-full flex-col flex p-2 text-[1.25em]'>
            <label>{label}</label>
            <select required className='border-2' id={id} name={id} onChange={onChange}>{children}</select>
        </div>
    )
}