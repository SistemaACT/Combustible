import {useSession} from "next-auth/react"
import Router from "next/router"
import Options from "../components/NavBar/Options"





export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      Router.replace("/api/auth/signin")
    },
  }) 




  return (
    
      <Options></Options>

  )
}
