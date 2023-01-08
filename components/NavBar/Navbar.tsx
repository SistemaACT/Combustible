import React from 'react'
import Options from './Options'
import {BsMenuButtonWideFill} from "react-icons/bs"
import {useSession} from "next-auth/react"

export default function Navbar() {
    const [open, setOpen] = React.useState(false)
    const {data:session} = useSession()
    return (
    <div>
        {session && <>
            <div className='bg-blue-500'>
                <BsMenuButtonWideFill onClick={()=>setOpen(!open)} className="text-[2em] text-white p-2 w-20 h-14 mb-2"></BsMenuButtonWideFill>
            </div>
                {open && 
                <div className='absolute z-10 border-2 rounded-lg bg-white w-full' onClick={()=>setOpen(!open)}>
                    <Options></Options>
                </div>
                }
            </>
        }

    </div>
  )
}
