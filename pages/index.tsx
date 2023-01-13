import {useSession} from "next-auth/react"
import Router from "next/router"
import Options from "../components/NavBar/Options"
import { ClockLoader } from 'react-spinners'
import React from "react"


type User = {
  name?: string,
  email?:string,
  image?:string,
  role?:string
}

export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      Router.replace("/api/auth/signin")
    },
  }) 

  React.useEffect(() => {
    const user = session?.user as User 
    if(session && user?.role === "Rancho"){
      Router.replace("/Rancho/Vacunas")
    }
  
  }, [session])
  



  return (
    <>
    {session ? 
      <Options></Options>
    :
      <div className='flex justify-center items-center align-middle h-[100vh]'>
        <ClockLoader color='#3482F6' loading={true} size={250}></ClockLoader>
      </div>
    }
    </>

  )
}
