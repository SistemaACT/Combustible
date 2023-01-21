import React from 'react'

export default function Testfetch() {

    React.useEffect(()=>{
        getData()
    })

    async function getData(){
        const res = await fetch ("https://script.google.com/macros/s/AKfycbx4e8QBlg40ceM9_ncBpD0AqsVjDDyKit_oDWK4YqSePw9ec0RsRxMjCq9zNUS8khbtSQ/exec",
        {
            method:"POST",
            body:JSON.stringify({hello:"World"})
        }
        )
        console.log(await res.json())
    } 

  return (
    <div>Testfetch</div>
  )
}
