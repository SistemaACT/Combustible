import React from 'react'
import Register from "../components/auth/Register"
import {useSession} from "next-auth/react"
import Router from "next/router"

type User = {
  name?: string,
  email?:string,
  image?:string,
  role?:string
}

 
export default function Registrar() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      Router.replace("/api/auth/signin")
    },
  }) 

  const user:User = session?.user as User

  return (
    <>
    {user?.role==="Admin" || user?.role ==="Owner" ? <Register></Register>: <></>}    
    </>
  )
}
