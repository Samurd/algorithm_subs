import { NextResponse } from "next/server";
import prisma from '@/lib/db';

export async function GET() {
    try {
        const plans = await prisma.subscriptionPlans.findMany()

        return NextResponse.json(plans)
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