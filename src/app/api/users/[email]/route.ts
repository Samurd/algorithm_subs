import { NextResponse } from "next/server";
import {NextApiRequest} from "next"
import prisma from '@/lib/db';


export async function GET(req : Request) {
    try {
        const email = req.url?.split("/")[5]
            const userDb = await prisma.user.findUnique({
                where: {
                    email: email
                },
                include: {
                    subscription: true,
                }
            })

            const subscriptionUser = await prisma.subscriptionPlans.findUnique({
                where: {
                    id: userDb?.subscription?.subscriptionPlanId
                }
            })


            return NextResponse.json({
                UserData: userDb,
                SubcriptionPlan: subscriptionUser
            })
    

    } catch (error) {
        if(error instanceof Error) {
            return NextResponse.json({
                message: error.message,
                status: 500,
                cause: error.cause
            })
        }
    }
}