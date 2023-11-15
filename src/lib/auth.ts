import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from './db';

export const authOptions : NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string

        })
    ],
    callbacks: {
        async session({session, user}) {
            if(session.user) {
                session.user.email = user.email;
                session.user.image = user.image;
                session.user.name = user.name;
                session.user.id = user.id;
                const userPlan = await prisma.subcriptions.findFirst({
                    where: {
                        userId: session.user.id
                    },
                    include: {
                        subscriptionPlan: true
                    }
                })



                if(userPlan) {
                    session.user.plan = userPlan.subscriptionPlan.typeSubcription === "free" ? "free" : "pro"

                    session.user.frequency = userPlan.frequency === "monthly" ? "monthly" : "yearly"
                }
            }
            
            return session
        }

    },
    events: {
        createUser: async ({user}) => {
            const getSubByType = await prisma.subscriptionPlans.findFirst({
                where: {
                    typeSubcription: "free"
                }
            })

                const findUserDb = await prisma.user.findFirst({
                    where: {
                        id: user.id
                    }
                })

                if(!findUserDb) {
                    const createUserDb = await prisma.user.create({
                        data: {
                            name: user.name,
                            email: user.email as string,
                            image: user.image
                        }
                    })


                    const createSubscriptionUser = await prisma.subcriptions.create({
                        data: {
                            userId: createUserDb.id,
                            subscriptionPlanId: getSubByType!.id 
                            
                        }
                    })
                    
                } else {
                    const createSubscriptionUser = await prisma.subcriptions.create({
                        data: {
                            userId: user.id,
                            subscriptionPlanId: getSubByType!.id,
                            
                        }
                    })
                }

        }
    }
}


export const getAuthSession = async () => {

    const session = await getServerSession(authOptions)
    
    return session
}