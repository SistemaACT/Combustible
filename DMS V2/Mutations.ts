import { API_KEY, API_URL } from "./envVars";



type Data = string | Date | number | object | string[] | number[] | Date[] | object[]



export async function RunScript( fn:string,data:Object){

    let res

    try{
       res =  await fetch("https://script.google.com/macros/s/AKfycbxiphQpAuYPXrcLv-PJIZKUYrUyjWrHJ_JVxMPgTOgynz5LFcF6wgF0S5aMbVZQ96lydQ/exec",{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({functionName:fn ,data:data, APIKey: "aVyf96paVJWiXs3Nyg6V"}) // body data type must match "Content-Type" header
        })

    }catch(error){
        throw(error)
    }
    
    return await res.json()

}
