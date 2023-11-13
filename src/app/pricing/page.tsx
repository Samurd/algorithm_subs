import axios from "axios"

import { Plan } from "@/types/plans"
import { UserData } from "@/types/userData"

import Plans from "@/components/Plans"
import { getAuthSession } from "@/lib/auth"

export default async function Pricing() {

    const session = await getAuthSession()

    const getPlans = async () => {
       const plans = await axios.get(process.env.NEXTAUTH_URL + "/api/plans")

       const dataPlans : Plan[] = await plans.data

        return dataPlans
    }


    const getUserByEmail = async () => {
        const user = await axios.get(process.env.NEXTAUTH_URL + "/api/users/" + session?.user?.email)

        const dataUser : UserData = await user.data

        console.log(dataUser)
        return dataUser
    }

    const plans = await getPlans()

    const userData = await getUserByEmail()

    return(
        <main className="flex items-center justify-center min-h-screen">
            <Plans plans={plans} userData={userData} />
        </main>
    )
}