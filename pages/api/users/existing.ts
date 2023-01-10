import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../Utils/dbConnect"
import User from "../../../models/Users";
import type { MongooseError } from "mongoose";

interface ResponseData {
    error?: string;
    msg?: string;
  }


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
  ) {

    console.log("Test this again")
  
    // validate if it is a POST
    if (req.method !== "POST") {
      return res
        .status(200)
        .json({ error: "This API call only accepts POST methods" });
    }

    const {email, password } = req.body[0];
 
    await dbConnect();
    const emailUser = await User.findOne({ email: email });

    if (!emailUser) {
        return res.status(401).json({ error: "Esta accion requiere haber iniciado session"});
    }
    if(password !== process.env.USERS_API_KEY){
        return res.status(401).json({error:"No tienes autorización para acceder a este api"})
    }

    User.find({},(err:MongooseError | null,users:any)=>{
        if(err){
            res.status(404).json({error:"Internal server error"})
        }else{
            res.status(200).json(users)
        }
    })
}