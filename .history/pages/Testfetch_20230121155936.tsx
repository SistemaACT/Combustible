import Image from 'next/image'
import React from 'react'

export default function Testfetch() {

    /*React.useEffect(()=>{
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
    } */

  return (
    <div>
      <Image src="https://drive.google.com/uc?export=view&id=1-3Dh6B5Y8XE-OkzR8hT6BqWXP_V129cT" width={400} height={50} alt="Testing"></Image>
      <Image src="https://drive.google.com/uc?export=view&id=1vh7AuMpEAQJylq_Gbq2_z5fEfgpcOPnE" width={400} height={50} alt="Testing"></Image>
      <Image alt="Image" width={200} height={20} src="https://drive.google.com/uc?export=view&id=1cUorMu4O2N-wRLnQfjYtNxo6onZYNft5"></Image>

    </div>
  )
}
