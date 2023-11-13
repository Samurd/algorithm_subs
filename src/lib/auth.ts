import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from './db';

export const authOptions : NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string

        })
    ],
    callbacks: {
        async session({session, user}) {

            if(session.user) {
                const findUserDb = await prisma.users.findFirst({
                    where: {
                        email: session.user?.email as string
                    }
                })

                if(!findUserDb) {
                    const createUserDb = await prisma.users.create({
                        data: {
                            name: session.user?.name,
                            email: session.user?.email as string,
                            image: session.user?.image
                        }
                    })

                    const createSubscriptionUser = await prisma.subcriptions.create({
                        data: {
                            userId: createUserDb.id,
                            subscriptionPlanId: 1,
                            
                        }
                    })
                    
                }

                
            }

            


            return session

        },
    },
}


export const getAuthSession = async () => {

    const session = await getServerSession(authOptions)
    
    return session
}