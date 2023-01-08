import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from "next-auth/react"
import Navbar from '../components/NavBar/Navbar'


export default function App({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return (

  <SessionProvider session={session}>
    <Navbar></Navbar>
    <Toaster></Toaster>
    <Component {...pageProps} />
  </SessionProvider>
  )
}
