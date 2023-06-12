import React, { useEffect } from 'react'
import { RunScript } from '../../DMS V2/Mutations'

export default function index() {

  async function handleClick(){
    let res = await RunScript("getInventory",[])
    console.log("try 1",res)
    console.log(await res.json())
  }

  return (
    <div onClick={handleClick}>index</div>
  )
}
