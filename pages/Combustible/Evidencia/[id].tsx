import React from 'react'
import {useRouter} from "next/router"

export default function Evidencia() {
  const router = useRouter();

  const {id} = router.query

  return (
    <div>Evidencia {id}</div>
  )
}
