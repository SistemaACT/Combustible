import { FormEvent, useState } from "react";
import {signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Router from "next/router";
import { Input } from "../components/inputs";
import axios from "axios"

export default function auth() {
  
    const redirectToHome = () => {
      const { pathname } = Router;
      if (pathname === "/auth") {
        // TODO: redirect to a success register page
        Router.push("/");
      }
    };
  /*
    const registerUser = async (username:string,email:string,password:string) => {
      const res = await axios
        .post(
          "/api/register",
          { username, email, password },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then(async () => {
            console.log("here")
          await loginUser(email,password);
          console.log("there")
          redirectToHome();
        })
        .catch((error:any) => {
          console.log(error);
        });
      console.log(res);
    };
  */
    const loginUser = async (email:string, password:string) => {

      const res: any = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
        callbackUrl: `${window.location.origin}`,
      });
  
      if(res?.error){ 
        return {error:true, msg:res.error}
      }else{ redirectToHome();}
    };
  

  async function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const toastId = toast.loading('Cargando...');
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData);

      const res:any = await loginUser(values.email as string, values.password as string)
    //const res = await registerUser(values.username as string, values.email as string, values.password as string)
    if(res?.error !== undefined){
      toast.error(res.msg, {id:toastId})
    }else{
    toast.success("Inicio de session exitoso", {id:toastId})
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <div className="w-full md:w-1/2 border-2 m-2 p-2 flex flex-col items-center">
            <Input id="email" label='Email' placeholder='Ingrese su correo electronico' type="text"></Input>
            <Input id="password" label='Contraseña' placeholder='Ingrese su contraseña' type="password"></Input>
            <button type="submit" className="w-full hover:bg-blue-700 py-2 bg-blue-500 text-white rounded-lg">Iniciar Session</button>
        </div>
    </form>
  )
}
