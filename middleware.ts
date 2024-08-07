import NextAuth from "next-auth";
import authConfig from "./auth.config";

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    blockedRoute,
    publicRoutes,
    closedRoute,
} from "@/routes";

// @ts-ignore
const { auth } = NextAuth(authConfig)

// @ts-ignore
export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const userName = req.auth?.user?.name;

    const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const blocked = blockedRoute.includes(nextUrl.pathname);
    const isOpen = closedRoute.includes(nextUrl.pathname);

    const isAdmin = userName === process.env.ADMIN_NAME;

    if (isPublicRoute) {
        // return Response.redirect(new URL("/closed", nextUrl));
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    if (isApiRoute) {
        return null;
    }

    // if (isOpen) {
    //     if (isLoggedIn) {
    //         return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    //     }
    //     return null
    // }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
    }

    if (!isLoggedIn && !isAdmin) {
        return Response.redirect(new URL("/closed", nextUrl));
    }

    return null;
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
