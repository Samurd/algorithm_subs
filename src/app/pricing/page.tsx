import axios from "axios"
import { Plan } from "@/types/plans"
import Plans from "@/components/Plans"


export default async function Pricing() {

    const getPlans = async () => {
       const plans = await axios.get(process.env.NEXTAUTH_URL + "/api/plans")

       const dataPlans : Plan[] = await plans.data

        return dataPlans
    }

    const plans = await getPlans()

    return(
        <main className="flex items-center justify-center min-h-screen">
            <Plans plans={plans}/>
        </main>
    )
}