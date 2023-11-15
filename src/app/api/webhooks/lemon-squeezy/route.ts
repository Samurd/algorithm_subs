import { NextResponse } from "next/server";
import prisma from '@/lib/db';
import { LemonSqueezyResponse } from "@/types/lemonSqueezyRes";


export async function POST(req: Request, res: Response) {
    try {
        const data : LemonSqueezyResponse = await req.json()
        if(data) {
            const userData =  await prisma.user.findFirst({
                where: {
                    email: data.data.attributes.user_email
                }
            })

            const getSubPlanByType = await prisma.subscriptionPlans.findFirst({
                where: {
                    typeSubcription: "pro"
                }
            })


            const updatePlanUser = await prisma.subcriptions.update({
                where: {
                    userId: userData?.id
                },
                data: {
                    subscriptionPlanId: getSubPlanByType!.id,
                    frequency: data.data.attributes.variant_name == "Monthly" ? "monthly" : "yearly",
                    renewsAt: data.data.attributes.renews_at,
                    endsAt: data.data.attributes.ends_at
                } 
            })

            console.log(updatePlanUser)

        }
    } catch (error) {
        if(error instanceof Error) {
            return NextResponse.json({
                message: error.message,
                status: 500
            })
        }
    }

}