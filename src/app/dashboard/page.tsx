import { getAuthSession } from "@/lib/auth"
import {redirect} from "next/navigation"



export default async function Dashboard() {
    const session = await getAuthSession()

    if(!session?.user) {
        return redirect("/login")
    }

    return(
        <main className="flex items-center justify-center min-h-screen">
            <h1>Dashboard</h1>
        </main>
    )
}