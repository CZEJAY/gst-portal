import NextAuth from "next-auth";
import authConfig from "./auth.config";

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
  } from "@/routes";

  //@ts-ignore
const { auth } = NextAuth(authConfig)

//@ts-ignore
export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    
    const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    if(isPublicRoute){
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    
    if (isApiRoute) {
        return null
    }

    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null
    }

    if(!isLoggedIn && !isPublicRoute){
        let callbackUrl = nextUrl.pathname;
        if(nextUrl.search){
            callbackUrl += nextUrl.search
        }
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
    }

    return null

})



export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  }