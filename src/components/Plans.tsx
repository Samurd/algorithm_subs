"use client"

import { Plan } from "@/types/plans"
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
import { signIn, useSession } from "next-auth/react"
import { Button } from "./ui/button"

type Props = {
    plans: Plan[]
}


export default function Plans({ plans }: Props) {
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
                                {(session?.user.frequency === "monthly" && session?.user.plan === "pro" && plan.typeSubcription == "pro") && <p className="bg-secondary rounded-sm w-[80px] pl-1 text-sm font-medium">Your Plan</p>}

                                {(session?.user.frequency === "monthly" && session?.user.plan === "free" && plan.typeSubcription === "free") && <p className="bg-secondary rounded-sm w-[80px] pl-1 text-sm font-medium">Your Plan</p>}


                                <h2>{plan.priceMonthly} /Month</h2>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription>
                                    {plan.description}
                                </CardDescription>
                            </CardHeader>

                            <CardFooter>
                                {session ? plan.hrefMonthly && session.user.plan === "free" && <a className="bg-black text-white p-1 px-2 rounded-md font-semibold" href={plan.hrefMonthly + `?checkout[email]=${session.user.email}`}>Upgrade</a>

                                    :
                                    <Button onClick={() => signIn()}>Upgrade</Button>
                                }
                            </CardFooter>
                        </Card>
                    ))}
                </TabsContent>



                <TabsContent className="flex gap-2" value="yearly">
                    {plans.map(plan => (
                        <Card key={plan.id}>
                            <CardHeader>
                                {(session?.user.frequency === "yearly" && session?.user.plan === "pro" && plan.typeSubcription == "pro") && <p className="bg-secondary rounded-sm w-[80px] pl-1 text-sm font-medium">Your Plan</p>}

                                {(session?.user.frequency === "yearly" && session?.user.plan === "free" && plan.typeSubcription === "free") && <p className="bg-secondary rounded-sm w-[80px] pl-1 text-sm font-medium">Your Plan</p>}

                                <h2>{plan.priceYearly} /Yearly</h2>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription>
                                    {plan.description}
                                </CardDescription>
                            </CardHeader>

                            <CardFooter>
                                {session ? plan.hrefYearly && session.user.plan === "free" && session.user.frequency === "monthly" && <a className="bg-black text-white p-1 px-2 rounded-md font-semibold" href={plan.hrefYearly + `?checkout[email]=${session.user.email}`}>Upgrade</a>

                                    :
                                    <Button onClick={() => signIn()}>Upgrade</Button>
                                }
                            </CardFooter>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </section>
    )
}