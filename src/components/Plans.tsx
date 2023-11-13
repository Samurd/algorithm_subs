"use client"

import { Plan } from "@/types/plans"
import { UserData } from "@/types/userData"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useSession } from "next-auth/react"
import ButtonSignIn from "./BtnSignIn"

type Props = {
    plans: Plan[]
    userData: UserData
}


export default function Plans({ plans, userData }: Props) {
    const { data: session } = useSession()

    return (
        <section className='flex flex-col justify-center w-full items-center'>
            <Tabs defaultValue="monthly">
                <TabsList>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>

                <TabsContent className="flex gap-2" value="monthly">
                    {plans.map(plan => (
                        <Card key={plan.id}>
                            <CardHeader>
                                <h2>{plan.priceMonthly} /Month</h2>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription>
                                    {plan.description}
                                </CardDescription>
                            </CardHeader>

                            <CardFooter>
                                {session ? plan.hrefYearly && <a className="bg-black text-white p-1 px-2 rounded-md font-semibold" href={plan.hrefYearly + `?checkout[email]=${userData.UserData.email}`}>Upgrade</a>

                                    :
                                    <ButtonSignIn />
                                }
                            </CardFooter>
                        </Card>
                    ))}
                </TabsContent>



                <TabsContent className="flex gap-2" value="yearly">
                    {plans.map(plan => (
                        <Card key={plan.id}>
                            <CardHeader>
                                <h2>{plan.priceYearly} /Yearly</h2>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription>
                                    {plan.description}
                                </CardDescription>
                            </CardHeader>

                            <CardFooter>
                                {session ? plan.hrefYearly && <a className="bg-black text-white p-1 px-2 rounded-md font-semibold" href={plan.hrefYearly + `?checkout[email]=${userData.UserData.email}`}>Upgrade</a>

                                    :
                                    <ButtonSignIn />
                                }
                            </CardFooter>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </section>
    )
}