import { uid } from "@/lib/util";
import { db, User } from "."

export const getUser = async (email: string) => {
    return db.user.findFirst({
        where: {
            email
        }
    })
}

export const createUser = async (user: User) => {
    user.id = uid()
    return db.user.create({
        data: user
    })
}