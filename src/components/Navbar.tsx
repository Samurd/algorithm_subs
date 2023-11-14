import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link";
import axios from "axios";
import { UserData } from "@/types/userData";
import { getAuthSession } from "@/lib/auth";
import ButtonSignOut from "./BtnSignOut";
import ButtonSignIn from "./BtnSignIn";
import { Button } from "./ui/button";

export default async function Navbar() {

    const session = await getAuthSession()

    const getUserByEmail = async () => {
        const user = await axios.get(process.env.NEXTAUTH_URL + "/api/users/" + session?.user?.email)

        const dataUser: UserData = await user.data

        console.log(dataUser)

        return dataUser
    }

    const userData = await getUserByEmail()



    if (session?.user) {
        return (
            <nav className="w-full p-2 bg-gray-100 flex items-center justify-between">
                <Link href={"/"}>Algorithm Subscription</Link>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={userData.UserData.image} alt="" />
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <span>{userData.UserData.email}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={"/dashboard"}>Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href={"/pricing"}>Pricing</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <ButtonSignOut />
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        )
    } else {
        return (
            <nav className="w-full p-2 bg-gray-100 flex items-center justify-between">
                <Link href={"/"}>Algorithm Subscription</Link>
                <ButtonSignIn />
            </nav>
        )
    }
}