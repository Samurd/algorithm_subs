import { NextResponse } from "next/server";
import prisma from '@/lib/db';
import { LemonSqueezyResponse } from "@/types/lemonSqueezyRes";
import { getAuthSession } from "@/lib/auth";


export async function POST(req: Request, res: Response) {
    try {
        const data : LemonSqueezyResponse = await req.json()
        const session = await getAuthSession()
        if(data) {

            const updatePlanUser = await prisma.subcriptions.update({
                where: {
                    userId: session?.user.id
                },
                data: {
                    subscriptionPlanId: 2,
                    frequency: "monthly",
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