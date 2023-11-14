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

    if (session?.user) {
        return (
            <nav className="w-full p-2 bg-gray-100 flex items-center justify-between">
                <Link href={"/"}>Algorithm Subscription</Link>

                <div className="flex items-center gap-2">
                <span className="p-1 border-2 rounded-md border-gray-300 text-sm">{session.user.plan}</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={session.user.image as string} alt="" />
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <span>{session.user.email}</span>
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