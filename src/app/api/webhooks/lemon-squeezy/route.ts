import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import prisma from '@/lib/db';
import { LemonSqueezyResponse } from "@/types/lemonSqueezyRes";


export async function POST(req: Request, res: Response) {
    try {
        const data : LemonSqueezyResponse = await req.json()
        if(data) {
            console.log(data);
            const findUser = await prisma.users.findFirst({
                where: {
                    email: data.data.attributes.user_email
                }
            })

            const updatePlanUser = await prisma.subcriptions.update({
                where: {
                    userId: findUser?.id
                },
                data: {
                    subscriptionPlanId: 2,
                    frequency: "monthly",
                    renewsAt: data.data.attributes.renews_at,
                    endsAt: data.data.attributes.ends_at
                } 
            })

            console.log(updatePlanUser)

            return redirect("/")
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