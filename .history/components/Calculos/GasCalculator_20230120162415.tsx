import React from 'react'
import { FormEvent } from 'react';
import { Input } from '../reciclables/inputs';



export default function GasCalculator() {
    const [calculadora, setCalculadora] = React.useState(false)
    const [text, setTexto] = React.useState("Calcular Monto en Base a Litros")
    const [answer, setAnswer] = React.useState<undefined|number>(undefined)
    const [color, setColor] = React.useState("bg-green-500")

    async function handleSubmit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let values = Object.fromEntries(formData);

        setAnswer(parseFloat(values.MontoPorLitro as string) *parseFloat(values.Litros as string))
      }

  return (
      <div className='flex justify-center m-2'>
        <form className='w-full lg:w-1/3 p-2 border-2 rounded-lg center' onSubmit={handleSubmit}>
            <button type='button' onClick={()=>{if(!calculadora){setTexto("Cerrar");setColor("bg-red-500")}else{setTexto("Calcular Monto en Base a Litros");setAnswer(undefined);setColor("bg-green-500")};setCalculadora(!calculadora);}} className={`${color}  p-2 text-white rounded-lg w-full`}>{text}</button>
            {calculadora && 
            <div className=''>
                <Input id="MontoPorLitro" label="Precio del Litro" placeholder='Ingrese el precio por litro' type="number" step={0.01} min={0}></Input>
                <Input id="Litros" label="Cantidad de Litros" placeholder='Ingrese la cantidad de litros' type="number" step={0.01} min={0}></Input>
                 <button type='submit' className='bg-green-500 p-2 text-white rounded-lg w-full'>Calcular</button>
            </div>
            }
            {answer && <div className='w-full text-[1.25em] text-center m-2'>Tu Monto total es de ${answer}</div>}
        </form>
    </div>
    )
}
