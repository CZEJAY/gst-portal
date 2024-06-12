import NextAuth from "next-auth"
import authConfig from "./auth.config"


export const { 
  
    handlers,
    handlers: { GET, POST},
    auth,
    signIn,
    signOut
  //@ts-ignore
 } = NextAuth({
  ...authConfig,
})