"use client"

import { signIn } from "next-auth/react"
import { Button } from "./ui/button"

export default function ButtonSignIn() {
    return(
        <Button size={"sm"} onClick={() => signIn("google")}>Login with Google</Button>
    )
}