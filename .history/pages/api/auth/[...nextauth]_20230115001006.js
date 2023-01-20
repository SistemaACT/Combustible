import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { signInWithEmailAndPassword, signOut} from "firebase/auth"
import {Auth} from "../../../Firebase config/firebase"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../Utils/mongodb"
import dbConnect from "../../../Utils/dbConnect"
import User from "../../../models/Users"
import { compare } from "bcrypt"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        type:"credentials",
        name: "Click",
        credentials: {
          email: { label: "Email", type: "text ", placeholder: "Ingrese su Email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
  
          await dbConnect();


          // Find user with the email
          const user = await User.findOne({
            email: credentials?.email,
          });
  
          // Email Not found
          if (!user) {
            throw new Error("Email no registrado");
          }
  
          // Check hased password with DB hashed password
          const isPasswordCorrect = await compare(
            credentials.password,
            user.HashedPassword
          );
  
          // Incorrect password
          if (!isPasswordCorrect) {
            throw new Error("Contraseña incorrecta");
          }
  
          return user;
        },
      }),
      
      
    ],
    pages: {
      signIn: "/auth",
    },
    adapter: MongoDBAdapter(clientPromise),
    session: {
      strategy: "jwt",
    },
    jwt: {
      secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
      async jwt({ token, account, profile, user }) {
        // Persist the OAuth access_token and or the user id to the token right after signin

        if (account) {
          token.id = user._id
          token.role = user.Role
        }
        return token
      },
      async session({session, token, user}){

        // Send properties to the client, like an access_token and user id from a provider.
        session.accessToken = token.accessToken
        session.user.id = token.id
        session.user.role = token.role
        return session
      }
    }

}

export default NextAuth(authOptions)