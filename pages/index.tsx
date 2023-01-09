import {useSession} from "next-auth/react"
import Router from "next/router"
import Options from "../components/NavBar/Options"
import { ClockLoader } from 'react-spinners'




export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      Router.replace("/api/auth/signin")
    },
  }) 




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
