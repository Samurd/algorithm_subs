"use client"

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"

export default function ButtonSignOut() {
    return(
        <Button onClick={() => signOut()} variant={"destructive"} size={"sm"}>Sign out</Button>
    )
}