import React, { useEffect, useState, FormEvent} from 'react'
import { RunScript } from '../../DMS V2/Mutations'
import toast from "react-hot-toast"
import { Input, Select } from '../../components/reciclables/inputs'
import { ClockLoader } from 'react-spinners'

type Productos ={
  Id:string,
  Producto:string,
  Unidad:string,
  Categoria:string,
  Tienda:string,
  "En Almacen":number,
  "En Operacion": number,
  Total:number
}

export default function index() {

  const [data, setData] = useState<any>(undefined)
  const [other, setOther]= useState<boolean>(false)
  useEffect(()=>{
    RunScript("getProducts",[]).then((e)=>setData(e))
    console.log(data)
  },[])

  async function handleSubmit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const toastId = toast.loading('Cargando...');
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData);
   
    const res = await RunScript("agregarAInventario",values)
    console.log(res)
    toast.success("Datos enviados correctamente", {
      id:toastId
    })
  }
  return (
    <div>
      {data !== undefined && 
        <form onSubmit={handleSubmit} className='p-2 border rounded'>
          <Select id="Material" label='Material' 
          onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{if(e.target.value ==="zz0Czjexhw"){setOther(true)}else{setOther(false)}}}>
            {data.map((articulo:Productos)=>{return(<option key={articulo.Producto} value={articulo.Id}>{articulo.Producto}</option>)})}
          </Select>
          {other === true && <div>
            <Input id="Otro" label='Nombre de Producto Nuevo' placeholder='Ingresa el nombre del nuevo producto' type="text"></Input>
            <Input id="Unidad" label='Tipo de Unidad' placeholder='Ingresa el tipo de unidad' type="text"></Input>
            </div>}
          <Input id="Cantidad" type='number' placeholder='Ingresa la cantidad de articulos encontrados' label='Cantidad'></Input>
          <button type='submit' className='bg-green-500 text-2xl text-white p-2 w-full rounded'>Enviar</button>
        </form>
      }
      {data === undefined && <div className='flex justify-center items-center align-middle h-[100vh]'>
          <ClockLoader color='#3482F6' loading={true} size={250}></ClockLoader>
          </div>}
    </div>
  )
}
