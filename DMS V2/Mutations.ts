import { API_KEY, API_URL } from "./envVars";



type Data = string | Date | number | object | string[] | number[] | Date[] | object[]



export async function RunScript( fn:string,data:Object){

    let res

    try{
       res =  await fetch("https://script.google.com/macros/s/AKfycby42TDINntVLd0m8b940lcpKd32Z3Vm4JpNCdgfaXfZqZulJsPfkLRSw5ZzOoy9dleB/exec",{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({functionName:fn ,data:data, APIKey: "Lz4d0ESjEcyDVGGmhwzU"}) // body data type must match "Content-Type" header
        })

    }catch(error){
        throw(error)
    }
    
    return res

}
