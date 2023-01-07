import {useSession} from "next-auth/react"
import Link from "next/link"
import {GiGasPump} from "react-icons/gi"
import {HiDocumentMagnifyingGlass} from "react-icons/hi2"
import Router from "next/router"


export default function Home() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      Router.replace("/api/auth/signin")
    },
  }) 

  console.log(session)


  return (
    
      <>
      <Link href="/Form">
          <div className="flex hover:bg-gray-100 m-2 p-2 border-2 rounded-lg justify-center items-center space-x-2">
            <GiGasPump className="text-[2em] text-green-700"></GiGasPump>
            <p className="text-[1.5em]">Nueva Carga</p>
          </div>
        </Link>
        <Link href="/History">
          <div className="hover:bg-gray-100 m-2 flex p-2 border-2 rounded-lg justify-center items-center space-x-2">
            <HiDocumentMagnifyingGlass className="text-[2em] text-green-700"></HiDocumentMagnifyingGlass>
            <p className="text-[1.5em]">Mi Historial</p>
          </div>
        </Link>
      </>

  )
}
