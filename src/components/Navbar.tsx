import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link";
import axios from "axios";
import { UserData } from "@/types/userData";
import { getAuthSession } from "@/lib/auth";
import ButtonSignOut from "./BtnSignOut";
import ButtonSignIn from "./BtnSignIn";

export default async function Navbar() {

    const session = await getAuthSession()
    
    const getUserByEmail = async () => {
        const user = await axios.get(process.env.NEXTAUTH_URL + "/api/users/" + session?.user?.email)

        const dataUser : UserData = await user.data

        console.log(dataUser)

        return dataUser
    }

    const userData = await getUserByEmail()

    

    if (session?.user) {
        return (
            <nav className="w-full p-2 bg-gray-200 flex items-center justify-between">
                <Link href={"/"}>Algorithm Subscription</Link>

                <div className="flex items-center gap-2">
                <Link href={"/dashboard"}>Dashboard</Link>
                <Avatar>
                    <AvatarImage src={session.user?.image as string} />
                </Avatar>
                <ButtonSignOut />
                </div>
            </nav>
        )
    } else {
        return(
            <nav className="w-full p-2 bg-gray-200 flex items-center justify-between">
                <Link href={"/"}>Algorithm Subscription</Link>
            <ButtonSignIn />
        </nav>
        )
    }
}