import React from 'react'

export default function Testfetch() {

    React.useEffect(()=>{
        getData()
    })

    async function getData(){
        const res = await fetch (process.env.DMS_URL!,
        {
            method:"POST",
            body:JSON.stringify({command:"costumFunction", functionName:"FetchCombustible", })
        }
        )
        console.log(await res.json())
    } 

  return (
    <div>Testfetch</div>
  )
}
