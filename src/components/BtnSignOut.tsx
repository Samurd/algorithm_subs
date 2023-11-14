"use client"

import { signOut } from "next-auth/react"

export default function ButtonSignOut() {
    return(
        <button onClick={() => signOut()} className="text-red-500 w-full text-left" >Sign out</button>
    )
}