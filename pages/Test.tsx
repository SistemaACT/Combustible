import React , {FormEvent} from 'react'
import {signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from '../Firebase config/firebase';
import toast from "react-hot-toast"
import { Input, Select } from '../components/reciclables/inputs'

export default function Test() {
    async function handleSubmit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const values = Object.fromEntries(formData);
        
        try{
        const user = await signInWithEmailAndPassword(Auth, values.email as string, values.password as string)
            
        console.log(user)

        }catch(error){
            console.log(error)
        }

      }
  return (
    <form onSubmit={handleSubmit}>
        <Input id='email' placeholder='email' label='email' type='text' ></Input>
        <Input id="password" placeholder="password" label="password" type="password"></Input>
        <button type="submit">Submit</button>
    </form>
  )
}
