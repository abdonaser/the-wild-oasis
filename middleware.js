//#region //' the middleware thet comes from the {native in the next (next/server)}

// import { NextResponse } from "next/server"

// export function middleware(request) {
//     console.log("middleWare -> ", request.url)

//     return NextResponse.redirect(new URL("/about", request.url))
// }

// // https://localhost:300/about

// export const config = {
//     matcher: ["/account"]
// }

//#endregion 




//#region // the middleware that comes from the nextAuth (auth.js)

import { auth } from "@/app/_lib/auth"

export const middleware = auth;
export const config = {
    matcher: ["/account"]
}



