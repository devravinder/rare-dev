import { uid } from "@/lib/util";
import { db } from "."

export const addSubscriber = async (email: string) => {
    
    const subscriber = await db.subscriber.findFirst({
        where: {
            email
        }
    })

    if (subscriber) {
        throw new Error("email already subscribed")
    }

    const data = {
        id: uid(),
        email,
    }

    return db.subscriber.create({
        data
    })
}